const listLength = 28;
const productList = [];
let filteredList = [];
const maxListCount = 8;

function generateList() {
    for (let i = 0; i < listLength; i++) {
        const item = {
            id: i,
            title: `Title of product ${i}`,
            img: 'https://picsum.photos/200/300',
            imgShortDescription: `Item ${i}`,
            price: 100 + i * 10,
            currency: 'lei',
        }
        productList.push(item);
    }

    localStorage.setItem('productList', JSON.stringify(productList));
}

function createItemImage(src, alt, containerClass) {
    const container = document.createElement('div');
    const img = document.createElement('img');

    container.classList.add(containerClass);
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);
    container.appendChild(img);

    return container;
}

function createItemTitle(itemTitle) {
    const title = document.createElement('h3');

    title.classList.add('title');
    title.textContent = itemTitle;

    return title;
}

function createPriceBuyContainer(itemPrice, itemCurrency) {
    const container = document.createElement('div');
    const price = document.createElement('div');
    const iconChart = createItemImage('./images/icons/shopping-cart-30x30.png', 'Shopping cart', 'icon-chart');

    container.classList.add('price-buy-container');
    price.classList.add('price');
    price.textContent = `${itemPrice} ${itemCurrency}`;

    container.appendChild(price);
    container.appendChild(iconChart);

    return container;
}

function createItem(itemObject) {
    const item = document.createElement('div');
    item.classList.add('item');

    const itemImage = createItemImage(itemObject.img, itemObject.imgShortDescription, 'image-container');
    const itemTitle = createItemTitle(itemObject.title);
    const itemBuy = createPriceBuyContainer(itemObject.price, itemObject.currency);

    const anchor = document.createElement('a');
    anchor.setAttribute('href', './product.html?id=' + itemObject.id);
    anchor.appendChild(itemImage)

    item.appendChild(anchor);
    item.appendChild(itemTitle);
    item.appendChild(itemBuy);

    return item;
}

function populateHTML(indexStart, list) {
    const itemListContainer = document.querySelector('.item-list');
    itemListContainer.textContent = '';

    for (let i = indexStart; i < indexStart + maxListCount && i < list.length; i++) {
        const itemContainer = createItem(list[i]);
        itemListContainer.appendChild(itemContainer);
    }
}

function createLiItem(i) {
    const li = document.createElement('li');
    li.textContent = i + 1;

    return li;
}

function createPagination(list) {
    const container = document.querySelector('.paginare');
    container.textContent = '';
    const ul = document.createElement('ul');

    const maxItems = Math.ceil(list.length / maxListCount);

    for (let i = 0; i < maxItems; i++) {
        const li = createLiItem(i);
        ul.appendChild(li);
    }

    ul.addEventListener('click', (e) => {
        const text = e.target.textContent;
        if(text.length === 1){
            const itemNumber = parseInt(text);

            populateHTML((itemNumber - 1) * 8, list);
        }  
    })

    container.appendChild(ul);
}

function searchItem(textToFilterBy) {
    filteredList = productList.filter((item) => {
        return item.title.toLowerCase().includes(textToFilterBy.toLowerCase()) || (item.price + '').includes(textToFilterBy.toLowerCase());
    });
    populateHTML(0, filteredList);
    createPagination(filteredList);
}

// filter by click
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', (e) => {
    const searchInput = document.getElementById('search');
    searchItem(searchInput.value);
});

// filter by input 
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
    searchItem(e.target.value);
});


// Filter by price
const priceFilter = document.getElementById('price-filter');
priceFilter.addEventListener('change', (e) =>{
    const value = e.target.value;
    let list = [];

    if(filteredList.length > 0){
        list = filteredList;
    }else{
        list = productList;
    }

    if(value !== '-') {
        const filter = list.filter((item) =>{
            return item.price >= parseInt(value);
        });
        populateHTML(0, filter);
        createPagination(filter);
    }
})


generateList();
populateHTML(0, productList);
createPagination(productList);

