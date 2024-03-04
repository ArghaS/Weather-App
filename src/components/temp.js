import React, { useEffect, useState } from "react";
import "./style.css";
import WeatherCard from "./weathercard";

export default function Temp() {

    const [searchValue, setSearchValue] = useState("kolkata")
    const [tempInfo, setTempInfo] = useState({})

    const getWeatherInfo = async() => {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=e5c7ce66f69dd9651f41613d364d3ded`

            const res = await fetch(url)
            const data = await res.json()

            const { temp, humidity, pressure } = data.main
            const { main: weatherMood } = data.weather[0]
            const { name } = data
            const { speed } = data.wind
            const { country, sunset } = data.sys

            const newWeatherInfo = {
                temp,
                humidity,
                pressure,
                weatherMood,
                name,
                speed,
                country,
                sunset
            }

            setTempInfo(newWeatherInfo)

        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getWeatherInfo()
    }, [])

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={ searchValue }
            onChange={(e)=>setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            search
          </button>
        </div>
      </div>

      <WeatherCard tempInfo = { tempInfo }/>
    </>
  );
}
