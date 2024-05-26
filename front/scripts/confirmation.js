const getOrderId = () => {
    const url = window.location.href;
    const searchParams = new URL(url).searchParams;
    const entries = new URLSearchParams(searchParams).values();
    const array = Array.from(entries);
    const orderId = array[0];
    return orderId;
};

const populateOrderId = () => {
    const orderIdSpan = document.getElementById('orderId');
    const orderId = getOrderId();
    orderIdSpan.textContent = orderId;
};

populateOrderId();
