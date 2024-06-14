// variables
const itemsSection = document.getElementById('items');
const baseUrl = 'http://127.0.0.1:5500/front/html/';

/**
 * Event listener that triggers when the DOM content is fully loaded. Fetches product data from the server and loads the products onto the webpage.
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        loadProducts(data);
    } catch (error) {
        console.log(error);
    }
});

/**
 * Loads products onto the webpage based on the provided data.
 * @param {Array} data - The array of product data to be displayed.
 */
const loadProducts = (data) => {
    data.forEach((element) => {
        const productLink = document.createElement('a');
        const productArticle = document.createElement('article');
        const productImage = document.createElement('img');
        const productName = document.createElement('h3');
        const productDescription = document.createElement('p');

        productImage.src = element.imageUrl;
        productImage.alt = element.altTxt;
        productName.classList.add('productName');
        productName.innerText = element.name;
        productDescription.classList.add('productDescription');
        productDescription.innerText = element.description;

        itemsSection.appendChild(productLink);
        productLink.appendChild(productArticle);
        productArticle.appendChild(productImage);
        productArticle.appendChild(productName);
        productArticle.appendChild(productDescription);

        productLink.addEventListener('click', () =>
            handleMakeProductSelection(element._id)
        );
    });
};

/**
 * Handles the selection of a product and navigates to the product page with the selected product ID.
 * @param {string} id - The ID of the selected product.
 */

const handleMakeProductSelection = (id) => {
    const obj = { id: id };
    const searchParams = new URLSearchParams(obj);
    const queryString = searchParams.toString();
    window.location.href = baseUrl + 'product.html?' + queryString;
};
