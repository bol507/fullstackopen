import React, { useEffect, useState } from "react";
//import api
import { fetchCountries } from '../api/countriesApi';
import { fetchWeather } from '../api/weatherApi'
//local imports
import Language from "./Language";

const useFetchCountries = (search) => {
    const [countries, setCountries] = useState();
    const initFetchCountries = () => {
      fetchCountries(search)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    return {
      countries,
      initFetchCountries,
    };
};

const useFetchWeather =(query) => {
    const [weather, setWeather] = useState();
    const initFetchWeather = () => {
        fetchWeather(query)
            .then((response)=>{
                setWeather(response.data.current);
            })
            .catch((error) => {
                console.error(error);
            })
    };
    return {
        weather,
        initFetchWeather,
    }
}


function Countries() {
    const [search, setSearch] = useState('')
    const [capital, setCapital] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(null)

    const {countries, initFetchCountries } = useFetchCountries(search)
    const {weather, initFetchWeather} = useFetchWeather(capital)

    useEffect(() => {
        if(search.length > 1){
            initFetchCountries()
        }
    }, [search])
    //init capital
    useEffect(() => {
        if(countries?.length === 1){
            const country = countries[0]
            setCapital(country.capital)
        }
        
    },[countries])
    //search weather
    useEffect(()=>{
        if(capital){
            initFetchWeather()
        }
    },[capital])

    //onchange input
    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }
    
    const handleShowClick = (country) => {    
       setSelectedCountry(country); 
       setCapital(country.capital)
      }

    const handlebackClick = () => {
        setSelectedCountry(null)
    }
    const template = () =>{
        if(selectedCountry){
            return (
                <div>
                    <h2> {selectedCountry.name.common}</h2>
                    <p>Capital: {selectedCountry.capital}</p>
                    <p>Population: {selectedCountry.population}</p>
                    <Language language={Object.values(selectedCountry.languages)}/>
                    <img src={selectedCountry.flags.svg} alt="Flag" width="200" />
                    <br/>
                    {weather && (
                        <div>
                            <h2>Weather in {capital}</h2>
                            <p>Temperature {weather.temperature} </p>
                            <img src={weather.weather_icons[0]} alt="Weather icon" />
                            <p>wind: {weather.wind_speed} mph direction:{weather.wind_dir}</p>
                        </div> 
                    )}
                    <button onClick={handlebackClick}>Back</button>
                </div>
            )
        }else if (countries?.length === 1) {
            const country = countries[0];
      
            return (
              <div>
                <h2> {country.name.common}</h2>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <Language language={Object.values(country.languages)} />
                <img src={country.flags.svg} alt="Flag" width="200" />
                <br />
                {weather && (
                  
                    <div>
                            <h2>Weather in {capital}</h2>
                            <p>Temperature {weather.temperature} </p>
                            <img src={weather.weather_icons[0]} alt="Weather icon" />
                            <p>wind: {weather.wind_speed} mph direction:{weather.wind_dir}</p>
                    </div>
                )}
              </div>
            )
        }else if(countries?.length <= 10){
            return countries.map((country,index) => (
                    <div key={index}>
                        <label>{country.name.common} </label>
                        <button onClick={()=> handleShowClick(country)}>show</button>
                    </div>
                    
                    )) 
        }else {
            return <h3>too many matches, specify another filter</h3>
        }

    }
    return(
        <div>
            <label>find countries </label>
            <input type="text" value={search} onChange={handleSearchChange}></input>
            {template()}
      
    </div>
    );

}

export default Countries;