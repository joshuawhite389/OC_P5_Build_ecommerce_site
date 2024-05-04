
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
        const response = await fetch(`http://localhost:3000/api/products/${prodId}`);
        const data = await response.json();
    } catch (error) {
        console.log(error);
    }
});
