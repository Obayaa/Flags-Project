const countryCard = document.querySelector("main");
const searchCountry = document.querySelector("#search");

// This variable will hold all countries data fetched from the API 
let allCountriesData = [];

// This function fetches all countries data from the REST API
// and returns it as a JSON object
const fetchCountries = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();

  countries.sort((a, b) => {
    // Sort countries by name in ascending order
    return a.name.common.localeCompare(b.name.common);
  });

  return countries;
}

// Initialize data and display all countries
async function initialize() {
  allCountriesData = await fetchCountries();
  showCountries(allCountriesData);

  // Add event listener to search input
  searchCountry.addEventListener('input', () => {
    searchCountries(searchCountry.value);
  });
}

// This function displays the countries in the DOM
function showCountries(countries) {
  // Clear previous results first
  countryCard.innerHTML = '';

  // Display a message if no countries match the search term
  if (countries.length === 0) {
    const noResults = document.createElement("p");
    noResults.textContent = "No results found";
    noResults.classList.add("no-results");
    countryCard.appendChild(noResults);
    return;
  }

  // Loop through the countries and create elements for each
  countries.forEach((country) => {
    const dataContainer = document.createElement("div");
    dataContainer.classList.add("data-container");

    const flagName = document.createElement("p");
    flagName.textContent = country.name.common;

    const flagImage = document.createElement("img");
    flagImage.src = country.flags.svg;

    const flagImageContainer = document.createElement("div");
    flagImageContainer.classList.add("flag-image-container");

    flagImageContainer.appendChild(flagImage);

    dataContainer.appendChild(flagImageContainer);
    dataContainer.appendChild(flagName);

    populateDOM(dataContainer);
  });
}

// This function populates the DOM with the country data
function populateDOM(childElement) {
  countryCard.appendChild(childElement);
}

// This function filters the countries based on the search term 
// and updates the displayed countries
function searchCountries(searchTerm) {
  searchTerm = searchTerm.toLowerCase().trim();

  // If search is empty, show all countries
  if (!searchTerm) {
    showCountries(allCountriesData);
    return;
  }

  // Filter countries that match the search term (partial match)
  const matchedCountries = allCountriesData.filter((country) => {
    return country.name.common.toLowerCase().includes(searchTerm);
  });

  showCountries(matchedCountries);
}

initialize();