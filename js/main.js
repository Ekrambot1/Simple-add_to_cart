let jsonData;//

fetch('json/product.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        processData(jsonData);

    })
    .catch(error => console.log(error));



function processData(data) {
    data.forEach(pro => {
        var image = pro.image;
        var product = pro.name;
        var price = pro.price;
        var outputString = `   <div class="food-box">
                                  <div class="pic"><img src="${image}" class="food-img"></div>
                                 <h2 class="food-title">${product}</h2>
                                  <span class="food-price">$${price}</span>
                                   <p ><ion-icon name="cart" class="add-cart"></ion-icon></p>
                                  </div>
                                 `;
        var pTag = document.querySelector('.shop-content');
        pTag.innerHTML += outputString;

        let cartBtns = document.querySelectorAll('.add-cart');
        cartBtns.forEach((btn) => {
            btn.addEventListener('click', function (event) {
                addCart(event, data);
            });
        });

    })
    //search btn and input
    let input = document.getElementById('search-input');
    let search = document.getElementById('search-button');
    search.addEventListener("click", function () {
        var inputval = input.value;
        searchall(inputval);
    })
}

//search products
function searchall(inputval) {
    const searchValue = inputval.toLowerCase();
    const filteredData = jsonData.filter(item => item.name.toLowerCase() === searchValue);

    if (filteredData.length > 0) {
        let outputString = '';
        filteredData.forEach(item => {
            outputString += `
                <div class="food-box-1">
                <ion-icon name="arrow-back-outline" class="back" onclick="Back()"></ion-icon>
                <div class="food-box">
                    <div class="pic"><img src="${item.image}" class="food-img"></div>
                    <h2 class="food-title">${item.name}</h2>
                    <span class="food-price">$${item.price}</span>
                    <p><ion-icon name="cart" class="add-cart"></ion-icon></p>
                </div>
                </div>
            `;
        });


        var pTag = document.querySelector('.shop-content');
        pTag.innerHTML = outputString;
        let cartBtns = document.querySelectorAll('.add-cart');
        cartBtns.forEach((btn) => {
            btn.addEventListener('click', function (event) {
                addCart(event, filteredData); // Use the filtered data to add to cart
                updateTotal();
            });
        });
    } else {
        // No matching products found, so clear the content
        var pTag = document.querySelector('.shop-content');
        pTag.innerHTML = `<h1>product not found</h1>`;
    }
}

//back to old page after serach item
function Back() {
    window.history.back();
}

//create empty array then use it
let itemList = [];

//add to cart
function addCart(event) {
    var cartBtn = event.target;
    var parentDiv = cartBtn.closest('.food-box');
    var title = parentDiv.querySelector('.food-title').innerText;
    var imgSrc = parentDiv.querySelector('.food-img').getAttribute('src');
    var price = parentDiv.querySelector('.food-price').innerText;
    // console.log(title, imgSrc, price);

    let newProduct = { title, price, imgSrc };


    //Check Product already Exist in Cart
    if (itemList.find((el) => el.title == newProduct.title)) {
        var myModal = new bootstrap.Modal(document.getElementById('myModal1'));
        myModal.show();
        return;
    } else {
        itemList.push(newProduct);
        order = itemList;
        setstorage();
    }
    var myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();
    createCartProduct(title, price, imgSrc);
    updateTotal();
}

var order = [];
// print orderlist

function calculateTotal(order) {
    var total = 0;
    order.forEach((item) => {
        var priceElement = item.price;
        var price = parseFloat(priceElement.replace("$", ""));
        total += price;
        var totalElement = document.getElementById('total-price1');
        totalElement.innerHTML = '$' + total.toFixed(2);
    });
}
function setorder() {
    var orderitem = JSON.stringify(order);
    localStorage.setItem('order', orderitem)
}

// function getorder() {
//     var orderlist = JSON.parse(localStorage.getItem('order')) || [];
//     order = orderlist;
//     order.map(() => {
//         return printorder(order);
//     }).join('');
//     calculateTotal(order);
// }
// getorder();


function printorder(order) {
    var list = document.createElement('div');
    list.classList.add('cart-box');
    var cartBasket = document.querySelector('.order-content');
    cartBasket.append(list);
    var print = '';
    // Your existing cart item HTML
    order.map((item) => {
        print += `
        <img src="${item.imgSrc}" class="cart-img">
        <div class="detail-box">
            <div class="cart-food-title">${item.title}</div>
            <div class="price-box">
            <div class="cart-amt">${item.price}</div>
            </div>
        </div><br>`;
        list.innerHTML = print;
    });
    calculateTotal(order);

}


//clear function
function clearaddcart() {
    document.querySelector('.cart-content').innerHTML = '';
    updateTotal();
}

