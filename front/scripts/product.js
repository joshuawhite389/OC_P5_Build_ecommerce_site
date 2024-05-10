// helper function to get product id from URL search params
const getProductId = () => {
    const url = window.location.href;
    const searchParams = new URL(url).searchParams;
    const entries = new URLSearchParams(searchParams).values();
    const array = Array.from(entries);
    const productId = array[0];
    return productId;
};

// variables
const imgContainer = document.getElementsByClassName("item__img")[0];
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colorPicker = document.getElementById("colors");
const addToCartBtn = document.getElementById("addToCart");
const quantity = document.getElementById("quantity");
let product = {
    id: getProductId(),
    quantity: "",
    color: "",
};
// let cart = JSON.parse(localStorage.getItem("cart"));

//event listeners
addToCartBtn.addEventListener("click", () => {
    addProductToCart();
});
colorPicker.addEventListener("change", () => {
    product = {
        ...product,
        color: colorPicker.value,
    };
});
quantity.addEventListener("change", () => {
    product = {
        ...product,
        quantity: quantity.value,
    };
});

// fetch data from product that was selected
document.addEventListener("DOMContentLoaded", async () => {
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

// populate product page with info from product api
const loadProductInfo = (data) => {
    const productImg = document.createElement("img");

    data.colors.forEach((element) => {
        const colorOption = document.createElement("option");
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

const addProductToCart = () => {
    //add cart and product to local storage
    localStorage.setItem("localProduct", JSON.stringify(product));
    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", "[]");
    }

    //get references to cart and local storage product to update
    let localProduct = JSON.parse(localStorage.getItem("localProduct"));
    let cart = JSON.parse(localStorage.getItem("cart"));

    //if cart is empty, just push the product to cart
    //else if pushing same item, update quantity
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
                cartItem.quantity = localProduct.quantity;
                found = true;
            }
        });

        if (!found) {
            cart.push(localProduct);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
};
