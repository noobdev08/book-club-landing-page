// Form & Inputs
let form = document.getElementById("form");
let usernameInput = document.getElementById("username"); 
let emailInput = document.getElementById("email");

// Modal
let modalBox = document.getElementById("modal-box");
let modalText = document.getElementById("modal-text");
let modalBtn = document.getElementById("modal-btn");

// Navbar
let navLinks = document.querySelector(".links");
let hamburger = document.querySelector(".burger");
let navItems = document.querySelectorAll(".list-items");

usernameInput.addEventListener("input", () => {
    usernameInput.style.border = usernameInput.value.trim() ? "2px solid green" : "2px solid red";
});

emailInput.addEventListener("input", () => {
    let emailValid = emailInput.value.includes("@") && emailInput.value.includes(".");
    emailInput.style.border = emailValid ? "2px solid green" : "2px solid red";
});

form.addEventListener("submit", (e) => {
    e.preventDefault(); 

    let isUsernameValid = usernameInput.value.trim() !== "";
    let isEmailValid = emailInput.value.includes("@") && emailInput.value.includes(".");

    if (isUsernameValid && isEmailValid) {
        modalText.textContent = `Welcome to the Club, ${usernameInput.value}!`;
        modalBox.classList.add("modal-open");

        const formData = new FormData(form);
        const encodedData = new URLSearchParams(formData).toString();

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encodedData
        })
        .then(() => console.log("Form successfully submitted to Netlify!"))
        .catch(err => console.error("Form submission error:", err));

        form.reset();
        usernameInput.style.border = "";
        emailInput.style.border = "";
    }
});

modalBtn.addEventListener("click", () => {
    modalBox.classList.remove("modal-open");
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Backspace") {
        modalBox.classList.remove("modal-open");
    }
});

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

navItems.forEach(item => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});