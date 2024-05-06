// variables
const imgContainer = document.getElementsByClassName("item__img")[0];
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colorPicker = document.getElementById("colors");

// helper function to get product id from URL search params
const getProductId = () => {
    const url = window.location.href;
    const searchParams = new URL(url).searchParams;
    const entries = new URLSearchParams(searchParams).values();
    const array = Array.from(entries);
    const productId = array[0];
    return productId;
};

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
    
    data.colors.forEach(element => {
        const colorOption = document.createElement("option");
        colorOption.value = element;
        colorOption.innerText = element;
        colorPicker.appendChild(colorOption);
    })

    productImg.src = data.imageUrl;
    productImg.alt = "Photo of a sofa";
    title.innerText = data.name;
    price.innerText = data.price;
    description.innerText = data.description;

    imgContainer.appendChild(productImg);
};
