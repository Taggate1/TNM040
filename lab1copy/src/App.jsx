import CountryInfo from './CountryInfo';
import countries from 'world-countries'
import './App.css'

function App() {
  const largeCountries = countries.toSorted((a, b) => b.area - a.area);
  const largeCountriesTwo = largeCountries.filter((country) => country.name.common != "Antarctica")
  const largeCountriesThree = largeCountriesTwo.slice(0, 14);
  return (
    <>
      <div style={{height: "900px",width: "500px", display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
        {largeCountriesThree.map( (country, index) => <CountryInfo key={country.cca3} data={country} divider={largeCountriesThree[0].area} detailed={index<5}/>)}
      </div>
    </>
  )
}

export default App