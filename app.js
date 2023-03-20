let countries = [];
// fetching country list
const loadCountries = async () =>{
    const url = `https://restcountries.com/v2/all?fields=name,region,area`;
    const res = await fetch(url);
    const data = await res.json();
    countries = data; // store data in arr variable
    displayCountries(data);
}
// call load Countries
loadCountries()

const displayCountries = (countries )=>{
    const countriesContainer = document.getElementById('countries-container');
    countriesContainer.textContent=``;
  countries.forEach(country => {
    // console.log(country);
    const singleCountryDiv = document.createElement('div');
    singleCountryDiv.classList.add('single-country');
    singleCountryDiv.innerHTML=`
    <h4>Name: ${country.name}</h4>
    <p>Region : ${country.region}</p>
    <p>Area : ${country.area}</p>`;
    countriesContainer.appendChild(singleCountryDiv);
});
}

// const search = () =>{
//     toggleSpinner(true)
//     const searchField = document.getElementById('search-field');
//     const searchText = searchField.value;
//     const url = `https://restcountries.com/v2/name/${searchText}`;

// };

// search by category
const search = () =>{
    const inputField = document.getElementById("search-field").value;
    const searchedCountry = countries.filter((country) =>
    country.name.toLowerCase().includes(inputField.toLowerCase())
    );
    displayCountries(searchedCountry);
}
// handle spinner
const toggleSpinner = (isLoading) => {
    const loader = document.getElementById("spinner");
    if (isLoading) {
      loader.classList.remove("d-none");
    } else {
      loader.classList.add("d-none");
    }
  }
