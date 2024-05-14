let cart = JSON.parse(localStorage.getItem("cart"));

// fetch data from products that were added to cart

cart.forEach((item) => {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const prodId = item.id;
            const response = await fetch(
                `http://localhost:3000/api/products/${prodId}`
            );
            const data = await response.json();
            populateCart(data, item);
        } catch (error) {
            console.log(error);
        }
    });
});

// populate page with cart info
function populateCart(data, item) {
    const cartItems = document.getElementById("cart__items");
    const cartItem = document.createElement("article");
    cartItem.classList.add("cart__item");
    cartItem.dataset.id = item.id;
    cartItem.dataset.color = item.color;

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("cart__item__img");

    const itemImg = document.createElement("img");
    itemImg.src = data.imageUrl;
    itemImg.alt = data.altTxt;

    const itemContent = document.createElement("div");
    itemContent.classList.add("cart__item__content");
    const itemDesc = document.createElement("div");
    itemDesc.classList.add("cart__item__content__description");
    const name = document.createElement("h2");
    name.textContent = data.name;
    const color = document.createElement("p");
    color.textContent = item.color;
    const price = document.createElement("p");
    price.textContent = `€${data.price}`;

    const contentSettings = document.createElement("div");
    contentSettings.classList.add("cart__item__content__settings");
    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("cart__item__content__settings__quantity");
    const quantity = document.createElement("p");
    quantity.textContent = "Quantity: ";
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.classList.add("itemQuantity");
    quantityInput.name = "itemQuantity";
    quantityInput.min = 1;
    quantityInput.max = 100;
    quantityInput.value = item.quantity;

    const deleteContainer = document.createElement("div");
    quantityContainer.classList.add("cart__item__content__settings__delete");

    const deleteItem = document.createElement("p");
    deleteItem.classList.add("deleteItem");
    deleteItem.textContent = "Delete";

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
