
const toggleTheme = document.querySelector(".navbar__button");
const githubImage = document.querySelector(".github_image");
const githubProfileName = document.querySelector(".github__profileName");

// Add dark theme to the webpage
toggleTheme.addEventListener("click", (event) => {
    const body = document.querySelector("body");
    if (body.classList.contains("darkMode")) {
        body.classList.remove("darkMode");
        event.target.innerHTML = '<span class="material-symbols-outlined navbar__toggle">dark_mode</span>'
    } else {
        body.classList.add("darkMode");
        event.target.innerHTML = '<span class="material-symbols-outlined navbar__toggle">light_mode</span>'
    }
})


// Fetch github API
