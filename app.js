let countries = [];

// Fetch country list
const loadCountries = async () => {
  const url = `https://restcountries.com/v2/all?fields=name,region,area`;
  const res = await fetch(url);
  const data = await res.json();
  countries = data;
  const pageSize = 25;
  const paginatedCountries = paginateCountries(countries, pageSize);
  const paginationContainer = document.getElementById('pagination-container');
  for (let i = 0; i < paginatedCountries.length; i++) {
    const pageLink = document.createElement('a');
    pageLink.classList.add('page-link');
    pageLink.href = '#';
    pageLink.textContent = i + 1;
    pageLink.addEventListener('click', () => {
      const startIndex = i * pageSize;
      const endIndex = startIndex + pageSize;
      displayCountries(countries, startIndex, endIndex);
    });
    const pageItem = document.createElement('li');
    pageItem.classList.add('page-item');
    pageItem.appendChild(pageLink);
    paginationContainer.appendChild(pageItem);
  }
  displayCountries(countries, 0, pageSize);
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
const displayCountries = (countries, startIndex, endIndex) => {
  const countriesContainer = document.getElementById('countries-container');
  countriesContainer.textContent = '';
  countries.slice(startIndex, endIndex).forEach(country => {
    const singleCountryDiv = document.createElement('div');
    singleCountryDiv.classList.add('single-country');
    singleCountryDiv.innerHTML = `
      <h4>Name: ${country.name}</h4>
      <p>Region: ${country.region}</p>
      <p>Area: ${country.area}</p>`;
    countriesContainer.appendChild(singleCountryDiv);
  });
}

// Search countries
const search = () => {
  const inputField = document.getElementById('search-field').value;
  const searchedCountry = countries.filter(country =>
    country.name.toLowerCase().includes(inputField.toLowerCase())
  );
  displayCountries(searchedCountry, 0, 25);
}

// Toggle spinner
const toggleSpinner = isLoading => {
  const loader = document.getElementById('spinner');
  if (isLoading) {
    loader.classList.remove('d-none');
  } else {
    loader.classList.add('d-none');
  }
}
loadCountries()