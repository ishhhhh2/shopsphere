import { fetchProducts } from "./api.js";

 import {
    addToCart,
    getCart
} from "./cart.js";

import { addToWishlist } from "./wishlist.js";

import { updateNavigation } from "./auth.js";

console.log("Products.js loaded successfully");

const productsContainer =
    document.getElementById("products-container");

const searchInput =
    document.getElementById("search-input");

const categoryFilter =
    document.getElementById("category-filter");

const sortSelect =
    document.getElementById("sort-select");

let allProducts = [];

async function loadProducts() {

    try {

        const products = await fetchProducts();

        allProducts = products;

        populateCategories(products);

        renderProducts(products);

    } catch (error) {

        console.error(error);

        productsContainer.textContent =
            "Unable to load products.";
    }
}

function populateCategories(products) {

    const categories = [];

    products.forEach(function (product) {

        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }

    });

    categories.sort();

    categories.forEach(function (category) {

        const option =
            document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);

    });
}

function renderProducts(products) {

    productsContainer.innerHTML = "";

    products.forEach(function (product) {

        const card =
            document.createElement("article");

        card.className = "product-card";

        const title =
    document.createElement("h3");

const titleLink =
    document.createElement("a");

titleLink.href = `product.html?id=${product.id}`;

titleLink.textContent = product.title;

title.appendChild(titleLink);

        const image =
    document.createElement("img");

image.src = product.thumbnail;
image.alt = product.title;
image.loading = "lazy";

        const price =
            document.createElement("p");

        price.textContent = `$${product.price}`;

        const category =
            document.createElement("p");

        category.textContent = product.category;

        card.appendChild(image);
card.appendChild(title);
card.appendChild(price);
card.appendChild(category);

const cartButton =
    document.createElement("button");

cartButton.type = "button";
cartButton.textContent = "Add to Cart";
cartButton.className = "button";

const cart =
    getCart();

const alreadyInCart =
    cart.some(function (item) {
        return item.id === product.id;
    });

if (alreadyInCart) {

    cartButton.textContent =
        "Added to Cart";

} else {

    cartButton.addEventListener(
        "click",
        function () {

            addToCart(product);

            cartButton.textContent =
                "Added to Cart";

        }
    );
}
    
card.appendChild(cartButton);

const wishlistButton =
    document.createElement("button");

wishlistButton.type = "button";
wishlistButton.textContent = "♡ Add to Wishlist";
wishlistButton.className = "button";

wishlistButton.addEventListener(
    "click",
    function () {

        addToWishlist(product);

        wishlistButton.textContent =
            "♥ Added to Wishlist";

    }
);

card.appendChild(wishlistButton);

        productsContainer.appendChild(card);
    });
}

function updateProducts() {

    let filteredProducts = [...allProducts];

    const searchText =
        searchInput.value.toLowerCase().trim();

    const selectedCategory =
        categoryFilter.value;

    const selectedSort =
        sortSelect.value;

    // Search
    if (searchText !== "") {

        filteredProducts =
            filteredProducts.filter(function (product) {

                return product.title
                    .toLowerCase()
                    .includes(searchText);

            });
    }

    // Category filter
    if (selectedCategory !== "all") {

        filteredProducts =
            filteredProducts.filter(function (product) {

                return product.category === selectedCategory;

            });
    }

    // Sorting
    if (selectedSort === "price-low") {

        filteredProducts.sort(function (a, b) {
            return a.price - b.price;
        });

    } else if (selectedSort === "price-high") {

        filteredProducts.sort(function (a, b) {
            return b.price - a.price;
        });

    } else if (selectedSort === "name") {

        filteredProducts.sort(function (a, b) {

            return a.title.localeCompare(b.title);

        });
    }

    renderProducts(filteredProducts);
}

searchInput.addEventListener(
    "input",
    updateProducts
);

categoryFilter.addEventListener(
    "change",
    updateProducts
);

sortSelect.addEventListener(
    "change",
    updateProducts
);

updateNavigation();

loadProducts();