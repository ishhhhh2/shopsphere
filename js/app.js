import { fetchProducts } from "./api.js";

const featuredProducts = document.getElementById("featured-products");

async function loadFeaturedProducts() {
    try {
        const products = await fetchProducts();

        const featured = products.slice(0, 4);

        renderFeaturedProducts(featured);

    } catch (error) {
        console.error(error);

        featuredProducts.textContent =
            "Unable to load featured products.";
    }
}

function renderFeaturedProducts(products) {

    featuredProducts.innerHTML = "";

    products.forEach(function (product) {

        const card = document.createElement("article");

        card.className = "product-card";

        const title = document.createElement("h3");
        title.textContent = product.title;

        const price = document.createElement("p");
        price.textContent = `$${product.price}`;

        const category = document.createElement("p");
        category.textContent = product.category;

        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(category);

        featuredProducts.appendChild(card);
    });
}

loadFeaturedProducts();

import { getCurrentUser, logout } from "./auth.js";

const currentUser = getCurrentUser();

const navLinks = document.querySelector(".nav-links");

if (currentUser && navLinks) {

    const loginLink = navLinks.querySelector(
        'a[href="login.html"]'
    );

    if (loginLink) {

        loginLink.textContent = currentUser.email;
        loginLink.href = "#";

    }

    const logoutButton = document.createElement("button");

    logoutButton.type = "button";
    logoutButton.textContent = "Logout";
    logoutButton.className = "button";

    logoutButton.addEventListener("click", function () {
        logout();
    });

    navLinks.appendChild(logoutButton);
}