/**
 * Retrieves the order ID from the URL query parameters.
 * @returns {string} The order ID extracted from the URL.
 */
const getOrderId = () => {
    const url = window.location.href;
    const searchParams = new URL(url).searchParams;
    const entries = new URLSearchParams(searchParams).values();
    const array = Array.from(entries);
    const orderId = array[0];
    return orderId;
};

/**
 * Populates the order ID in the specified span element on the page.
 */
const populateOrderId = () => {
    const orderIdSpan = document.getElementById('orderId');
    const orderId = getOrderId();
    orderIdSpan.textContent = orderId;
};

populateOrderId();