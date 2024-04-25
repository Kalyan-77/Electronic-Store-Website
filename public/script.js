const spinner = document.querySelector('.spinner-wrapper');
window.addEventListener('load',()=>{
    spinner.style.opacity = '0.5';

    setTimeout(()=>{
        spinner.style.display = 'none';
    },1000);
});
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price"> 
                <div>₹${product.price}</div>
                <div class="dis">${product.discount}% OFF</div>
                </div>

                <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
                let imgElement = newProduct.querySelector('img');
                imgElement.addEventListener('click', () => {
                    detils(product.id-1);
                    document.getElementById('body-main').style.display = 'none';
                    document.getElementById('detils').style.display = 'flex';        
                });
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            let numberString = info.price;
            let numberWithoutComma = numberString.replace(/,/g, "");
            let numberWithCommas = (number) => {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            };
            let formattedNumber = numberWithCommas(numberWithoutComma * item.quantity);
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">₹${formattedNumber}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

function home()
{
    document.getElementById('body-main').style.display = 'block';
    document.getElementById('detils').style.display = 'none';
}

// function detils(pathp)
// {
//     const detils = document.getElementById('detils');
//     const imgs = document.createElement('img');
//     imgs.src = products[pathp].image;
//     detils.appendChild(imgs);

//     const dreak = document.createElement('br');
//     detils.append(dreak);

//     const price = document.createElement('label');
//     price.setAttribute('id', 'priceLabel');
//     price.textContent = 'Price: ₹' + products[pathp].price;
//     detils.appendChild(price);

//     const desciption = document.createElement('p');
//     desciption.textContent=products[pathp].dicception;
//     detils.appendChild(desciption);

//     const disc = document.createElement('p');
//     disc.textContent =products[pathp].discount;
//     detils.appendChild(disc);


// }

function detils(pathp) {
    const detils = document.getElementById('detils');
    const detilsnew = document.getElementById('detilsnew');
    const detilssecound = document.getElementById('detilssecound');
    detilssecound.innerHTML = ''; // Clear existing content
    detilsnew.innerHTML = '';

    // // Create and append the home button
    // const homeButton = document.createElement('input');
    // homeButton.setAttribute('type', 'button');
    // homeButton.setAttribute('value', 'Home');
    // homeButton.setAttribute('onclick', 'home()');
    // detils.appendChild(homeButton);

    // Create and append the image
    const img = document.createElement('img');
    img.setAttribute('src', products[pathp].image);
    img.setAttribute('alt', '');
    detilsnew.appendChild(img);

     // Create and append the title
     const title = document.createElement('h1');
     title.textContent = 'Title: ' + products[pathp].name;
     detilssecound.appendChild(title);

    //  const hed = document.createElement('h2');
    //  title.textContent = 'Description';
    //  detilssecound.appendChild(hed);

    // Create and append the description
    const desc = document.createElement('p1');
    desc.textContent = 'DESCRIPTON :    '+ products[pathp].description;
    detilssecound.appendChild(desc);

    // Create and append the price
    const price = document.createElement('p');
    price.textContent = 'Price: ₹' + products[pathp].price;
    detilssecound.appendChild(price);

    // Create and append the discount
    const discount = document.createElement('p2');
    discount.textContent = 'Discount: ' + products[pathp].discount + '%';
    detilssecound.appendChild(discount);

    // Create and append the buy button
    const buyButton = document.createElement('button');
    buyButton.textContent = 'BUY';
    buyButton.addEventListener('click', function() {
        window.location.href = 'adress.html';
    });
    detilssecound.appendChild(buyButton);

    // Create and append the add to cart button
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add To Cart';
    addToCartButton.classList.add('addCart');
    addToCartButton.addEventListener('click', function() {
        addToCart(products[pathp].id);
    });
    detilssecound.appendChild(addToCartButton);
}


const initApp = () => {
    // get data product
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();
