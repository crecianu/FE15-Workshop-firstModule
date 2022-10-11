// Aici doar extragem din URL tot ce este dupa "?"
// EX: daca avem un URL: http://127.0.0.1:5500/product.html?productId=7
// In params o sa fie creat un obiect de forma:
// {
//    productId: "7"
// }
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const productListFromLocalStorage = localStorage.getItem('productList');
const productList = JSON.parse(productListFromLocalStorage);


function createItemImage(src, alt, containerClass) {
    const container = document.createElement('div');
    const img = document.createElement('img');

    container.classList.add(containerClass);
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);
    container.appendChild(img);

    return container;
}

if(!params.productId) {
    window.location.href = './notFound.html';
} 

const foundProduct = productList.find((item) => {
    return item.id === parseInt(params.productId)
});

if(!foundProduct){
    window.location.href = './notFound.html';
}

const title = document.querySelector('.title');
const productImage = document.getElementById('productImage');
const price = document.querySelector('.price');
const productDescription = document.querySelector('.product-informations');

title.textContent = foundProduct.title;
productImage.setAttribute('src', foundProduct.img);
productImage.setAttribute('alt', foundProduct.imgShortDescription);
price.textContent = `${foundProduct.price} ${foundProduct.currency}`;
productDescription.textContent = foundProduct.description;

// Example code to swith between two elements

// const en = {
//     MAIN_TITLE: 'Products',
//     MAIN_BUTTON: 'Click Me'
// }

// const zh = {
//     MAIN_TITLE: 'blabla',
//     MAIN_BUTTON: 'bl;alba2'
// }

// const navigationList1 = ['Despre', 'Carrers', 'Events', 'Products', 'Support'];
// const navigationList2 = ['Carrers', 'Events'];

// function createNavigation(navigationList){
//     const navigation = document.getElementById('navigation');
//     navigation.textContent = '';
//     const ul = document.createElement('ul');
    
//     for(let i = 0; i< navigationList.length; i++){
//         const li = document.createElement('li');
//         li.textContent = navigationList[i];
//         ul.appendChild(li);
//     }
    
//     const cart = createItemImage('./images/icons/shopping-cart-30x30.png', 'Shopping cart', 'icon-chart');
//     ul.appendChild(cart);
    
//     navigation.appendChild(ul);
// }

// createNavigation(navigationList1);

// const changeNavigation = document.getElementById('changeNavigation');
// changeNavigation.addEventListener('click', () =>{
//     createNavigation(navigationList2);
// })

const buyButton = document.getElementById('buy-button');
buyButton.addEventListener('click', () =>{
    const cartCount = document.querySelector('.item-count');
    if(cartCount.textContent === '0'){
        cartCount.textContent = 1;
        cartCount.classList.remove('hide');
    } else{
        const prevCount = cartCount.textContent;
        const prevCountNumber = parseInt(prevCount);
        cartCount.textContent = prevCountNumber + 1;
    }

    localStorage.setItem('cartCount', cartCount.textContent);
})

const deleteButton = document.getElementById('delete-button');
deleteButton.addEventListener('click', () =>{
    const cartCount = document.querySelector('.item-count');

    // ascundem cand dam click si count-ul este deja 0
    if(cartCount.textContent === '0'){
        return;
    }

    const prevCount = cartCount.textContent;
    const prevCountNumber = parseInt(prevCount);
    cartCount.textContent = prevCountNumber - 1;

    // il ascundemm cand count-ul devine 0
    if(cartCount.textContent === '0'){
        cartCount.classList.add('hide'); 
    }
    
    localStorage.setItem('cartCount', cartCount.textContent);
})