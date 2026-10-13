
const WISHLIST_KEY = "shopsphere-wishlist";

import { updateNavigation } from "./auth.js";

export function getWishlist() {

    const savedWishlist =
        localStorage.getItem(WISHLIST_KEY);

    if (!savedWishlist) {
        return [];
    }

    return JSON.parse(savedWishlist);
}

export function saveWishlist(wishlist) {

    localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(wishlist)
    );
}

export function addToWishlist(product) {

    const wishlist = getWishlist();

    const alreadyExists =
        wishlist.some(function (item) {
            return item.id === product.id;
        });

    if (!alreadyExists) {

        wishlist.push({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            category: product.category
        });

        saveWishlist(wishlist);
    }

    return wishlist;
}

const wishlistContainer =
    document.getElementById("wishlist-container");

if (wishlistContainer) {
    renderWishlist();
}

function renderWishlist() {

    const wishlist = getWishlist();

    wishlistContainer.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistContainer.textContent =
            "Your wishlist is empty.";

        return;
    }

    wishlist.forEach(function (product) {

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

        price.textContent = `$${product.price}`;

       card.appendChild(image);
card.appendChild(title);
card.appendChild(price);

const removeButton =
    document.createElement("button");

removeButton.type = "button";
removeButton.textContent = "Remove from Wishlist";
removeButton.className = "button";

removeButton.addEventListener(
    "click",
    function () {

        const updatedWishlist =
            getWishlist().filter(function (item) {
                return item.id !== product.id;
            });

        saveWishlist(updatedWishlist);

        renderWishlist();
    }
);

card.appendChild(removeButton);

wishlistContainer.appendChild(card);
    });
}


updateNavigation();