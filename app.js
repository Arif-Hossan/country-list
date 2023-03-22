let countries = [];
let pageSize = 25;
let paginationContainer;
let paginatedCountries;

// Fetch country list
const loadCountries = async () => {
  const url = `https://restcountries.com/v2/all?fields=name,region,area`;
  const res = await fetch(url);
  const data = await res.json();
  countries = data;
  paginatedCountries = paginateCountries(countries, pageSize);
  paginationContainer = document.getElementById('pagination-container');
  let searchField = document.getElementById('search-field');

  // Add search event listener
  searchField.addEventListener('input', () => {
    let input = searchField.value.toLowerCase();
    let searchedCountries = countries.filter(country => country.name.toLowerCase().includes(input));
    paginatedCountries = paginateCountries(searchedCountries, pageSize);
    displayCountries(paginatedCountries[0], 0, pageSize);
    updatePaginationLinks(paginationContainer, paginatedCountries.length);
  });

  // Add pagination links
  updatePaginationLinks(paginationContainer, paginatedCountries.length);

  // Display countries
  displayCountries(paginatedCountries[0], 0, pageSize);
}

// Paginate countries
const paginateCountries = (countries, pageSize) => {
  const numPages = Math.ceil(countries.length / pageSize);
  const paginatedCountries = [];
  for (let i = 0; i < numPages; i++) {
    const startIndex = i * pageSize;
    const endIndex = startIndex + pageSize;
    const pageCountries = countries.slice(startIndex, endIndex);
    paginatedCountries.push(pageCountries);
  }
  return paginatedCountries;
}

// Display countries
const displayCountries = (paginatedCountries, startIndex, endIndex) => {
  const countriesContainer = document.getElementById('countries-container');
  countriesContainer.textContent = '';
  paginatedCountries.slice(startIndex, endIndex).forEach(country => {
    const singleCountryDiv = document.createElement('div');
    singleCountryDiv.classList.add('single-country');
    singleCountryDiv.innerHTML = `
      <h4>Name: ${country.name}</h4>
      <p>Region: ${country.region}</p>
      <p>Area: ${country.area}</p>`;
    countriesContainer.appendChild(singleCountryDiv);
  });
}

// Update pagination links
const updatePaginationLinks = (paginationContainer, numPages) => {
  paginationContainer.textContent = '';
  for (let i = 0; i < numPages; i++) {
    const pageLink = document.createElement('a');
    pageLink.classList.add('page-link');
    pageLink.href = '#';
    pageLink.textContent = i + 1;
    pageLink.addEventListener('click', () => {
      displayCountries(paginatedCountries[i], 0, pageSize);
    });
    const pageItem = document.createElement('li');
    pageItem.classList.add('page-item');
    pageItem.appendChild(pageLink);
    paginationContainer.appendChild(pageItem);
  }
}

loadCountries();
