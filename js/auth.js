
const USER_KEY = "shopsphere-user";
 

const loginForm =
    document.getElementById("login-form");

const loginMessage =
    document.getElementById("login-message");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                document.getElementById("email").value.trim();

            const password =
                document.getElementById("password").value;

            if (!email || password.length < 6) {

                loginMessage.textContent =
                    "Enter a valid email and a password with at least 6 characters.";

                return;
            }

            const user = {
                email: email
            };

            localStorage.setItem(
                USER_KEY,
                JSON.stringify(user)
            );

            loginMessage.textContent =
                "Login successful! Welcome to ShopSphere.";

            loginForm.reset();
        }
    );
}

export function logout() {

    localStorage.removeItem("shopsphere-user");

    window.location.href = "login.html";
}

const logoutButton =
    document.getElementById("logout-button");

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        logout
    );
}

export function getCurrentUser() {

    const savedUser =
        localStorage.getItem("shopsphere-user");

    if (!savedUser) {
        return null;
    }

    return JSON.parse(savedUser);
}

export function updateNavigation() {

    const user = getCurrentUser();

    const navLinks =
        document.querySelector(".nav-links");

    if (!navLinks || !user) {
        return;
    }

    const loginLink =
        navLinks.querySelector('a[href="login.html"]');

    if (loginLink) {
        loginLink.textContent = user.email;
        loginLink.removeAttribute("href");
    }

    if (!navLinks.querySelector("#nav-logout")) {

        const logoutButton =
            document.createElement("button");

        logoutButton.id = "nav-logout";
        logoutButton.type = "button";
        logoutButton.textContent = "Logout";
        logoutButton.className = "button";

        logoutButton.addEventListener("click", logout);

        navLinks.appendChild(logoutButton);
    }
}