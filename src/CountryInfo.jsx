import "./App.css";
import { Link, useParams } from "react-router-dom";

export default function CountryInfo({data, divider, detailed}) {
    const country = data;
    let ratio = (country.area/divider)*100 + "%";
    return (
        <Link to={"/country/" + country.cca3}>
        <div style={{marginRight: "20px", marginLeft: "20px", }}> 
            <span className="countryInfo"> {country.flag}{country.name.common} </span> 
            <span> {Math.round((country.area/1000000), 1)} million km<sup>2</sup></span>
            {detailed && ( 
                <p><span className="countryInfo">Capital: </span>{country.capital} 
                <span className="countryInfo"> Region: </span> {country.region}
                </p>
            )}
            <div className="areaBar" style={{width: ratio}}></div>

        </div>
        </Link>
    )
}