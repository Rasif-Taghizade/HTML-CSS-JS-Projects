//! Dropdown menu 
const countryFilter = document.querySelector(".country-filter"),
    filterSelect = document.querySelector(".filter-select"),
    filterSelectText = filterSelect.querySelector("p"),
    filterOptions = document.querySelectorAll(".filter-option");

filterSelect.addEventListener("click", () => {
    countryFilter.classList.toggle("active");
});

filterOptions.forEach(option => {
    option.addEventListener("click", (e) => {
        let optionText = option.querySelector("p").textContent
        filterSelectText.textContent = optionText;
        countryFilter.classList.remove("active");
        filterByRegion(optionText)
    });
})

// document.body.addEventListener("click", (e) => {
//     console.log(e.target);
//     if (!e.target.classList.contains("filter-select")) {
//         countryFilter.classList.remove("active");
//     }
// });

//? Constans
let countriesContainer = document.querySelector(".countries-container");
let countrySearchInput = document.querySelector("#country-search")
let themeText = document.querySelector(".header-content > p")
let themeIcon = document.querySelector(".header-content > p > i")
let textSpan = themeText.querySelector("span");
let allData;
let theme = localStorage.getItem("theme");
if (theme === "dark") {
    textSpan.textContent = "Dark Mode"
    themeIcon.classList.replace("fa-sun", "fa-moon")
    document.body.classList.add("dark")
}

//* get all countries 
fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then((data) => {
        allData = data;
        repeatCountry(data)
    })

//* filter country
function filterByRegion(region) {
    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(res => res.json())
        .then(repeatCountry)
}

//! DRY 
function repeatCountry(data) {
    countriesContainer.innerHTML = ""
    data.forEach(country => {
        const countryCard = document.createElement("a")
        countryCard.classList.add("country-card")
        countryCard.href = `/country-detail.html?name=${country.name.common}`

        const cardHTML = `
                <div class="card-flag">
                    <img src="${country.flags.svg}" alt="flag" />
                </div>
                <div class="card-description">
                    <h3 class="card-title">${country.name.common}</h3>
                    <p class="card-population">Population: <span>${country.population.toLocaleString('en-AZ')}</span></p>
                    <p class="card-region">Region: <span>${country.region}</span></p>
                    <p class="card-capital">Capital: <span>${country.capital?.[0]}</span></p>
                </div>
            `
        countryCard.innerHTML = cardHTML

        countriesContainer.appendChild(countryCard)
    })
}

//* Search country
countrySearchInput.addEventListener("input", (e) => {
    let searchCountry = allData.filter((country) => {
        return country.name.common.toUpperCase().includes(e.target.value.toUpperCase())
    })
    repeatCountry(searchCountry)
})

themeText.addEventListener("click", function (e) {
    document.body.classList.toggle("dark")
    if (textSpan.textContent === "Light Mode") {
        // switch to dark theme
        textSpan.textContent = "Dark Mode"
        themeIcon.classList.replace("fa-sun", "fa-moon")
        localStorage.setItem("theme", "dark")
    } else {
        textSpan.textContent = "Light Mode";
        themeIcon.classList.replace("fa-moon", "fa-sun")
        localStorage.removeItem("theme")
    }
})

