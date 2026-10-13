const CART_KEY = "shopsphere-cart";

import { updateNavigation } from "./auth.js";

export function getCart() {

    const savedCart =
        localStorage.getItem(CART_KEY);

    if (!savedCart) {
        return [];
    }

    return JSON.parse(savedCart);
}

export function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );
}

export function addToCart(product) {

    const cart = getCart();

    const existingProduct =
        cart.find(function (item) {
            return item.id === product.id;
        });

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1
        });

    }

    saveCart(cart);

    return cart;
}

const cartContainer =
    document.getElementById("cart-container");

const cartCount =
    document.getElementById("cart-count");

const cartTotal =
    document.getElementById("cart-total");

if (cartContainer) {

    renderCart();

}

function renderCart() {

    const cart = getCart();

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.textContent =
            "Your cart is empty.";

        cartCount.textContent = "0";
        cartTotal.textContent = "$0.00";

        return;
    }

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(function (product) {

        totalItems += product.quantity;

        totalPrice +=
            product.price * product.quantity;

        const card =
            document.createElement("article");

        card.className = "product-card";

        const image =
            document.createElement("img");

        image.src = product.thumbnail;
        image.alt = product.title;

        const title =
            document.createElement("h3");

        title.textContent = product.title;

        const price =
            document.createElement("p");

        price.textContent =
            `$${product.price} × ${product.quantity}`;





            const quantityControls =
    document.createElement("div");

const decreaseButton =
    document.createElement("button");

decreaseButton.type = "button";
decreaseButton.textContent = "−";

const quantityText =
    document.createElement("span");

quantityText.textContent =
    ` ${product.quantity} `;

const increaseButton =
    document.createElement("button");

increaseButton.type = "button";
increaseButton.textContent = "+";

decreaseButton.addEventListener(
    "click",
    function () {

        const cart = getCart();

        const item =
            cart.find(function (item) {
                return item.id === product.id;
            });

        if (item.quantity > 1) {

            item.quantity -= 1;

            saveCart(cart);

            renderCart();

        } else {

            const updatedCart =
                cart.filter(function (item) {
                    return item.id !== product.id;
                });

            saveCart(updatedCart);

            renderCart();
        }
    }
);

increaseButton.addEventListener(
    "click",
    function () {

        const cart = getCart();

        const item =
            cart.find(function (item) {
                return item.id === product.id;
            });

        item.quantity += 1;

        saveCart(cart);

        renderCart();
    }
);

quantityControls.appendChild(
    decreaseButton
);

quantityControls.appendChild(
    quantityText
);

quantityControls.appendChild(
    increaseButton
);

card.appendChild(quantityControls);

        card.appendChild(image);
card.appendChild(title);
card.appendChild(price);

const removeButton =
    document.createElement("button");

removeButton.type = "button";
removeButton.textContent =
    "Remove from Cart";

removeButton.className = "button";

removeButton.addEventListener(
    "click",
    function () {

        const updatedCart =
            getCart().filter(function (item) {
                return item.id !== product.id;
            });

        saveCart(updatedCart);

        renderCart();
    }
);

card.appendChild(removeButton);

cartContainer.appendChild(card);

    });

    cartCount.textContent =
        totalItems;

    cartTotal.textContent =
        `$${totalPrice.toFixed(2)}`;
}

updateNavigation();

const checkoutButton =
    document.getElementById("checkout-button");

if (checkoutButton) {

    checkoutButton.addEventListener("click", function () {

        const cart = getCart();

        if (cart.length === 0) {

            alert("Your cart is empty.");
            return;
        }

        alert(
            "Demo checkout successful! No real payment was processed."
        );

        saveCart([]);

        renderCart();
    });
}