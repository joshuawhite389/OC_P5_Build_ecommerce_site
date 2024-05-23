let cart = JSON.parse(localStorage.getItem('cart'));
const totalItemQuantity = document.getElementById('totalQuantity');
const totalItemPrice = document.getElementById('totalPrice');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');
let orderBtn = document.getElementById('order');

getCustomerInput();

// fetch data from products that were added to cart

cart.forEach((item) => {
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const prodId = item.id;
            const response = await fetch(
                `http://localhost:3000/api/products/${prodId}`
            );
            const data = await response.json();
            populateCart(data, item);
            updateTotalQuantityAndPrice(data);
        } catch (error) {
            console.log(error);
        }
    });
});

// populate page with cart info
function populateCart(data, item) {
    const cartItems = document.getElementById('cart__items');
    const cartItem = document.createElement('article');
    cartItem.classList.add('cart__item');
    cartItem.dataset.id = item.id;
    cartItem.dataset.color = item.color;

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('cart__item__img');

    const itemImg = document.createElement('img');
    itemImg.src = data.imageUrl;
    itemImg.alt = data.altTxt;

    const itemContent = document.createElement('div');
    itemContent.classList.add('cart__item__content');
    const itemDesc = document.createElement('div');
    itemDesc.classList.add('cart__item__content__description');
    const name = document.createElement('h2');
    name.textContent = data.name;
    const color = document.createElement('p');
    color.textContent = item.color;
    const price = document.createElement('p');

    const contentSettings = document.createElement('div');
    contentSettings.classList.add('cart__item__content__settings');
    const quantityContainer = document.createElement('div');
    quantityContainer.classList.add('cart__item__content__settings__quantity');
    const quantity = document.createElement('p');
    quantity.textContent = 'Quantity: ';
    const quantityInput = document.createElement('input');
    quantityInput.addEventListener('change', (event) =>
        handleUpdateQuantity(quantityInput.closest('article'), event)
    );
    quantityInput.type = 'number';
    quantityInput.classList.add('itemQuantity');
    quantityInput.name = 'itemQuantity';
    quantityInput.min = 1;
    quantityInput.max = 100;
    quantityInput.value = item.quantity;

    price.textContent = `€${data.price * item.quantity}`;

    const deleteContainer = document.createElement('div');
    deleteContainer.classList.add('cart__item__content__settings__delete');

    const deleteItem = document.createElement('p');
    deleteItem.addEventListener('click', () =>
        handleDeleteItem(deleteItem.closest('article'))
    );
    deleteItem.classList.add('deleteItem');
    deleteItem.textContent = 'Delete';

    cartItems.appendChild(cartItem);
    cartItem.appendChild(imgContainer);
    imgContainer.appendChild(itemImg);
    cartItem.appendChild(itemContent);
    itemContent.appendChild(itemDesc);
    itemDesc.appendChild(name);
    itemDesc.appendChild(color);
    itemDesc.appendChild(price);

    itemContent.appendChild(contentSettings);
    contentSettings.appendChild(quantityContainer);
    quantityContainer.appendChild(quantity);
    quantityContainer.appendChild(quantityInput);
    contentSettings.appendChild(deleteContainer);
    deleteContainer.appendChild(deleteItem);
}

// update cart item quantity where that field was updated
function handleUpdateQuantity(article, event) {
    const updatedItemId = article.getAttribute('data-id');
    const updatedItemColor = article.getAttribute('data-color');
    cart.forEach((item) => {
        if (item.color === updatedItemColor && item.id === updatedItemId) {
            item.quantity = event.target.value;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateTotalQuantityAndPrice();
        }
    });
}

function handleDeleteItem(article) {
    const updatedItemId = article.getAttribute('data-id');
    const updatedItemColor = article.getAttribute('data-color');
    cart.forEach((item) => {
        if (item.color === updatedItemColor && item.id === updatedItemId) {
            const itemIndex = cart.indexOf(item);
            cart.splice(cart.indexOf(itemIndex, itemIndex));
            console.log(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload();
            updateTotalQuantityAndPrice();
        }
    });
}

function updateTotalQuantityAndPrice() {
    let price = 0;
    let quantity = 0;
    cart.forEach((item) => {
        quantity += Number(item.quantity);
        totalItemQuantity.innerText = quantity;
        price += item.price * item.quantity;
        totalItemPrice.innerText = price;
    });
}

let userInput = {
    firstName,
    lastName,
    address,
    city,
    email,
};

function getCustomerInput() {
    firstName.addEventListener('input', (event) =>
        handleUserInput(event, 'firstName')
    );
    firstName.addEventListener('blur', (event) =>
        inputValidation(event, 'firstName')
    );
    lastName.addEventListener('input', (event) =>
        handleUserInput(event, 'lastName')
    );
    lastName.addEventListener('blur', (event) =>
        inputValidation(event, 'lastName')
    );
    address.addEventListener('input', (event) =>
        handleUserInput(event, 'address')
    );
    address.addEventListener('blur', (event) =>
        inputValidation(event, 'address')
    );
    city.addEventListener('input', (event) => handleUserInput(event, 'city'));
    city.addEventListener('blur', (event) => inputValidation(event, 'city'));
    email.addEventListener('input', (event) => handleUserInput(event, 'email'));
    email.addEventListener('blur', (event) => inputValidation(event, 'email'));
    orderBtn.addEventListener('click', (event) => handleSubmitForm(event));
}

function inputValidation(event, field) {
    const errorMsg = document.getElementById(`${field}ErrorMsg`);
    if (field === 'email') {
        
    }
    if (event.target.value === '') {
        errorMsg.innerText = 'Field must not be blank';
    }
}

function handleUserInput(event, field) {
    userInput = {
        ...userInput,
        [field]: event.target.value,
    };
}

function handleSubmitForm(event) {
    event.preventDefault();
    // post payload to api
    firstName.value = '';
    lastName.value = '';
    address.value = '';
    city.value = '';
    email.value = '';
}
