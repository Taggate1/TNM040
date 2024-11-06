import CountryInfo from './CountryInfo';
import { BrowserRouter, Routes, Route, useParams, Link } from "react-router-dom";
import countries from 'world-countries'
import { useState } from 'react';
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CountryList />}></Route>
          <Route path="/country/:cca3" element={<CountryDetails />}/>
      </Routes>
    </BrowserRouter>
  );
}

function CountryList() {
  const largeCountries = countries.toSorted((a, b) => b.area - a.area);
  const largeCountriesTwo = largeCountries.filter((country) => country.name.common != "Antarctica");
  const largeCountriesThree = largeCountriesTwo.slice(0, 14);
  
  const [searchString, setSearchString] = useState("");
  
  const matchSearch = country => {
    const lowerCaseCountry = country.name.common.toLowerCase();
    const lowerCaseSearchString = searchString.toLowerCase();

    return lowerCaseCountry.indexOf(lowerCaseSearchString) === 0; 
  }

  const filteredCountries = largeCountriesTwo.filter(matchSearch).slice(0, 5);
  
  function handleChange(text) {
    setSearchString(text);
  }
  return (
    <>
        <input style={{height: "30px"}} onInput={e => {
          e.preventDefault();
          handleChange(e.target.value);
        }}/>
        <button>Search</button>
      
      <div style={{height: "900px",width: "500px", display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
        {filteredCountries.map( (country, index) => <CountryInfo key={country.cca3} data={country} divider={largeCountriesThree[0].area} detailed={index<5}/>)}
      </div>
    </>
  )
}

function getCountryByCca3(cca3) {
  const result = countries.find(country => country.cca3 == cca3);
  return result;
}

function CountryDetails() {
  let { cca3 } = useParams();
  const country = getCountryByCca3(cca3); 
  const list = country.borders;
  const countryList = list.map((cca3) => getCountryByCca3(cca3));
  const rus = "RUS";
  const largeCountries = countryList.toSorted((a, b) => b.area - a.area);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <h2>Bordering countries</h2>
      {largeCountries.map((country, index) => <CountryInfo key={country.cca3} data={country} divider={getCountryByCca3(rus).area} detailed={index<5}/>)}
      <Link to={"/"}><h2>Home</h2></Link>
    </div>
  )
}