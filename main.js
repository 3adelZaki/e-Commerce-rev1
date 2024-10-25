let cartIcon = document.getElementById("cart-icon");
let cart = document.querySelector(".cart");
let cartClose = document.getElementById("cart-close");
let content = document.querySelector(".content");
let cartList = document.querySelector(".cart-list");
let quantity = document.querySelector(".quantity");
let total = document.querySelector(".total-price");
let buyNowBtn = document.getElementById("buy-now-btn");
let buyNowForm = document.getElementById("buy-now-form");
let closeFormBtn = document.getElementById("close-form");
let checkoutForm = document.getElementById("checkout-form");

// Toggle cart visibility
cartIcon.addEventListener("click", function () {
    cart.classList.toggle("active"); // Changed to toggle for opening/closing the cart
});

cartClose.addEventListener("click", function () {
    cart.classList.remove("active");
});

let products = [
    { id: 1, name: "iPad's", image: "image 1.jpg", price: 3000 },
    { id: 2, name: "T-Shirt", image: "image 2.jpg", price: 400 },
    { id: 3, name: "Smart Watch", image: "image 3.jpg", price: 8000 },
    { id: 4, name: "Nokia Tablet", image: "image 4.jpg", price: 4000 },
    { id: 5, name: "Dress-Red", image: "image 5.jpg", price: 1000 },
    { id: 6, name: "Air Freshener", image: "image 6.jpg", price: 350 },
    { id: 7, name: "Light Lamp", image: "image 7.jpg", price: 500 },
    { id: 8, name: "Dress-Grey", image: "image 8.jpg", price: 1200 }
];

let listCards = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
getProductsLocalStorage();

function initApp() {
    products.forEach((value) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("product-box");
        newDiv.innerHTML = `
            <h2 class="m-2">${value.name}</h2>
            <img src="images/${value.image}" />
            <span class="m-2">EGP ${value.price}</span>
            <button class="btn btn-warning d-block m-2" onclick="addToCart(${value.id})">Add to Cart</button>
        `;
        content.appendChild(newDiv);
    });
}

initApp();

function addToCart(id) {
    let item = products.find((p) => p.id === id);
    let itemIndex = listCards.findIndex((p) => p.id === id);

    if (itemIndex > -1) {
        listCards[itemIndex].quantity += 1;
    } else {
        listCards.push({ ...item, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    cartList.innerHTML = "";
    let totalPrice = 0;
    let count = 0;

    listCards.forEach((item) => {
        totalPrice += item.price * item.quantity;
        count += item.quantity;

        let newLi = document.createElement("li");
        newLi.classList.add("box");
        newLi.innerHTML = `
            <div><img src="images/${item.image}"></div>
            <div class="title m-2">${item.name}</div>
            <div class="title m-2">EGP ${item.price}</div>
            <div class="change">
                <button class="btn btn-light p-1" onclick="changeQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <div>${item.quantity}</div>
                <button class="btn btn-light p-1" onclick="changeQuantity(${item.id}, ${item.quantity - 1})">-</button>
            </div>
        `;
        cartList.appendChild(newLi);
    });

    total.innerHTML = totalPrice + " EGP";
    quantity.innerHTML = count;
    localStorage.setItem("products", JSON.stringify(listCards));
}

function changeQuantity(id, newQuantity) {
    let itemIndex = listCards.findIndex((product) => product.id === id);
    if (newQuantity === 0) {
        listCards.splice(itemIndex, 1);
    } else {
        listCards[itemIndex].quantity = newQuantity;
    }
    updateCart();
}

function getProductsLocalStorage() {
    localStorage.getItem("products");
    updateCart();
}

// Show the form when "Buy Now" is clicked
buyNowBtn.addEventListener("click", function () {
    buyNowForm.style.display = "block";
});

// Close the form when "Cancel" is clicked
closeFormBtn.addEventListener("click", function () {
    buyNowForm.style.display = "none";
});

// Form validation
checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    // Validate each field
    if (name.match(/^[A-Za-z\s]+$/) && email.match(/^\S+@\S+\.\S+$/) && phone.match(/^\+?[0-9\s\-]{10,15}$/) && address) {
        alert("Thank you for your purchase!");
        localStorage.setItem("checkoutData", JSON.stringify({ name, email, phone, address }));
        buyNowForm.style.display = "none";
        checkoutForm.reset();
    } else {
        alert("Please fill in all fields correctly.");
    }
});
