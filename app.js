const loadCountries = async () =>{
    const url = `https://restcountries.com/v2/all?fields=name,region,area`;
    const res = await fetch(url);
    const data = await res.json();
    displayCountries(data);

}

loadCountries()

const displayCountries = (countries )=>{
    const countriesContainer = document.getElementById('countries-container');
  countries.forEach(country => {
    console.log(country);
    const singleCountryDiv = document.createElement('div');
    singleCountryDiv.classList.add('single-country');
    singleCountryDiv.innerHTML=`
    <h4>Name: ${country.name}</h4>
    <p>Region : ${country.region}</p>
    <p>Area : ${country.area}</p>`;
    countriesContainer.appendChild(singleCountryDiv);
    /*const singleCountryDiv = document.getElementById('single-country');
    singleCountryDiv.innerHTML=`
    <h4>Name: ${country.name}</h4>
    <p>Region : ${country.region}</p>
    <p>Area : ${country.area}</p>`;
    countriesContainer.appendChild(singleCountryDiv);*/
});
}