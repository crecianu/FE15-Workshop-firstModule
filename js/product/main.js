console.log('Product');
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const productListFromLocalStorage = localStorage.getItem('productList');
const productList = JSON.parse(productListFromLocalStorage);

const foundProduct = productList.find((item) => {
    return item.id === parseInt(params.id)
})
console.log(foundProduct);

