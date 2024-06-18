import { useEffect, useState } from "react";
import Search from "../Search/Search";
import '../Weather/weatherStyle.css';

const Weather = () => {

    const [search, setSearch] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setloading] = useState(false);

    async function fetchWeatherData(param) {
        setloading(true);
        try {

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=9b65c1dd321d8118e6992073ba0d4ac4`);

            const data = await response.json();

            if (data) {
                setWeatherData(data);
                setloading(false);
            }

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchWeatherData("Dehradun");
    }, [])

    function handleSearch() {
        fetchWeatherData(search);
    }

    function getCurrentDate(){
        return new Date().toLocaleDateString('en-us',{
            weekday:'long',
            month:'long',
            day:'numeric',
            year:'numeric'
        })
    }

    return (
        <div className="weather">
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {
                loading ? <div className="loading">Loading ... </div> :
                    <div>
                        <div className="city-name">
                            <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>
                        </div>
                        <div className="date">
                            <span>{getCurrentDate()}</span>
                        </div>
                        <div className="temp">{weatherData?.main?.temp}</div>
                        <p className="description">
                            {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ""}
                            <div className="weather-info">
                                <div className="coloumn">
                                    <div>
                                        <p className="wind">{weatherData?.wind?.speed}</p>
                                        <p>wind speed</p>
                                    </div>
                                </div>
                                <div className="coloumn">
                                    <div>
                                        <p className="humidity">{weatherData?.main?.humidity}%</p>
                                        <p>Humidity</p>
                                    </div>
                                </div>
                            </div>
                        </p>
                    </div>
            }
        </div>
    );
}

export default Weather;