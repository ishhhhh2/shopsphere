
import { fetchProducts } from "./api.js";

const productDetails =
    document.getElementById("product-details");

async function loadProductDetails() {

    try {

        const products = await fetchProducts();

        const params =
            new URLSearchParams(window.location.search);

        const productId =
            Number(params.get("id"));

        const product =
            products.find(function (item) {
                return item.id === productId;
            });

        if (!product) {

            productDetails.textContent =
                "Product not found.";

            return;
        }

        renderProductDetails(product);

    } catch (error) {

        console.error(error);

        productDetails.textContent =
            "Unable to load product details.";
    }
}

function renderProductDetails(product) {

    productDetails.innerHTML = "";

    const image =
        document.createElement("img");

    image.src = product.thumbnail;
    image.alt = product.title;
    image.loading = "lazy";

    image.style.width = "100%";
    image.style.maxWidth = "350px";
    image.style.height = "280px";
    image.style.objectFit = "contain";

    const title =
        document.createElement("h1");

    title.textContent = product.title;

    const price =
        document.createElement("p");

    price.textContent = `$${product.price}`;

    const category =
        document.createElement("p");

    category.textContent =
        `Category: ${product.category}`;

    const description =
        document.createElement("p");

    description.textContent =
        product.description;

    productDetails.appendChild(image);
    productDetails.appendChild(title);
    productDetails.appendChild(price);
    productDetails.appendChild(category);
    productDetails.appendChild(description);
}

loadProductDetails();
