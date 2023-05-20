const toggleTheme = document.querySelector(".navbar__button");
const githubProfile = document.querySelector(".github__profile");
const headlineRepositories = document.querySelector(".github__headline");
const repositories = document.querySelector(".github__repositories");
const searchInput = document.getElementById("search");

let userName = "";

// Add dark theme to the webpage
toggleTheme.addEventListener("click", (event) => {
    const body = document.querySelector("body");
    if (body.classList.contains("darkMode")) {
        body.classList.remove("darkMode");
        event.target.innerHTML = '<span class="material-symbols-outlined navbar__toggle">dark_mode</span>';
    } else {
        body.classList.add("darkMode");
        event.target.innerHTML = '<span class="material-symbols-outlined navbar__toggle">light_mode</span>';
    }
});

function searchProfile() {
    let inputValue = searchInput.value.trim();
    if (inputValue.length <= 0) {
        alert("Please enter a valid username");
        searchInput.value = "";
        searchInput.focus();
        return false;
    } else {
        userName = inputValue;
        fetchGithubProfile();
        searchInput.value = "";
        searchInput.focus();
    }
}

searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        searchProfile();
    }
});

function fetchGithubProfile() {
    fetch(`https://api.github.com/users/${userName}`)
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            if (data.message === "Not Found") {
                alert("User may not exist. Please, enter a valid username.");
                return false;
            } else {
                githubProfile.innerHTML = `
            <img src="${data.avatar_url}" alt="${data.login}" class="github__image">
            <p class="github__profileName">${data.login}</p>
          `;
                fetchGithubRepositories();
            }
        });
}

function fetchGithubRepositories() {
    fetch(`https://api.github.com/users/${userName}/repos`)
        .then(response => response.json())
        .then(function (repositoryData) {
            console.log(repositoryData);
            const headlineRepositories = document.querySelector(".github__headline");
            const repositories = document.querySelector(".github__repositories");

            if (repositoryData.length <= 0) {
                headlineRepositories.textContent = "No repositories found.";
                repositories.innerHTML = ""; 
            } else {
                if (repositoryData.message === "Not Found") {
                    headlineRepositories.textContent = "No repositories found.";
                    repositories.innerHTML = `
              <h1 class="github__headline">repositories</h1>
              <div class="github__wrapper">
                <div class="github__repository">
                  <h3 class="github__repositoryName">User not found.</h3>
                </div>
              </div>
            `;
                } else {
                    let repositoriesData = repositoryData.map(item => {
                        return `
                <div class="github__repository">
                  <h3 class="github__repositoryName">${item.name}</h3>
                  <div class="github__interactions">
                    <span>
                      <span class="material-symbols-outlined">
                        star
                      </span>
                    </span>
                    <span>${item.watchers}</span>
                  </div>
                  <div>
                    <span>
                      <span class="material-symbols-outlined">
                        conversion_path
                      </span>
                    </span>
                    <span>${item.forks}</span>
                  </div>
                  <div>
                    <span>
                      <span class="material-symbols-outlined">
                        content_copy
                      </span>
                    </span>
                    <span>${item.size}mb</span>
                  </div>
                </div>
              `;
                    });
                    repositories.innerHTML = `
              <h1 class="github__headline">repositories</h1>
              <div class="github__wrapper">
                ${repositoriesData.slice(0, 6).join("")}
              </div>
            `;
                }
            }
        });
}