//after place remove cart and local storage
let place = document.getElementById("place");
place.addEventListener('click', function () {
    function ValueInLocalStorage(key) {
        return localStorage.getItem(key) !== null;
    }
    const keyToCheck = "user";
    if (ValueInLocalStorage(keyToCheck)) {
        var myModal = new bootstrap.Modal(document.getElementById('myModal2'));
        myModal.show();
        const Removekey = 'item';//this is actual key name
        localStorage.removeItem(Removekey);
        clearaddcart();
        setorder();
        setTimeout(() => {
            window.location.href='review.html';
        }, 5000);

    }
    else {
        var myModal = new bootstrap.Modal(document.getElementById('myModal3'));
        myModal.show();
        setTimeout(() => {
            window.location.href = 'signup.html';
        }, 2000);
    }

});

// Function to get cart data from local storage
function displayCartItems() {
    var itemData = JSON.parse(localStorage.getItem('item')) || [];
    itemList = itemData;
    itemList.map((element) => {
        return createCartProduct(element.title, element.price, element.imgSrc);
    }).join('');
    updateTotal();
}
displayCartItems();


//set value localstorage
function setstorage() {
    var itemval = JSON.stringify(order);
    localStorage.setItem('item', itemval);
}


// Function to remove item from the cart
function removeItemFromCart(title) {
    itemList = itemList.filter(el => el.title !== title);
    setstorage();//update localstorage after delete items
    updateTotal(); // Update the total after removing an item
}

function createCartProduct(title, price, imgSrc) {
    var cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-box');
    var cartBasket = document.querySelector('.cart-content');
    cartBasket.append(cartItemElement);
    // Your existing cart item HTML
    cartItemElement.innerHTML = `
        <img src="${imgSrc}" class="cart-img">
        <div class="detail-box">
            <div class="cart-food-title">${title}</div>
            <div class="price-box">
                <div class="cart-price">${price}</div>
                <div class="cart-amt">${price}</div>
            </div>
            <input type="number"  min="1" max="10" onchange="updateTotal()" class="cart-quantity">
        </div>
        <ion-icon name="trash" class="cart-remove"></ion-icon>
    `;

    // Add event listener for the remove button (trash icon)
    var removeButton = cartItemElement.querySelector('.cart-remove');
    removeButton.addEventListener('click', function () {
        removeItemFromCart(title);
        cartItemElement.remove(); // Remove the cart item from the DOM
        updateTotal(); // Update the total after removing an item
    });

    return cartItemElement;
}

//total value
function updateTotal() {
    var cartItems = document.querySelectorAll('.cart-box');
    var totalValue = document.querySelector('.total-price');

    let total = 0;

    cartItems.forEach(product => {
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerText.replace("$", ""));

        let quantityInput = product.querySelector('.cart-quantity');
        let qty = parseInt(quantityInput.value);

        // Validate the quantity to be within the range of 1 to 10
        if (isNaN(qty) || qty < 1) {
            qty = 1;
            quantityInput.value = qty;
        } else if (qty > 10) {
            qty = 10;
            quantityInput.value = qty;
        }

        total += price * qty;
        product.querySelector('.cart-amt').innerText = "$" + (price * qty).toFixed(2);
    });

    totalValue.innerHTML = '$' + ' ' + total.toFixed(2); // Display total with two decimal places


    // Add Product Count in Cart Icon
    var cartCount = document.querySelector('.cart-count');
    let count = itemList.length;
    cartCount.innerHTML = count;

    if (count == 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'block';
    }

}

function user() {
    //print account username
    const userData = JSON.parse(localStorage.getItem('user'));
    const users = document.querySelector('.acc-name');
    users.innerHTML = userData.username;
}
user();
//cart active and close buttons evenlisterner
const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const cart1 = document.querySelector('.cart1');
const btnClose = document.querySelector('#cart-close');
const btnClose1 = document.querySelector('#cart1-close');
const sign = document.getElementById('sign-up');
const logout = document.getElementById('log-out');
const history = document.querySelector('.acc-name');
const menu = document.getElementById('menu-icon');
const closeicon = document.querySelector('.close-icon');
const header = document.querySelector('.header');


menu.addEventListener("click", () => {
    header.classList.add('header-active');
})

closeicon.addEventListener("click", () => {
    header.classList.remove('header-active')
})


//signup btn event
sign.addEventListener('click', () => {
    setTimeout(() => {
        window.location.href = 'signup.html';
    }, 1000);
});

//logout btn event
logout.addEventListener('click', () => {
    var myModal = new bootstrap.Modal(document.getElementById('myModal4'));
    myModal.show();
    localStorage.clear();
    setTimeout(() => {
        window.location.href = 'signup.html';
    }, 1000);
    updateTotal();
    clearaddcart();
});


//addcart page event
btnCart.addEventListener('click', () => {
    cart.classList.add('cart-active');
});

btnClose.addEventListener('click', () => {
    cart.classList.remove('cart-active');
});

//ordered page evant
history.addEventListener('click', () => {
    cart1.classList.add('cart-active');
});

btnClose1.addEventListener('click', () => {
    cart1.classList.remove('cart-active');
});

