import { fetchProducts } from "./api.js";
import { updateNavigation } from "./auth.js";

const ADMIN_PRODUCTS_KEY = "shopsphere-admin-products";

const adminProducts =
    document.getElementById("admin-products");

const productForm =
    document.getElementById("product-form");

const adminMessage =
    document.getElementById("admin-message");

let products = [];

function saveAdminProducts() {

    localStorage.setItem(
        ADMIN_PRODUCTS_KEY,
        JSON.stringify(products)
    );
}

function getSavedAdminProducts() {

    const saved =
        localStorage.getItem(ADMIN_PRODUCTS_KEY);

    if (!saved) {
        return [];
    }

    return JSON.parse(saved);
}

async function loadAdminProducts() {

    try {

      const apiProducts = await fetchProducts();
const savedProducts = getSavedAdminProducts();

const productMap = new Map();

apiProducts.forEach(function (product) {
    productMap.set(product.id, product);
});

savedProducts.forEach(function (product) {
    productMap.set(product.id, product);
});

products = Array.from(productMap.values());

    } catch (error) {

        console.error(error);

        adminProducts.textContent =
            "Unable to load products.";
    }
}

function renderAdminProducts() {

    adminProducts.innerHTML = "";

    products.forEach(function (product) {

        const card =
            document.createElement("article");

        card.className = "product-card";

        const title =
            document.createElement("h3");

        title.textContent = product.title;

        const price =
            document.createElement("p");

        price.textContent = `$${product.price}`;

        const category =
            document.createElement("p");

        category.textContent =
            product.category;

       
card.appendChild(title);
card.appendChild(price);
card.appendChild(category);

const editButton =
    document.createElement("button");

editButton.type = "button";
editButton.textContent = "Edit";
editButton.className = "button";

editButton.addEventListener("click", function () {

    const updatedName = prompt(
        "Enter product name:",
        product.title
    );

    if (updatedName === null) {
        return;
    }

    const updatedPrice = prompt(
        "Enter product price:",
        product.price
    );

    if (updatedPrice === null) {
        return;
    }

    const updatedCategory = prompt(
        "Enter product category:",
        product.category
    );

    if (updatedCategory === null) {
        return;
    }

    const name = updatedName.trim();
    const price = Number(updatedPrice);
    const category = updatedCategory.trim();

    if (
        !name ||
        !category ||
        !Number.isFinite(price) ||
        price <= 0
    ) {
        alert("Please enter a valid name, category, and price.");
        return;
    }

    product.title = name;
    product.price = price;
    product.category = category;

    saveAdminProducts();
    renderAdminProducts();

    adminMessage.textContent =
        "Product updated successfully!";
});

card.appendChild(editButton);

 
const deleteButton =
    document.createElement("button");

deleteButton.type = "button";
deleteButton.textContent = "Delete";
deleteButton.className = "button";

deleteButton.addEventListener("click", function () {

    const confirmed = confirm(
        `Are you sure you want to delete "${product.title}"?`
    );

    if (!confirmed) {
        return;
    }

    products = products.filter(function (item) {
        return item.id !== product.id;
    });

    saveAdminProducts();
    renderAdminProducts();

    adminMessage.textContent =
        "Product deleted successfully!";
});

card.appendChild(deleteButton);


adminProducts.appendChild(card);

    });
}

updateNavigation();

loadAdminProducts();

 
productForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("product-name").value.trim();

    const price =
        Number(document.getElementById("product-price").value);

    const category =
        document.getElementById("product-category").value.trim();

    const image =
        document.getElementById("product-image").value.trim();

    const newProduct = {
        id: Date.now(),
        title: name,
        price: price,
        category: category,
        thumbnail: image || "https://placehold.co/300x200?text=Product",
        description: "A product available at ShopSphere."
    };

    products.unshift(newProduct);

    saveAdminProducts();

    renderAdminProducts();

    adminMessage.textContent =
        "Product added successfully!";

    productForm.reset();
});
