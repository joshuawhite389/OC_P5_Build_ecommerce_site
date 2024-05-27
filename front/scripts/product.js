/**
 * Retrieves the product ID from the URL query parameters.
 * @returns {string} The product ID extracted from the URL.
 */
const getProductId = () => {
    const url = window.location.href;
    const searchParams = new URL(url).searchParams;
    const entries = new URLSearchParams(searchParams).values();
    const array = Array.from(entries);
    const productId = array[0];
    return productId;
};

// variables
const imgContainer = document.getElementsByClassName('item__img')[0];
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colorPicker = document.getElementById('colors');
const addToCartBtn = document.getElementById('addToCart');
const quantity = document.getElementById('quantity');
let product = {
    id: getProductId(),
    quantity: '',
    color: '',
};

//event listeners
addToCartBtn.addEventListener('click', () => {
    addProductToCart();
});
colorPicker.addEventListener('change', () => {
    product = {
        ...product,
        color: colorPicker.value,
    };
});
quantity.addEventListener('change', () => {
    product = {
        ...product,
        quantity: quantity.value,
    };
});

/**
 * Event listener that triggers when the DOM content is fully loaded. Fetches product data based on the product ID from the server and loads the product information onto the webpage.
 */
document.addEventListener('DOMContentLoaded', async () => {
    const prodId = getProductId();
    try {
        const response = await fetch(
            `http://localhost:3000/api/products/${prodId}`
        );
        const data = await response.json();
        loadProductInfo(data);
    } catch (error) {
        console.log(error);
    }
});

/**
 * Loads product information onto the webpage based on the provided data.
 * @param {Object} data - The object containing product information to be displayed.
 */
const loadProductInfo = (data) => {
    const productImg = document.createElement('img');

    data.colors.forEach((element) => {
        const colorOption = document.createElement('option');
        colorOption.value = element;
        colorOption.innerText = element;
        colorPicker.appendChild(colorOption);
    });

    productImg.src = data.imageUrl;
    productImg.alt = data.altTxt;
    title.innerText = data.name;
    price.innerText = data.price;

    description.innerText = data.description;

    imgContainer.appendChild(productImg);
};

/**
 * Adds the product to the cart in the local storage after validation.
 */
const addProductToCart = () => {
    //add product to local storage after validating
    if (product.quantity > 0 && product.color != '') {
        localStorage.setItem('localProduct', JSON.stringify(product));
    }

    //add cart to local storage
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', '[]');
    }

    //get references to cart and local storage product to update
    let localProduct = JSON.parse(localStorage.getItem('localProduct'));
    let cart = JSON.parse(localStorage.getItem('cart'));

    //if cart is empty, just push the product to cart
    //else if pushing same item, update quantity
    if (localProduct != null && product.quantity > 0 && product.color != '') {
        if (cart.length === 0) {
            cart.push(localProduct);
        } else {
            let found = false;
            cart.some((cartItem) => {
                if (
                    JSON.stringify(cartItem.id) ===
                        JSON.stringify(localProduct.id) &&
                    JSON.stringify(cartItem.color) ===
                        JSON.stringify(localProduct.color)
                ) {
                    cartItem.quantity = (
                        parseInt(cartItem.quantity) +
                        parseInt(localProduct.quantity)
                    ).toString();
                    found = true;
                }
            });

            if (!found) {
                cart.push(localProduct);
            }
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
};
