let countryName = new URLSearchParams(document.location.search).get("name");
const detailsImage = document.querySelector(".details-image");
const countryTitle = document.querySelector(".country-title");
const countryNativeName = document.querySelector(".country__native-name");
const countryPopulation = document.querySelector(".country__population");
const countryRegion = document.querySelector(".country__region");
const countrySubRegion = document.querySelector(".country__sub-region");
const countryCapital = document.querySelector(".country__capital");
const countryTopLevelDomain = document.querySelector(".country__domain");
const countryCurrencies = document.querySelector(".country__currencies");
const countryLanguages = document.querySelector(".country__langs");
const countryBorderCountries = document.querySelector(".border-country > p");
let themeText = document.querySelector(".header-content > p")
let themeIcon = document.querySelector(".header-content > p > i")
let textSpan = themeText.querySelector("span");
let theme = localStorage.getItem("theme");
console.log(theme);
if (theme === "dark") {
    textSpan.textContent = "Dark Mode"
    themeIcon.classList.replace("fa-sun", "fa-moon")
    document.body.classList.add("dark")
}



fetch("https://restcountries.com/v3.1/name/" + countryName)
    .then((response) => response.json())
    .then(data => {
        data.forEach(country => {
            console.log(country);
            detailsImage.src = country.flags.svg;

            countryTitle.innerHTML = country.name.common;

            if (country.name.nativeName) {
                countryNativeName.innerHTML = `<b>Native name:</b> ${Object.values(country.name.nativeName)[0].common}`;
            }
            else {
                countryNativeName.innerHTML = `<b>Native name:</b> ${country.name.common}`;
            }

            countryPopulation.innerHTML = `<b>Population:</b> ${country.population.toLocaleString()}`;

            countryRegion.innerHTML = `<b>Region:</b> ${country.region}`;
            countrySubRegion.innerHTML = `<b>Sub Region:</b> ${country.subregion}`;

            countryCapital.innerHTML = `<b>Capital:</b> ${country.capital}`;

            countryTopLevelDomain.innerHTML = `<b>Top Level Domain:</b> ${country.tld}`;
            countryCurrencies.innerHTML = `<b>Currencies:</b> ${Object.values(country.currencies)[0].name}`;
            countryLanguages.innerHTML = `<b>Languages:</b> ${Object.values(country.languages).map(lang => lang)}`;

            // Border Countries
            if (country.borders) {
                country.borders.forEach(border => {
                    fetch("https://restcountries.com/v3.1/alpha/" + border)
                        .then((response) => response.json())
                        .then(data => {
                            let countryTagName = document.createElement("a");
                            countryTagName.href = `/country-detail.html?name=${data[0].name.common}`
                            countryTagName.innerHTML = data[0].name.common;
                            countryBorderCountries.appendChild(countryTagName);
                        })
                })
            }
        })
    })


themeText.addEventListener("click", function (e) {
    document.body.classList.toggle("dark")
    if (textSpan.textContent === "Light Mode") {
        textSpan.textContent = "Dark Mode"
        themeIcon.classList.replace("fa-sun", "fa-moon")
        localStorage.setItem("theme", "dark")
    } else {
        textSpan.textContent = "Light Mode";
        themeIcon.classList.replace("fa-moon", "fa-sun")
        localStorage.removeItem("theme")
    }
})