const cartCountDiv = document.querySelector('.item-count');
const cartCount = localStorage.getItem('cartCount');
cartCountDiv.textContent = cartCount;
if(cartCount !=='0'){
    cartCountDiv.classList.remove('hide');
}
