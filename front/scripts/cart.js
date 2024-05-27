// setting global variables
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

/**
 * Fetches product information for each item in the cart and populates the cart with the data.
 * @param {Object} item - The item in the cart.
 */
cart.forEach((item) => {
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const prodId = item.id;
            const response = await fetch(
                `http://localhost:3000/api/products/${prodId}`
            );
            const data = await response.json();
            populateCart(data, item);
            updateTotalQuantityAndPrice();
        } catch (error) {
            console.log(error);
        }
    });
});

/**
 * Populates the cart with item information fetched from the server.
 * @param {Object} data - The product data fetched from the server.
 * @param {Object} item - The item information from the cart.
 */
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

/**
 * Updates the quantity of a specific cart item based on the input event.
 * @param {HTMLElement} article - The article element representing the cart item.
 * @param {Event} event - The input event triggering the quantity update.
 */
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

/**
 * Handles deleting an item from the cart based on the provided article element.
 * @param {HTMLElement} article - The article element representing the item to be deleted.
 */
function handleDeleteItem(article) {
    const updatedItemId = article.getAttribute('data-id');
    const updatedItemColor = article.getAttribute('data-color');
    cart.forEach((item) => {
        if (item.color === updatedItemColor && item.id === updatedItemId) {
            cart = cart.filter(
                (item) =>
                    item.id !== updatedItemId || item.color !== updatedItemColor
            );
            localStorage.setItem('cart', JSON.stringify(cart));
            article.remove();
            updateTotalQuantityAndPrice();
        }
    });
}

/**
 * Updates the total quantity and price displayed in the cart.
 */
/**
 * Updates the total quantity and price displayed in the cart based on the cart items and product data.
 * @param {Object} data - The product data used to calculate the total price.
 */
function updateTotalQuantityAndPrice() {
    let price = 0;
    let quantity = 0;
    if (cart.length === 0) {
        totalItemQuantity.innerText = 0;
        totalItemPrice.innerText = 0;
    } else {
        cart.forEach(async (item) => {
            try {
                const prodId = item.id;
                const response = await fetch(
                    `http://localhost:3000/api/products/${prodId}`
                );
                const data = await response.json();
                quantity += Number(item.quantity);
                totalItemQuantity.innerText = quantity;
                price += data.price * item.quantity;
                totalItemPrice.innerText = price;
            } catch (error) {
                console.log(error);
            }
        });
    }
}

let contact = {
    firstName,
    lastName,
    address,
    city,
    email,
};

/**
 * Handles user input events for the customer details form fields.
 */
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

/**
 * Validates the input for the specified field and displays error messages if needed.
 * @param {Event} event - The input event.
 * @param {string} field - The field being validated.
 */

function inputValidation(event, field) {
    const errorMsg = document.getElementById(`${field}ErrorMsg`);
    if (field === 'email') {
        if (!validateEmail(event.target.value)) {
            errorMsg.innerText = 'Please enter a valid email';
        } else {
            errorMsg.innerText = '';
        }
    }
    if (event.target.value === '') {
        errorMsg.innerText = 'Field must not be blank';
    } else if (field !== 'email') {
        errorMsg.innerText = '';
    }
}

/**
 * Validates an email address using a regular expression.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * Handles user input events for the customer details form fields.
 * @param {Event} event - The input event.
 * @param {string} field - The field being updated.
 */

function handleUserInput(event, field) {
    contact = {
        ...contact,
        [field]: event.target.value,
    };
}

/**
 * Handles the form submission event for the customer details form.
 * @param {Event} event - The form submission event.
 */
function handleSubmitForm(event) {
    event.preventDefault();
    let products = [];
    cart.forEach((item) => {
        products.push(item.id);
    });
    const postObject = {
        contact,
        products,
    };

    const postPayload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postObject),
    };

    retrieveOrderNumber(postPayload);
    firstName.value = '';
    lastName.value = '';
    address.value = '';
    city.value = '';
    email.value = '';
}

/**
 * Retrieves the order number from the server using the provided payload.
 * @param {Object} payload - The payload to be sent with the fetch request.
 * @returns {Promise<Object>} A promise that resolves to the data containing the order number.
 */
const retrieveOrderNumber = async (payload) => {
    try {
        const fetchResponse = await fetch(
            `http://localhost:3000/api/products/order`,
            payload
        );
        const data = await fetchResponse.json();
        console.log(data);
        const orderId = data.orderId;
        navigateToConfirmationPage(orderId);
        return data;
    } catch (e) {
        return e;
    }
};

const baseUrl = 'http://127.0.0.1:5500/front/html/';

/**
 * Navigates to the confirmation page with the provided order ID.
 * @param {string} orderId - The order ID to be included in the URL query string.
 */
const navigateToConfirmationPage = (orderId) => {
    const obj = { orderId: orderId };
    const searchParams = new URLSearchParams(obj);
    const queryString = searchParams.toString();
    window.location.href = baseUrl + 'confirmation.html?' + queryString;
};