import React from "react";
import { Image } from 'primereact/image';
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import humidity from "../assets/images/humidity.png";
import cloudy from "../assets/images/cloudy.png";
import city from "../assets/images/city.jpg"
import '../styles/currentForecast.scss'
import { celciusToFahrenheit, getDayTime } from "../shared/util/utils";

interface Props {
    weatherData: any,
    temperatureUnit: string
}

const CurrentForecast: React.FC<Props> = ({ weatherData, temperatureUnit }) => {
    const weatherdetails = weatherData?.weather && weatherData.weather?.length > 0 && weatherData.weather[0];
    const locationDetails: LocationData = useSelector(
        (state: InitialState) => state.locationData,
        shallowEqual
    )
    return (
        <div className="card flex justify-content-center">
            <div className="top-section">
                <div className="weather-image"><Image src={`https://openweathermap.org/img/wn/${weatherdetails?.icon}@2x.png`} height="210" width="210" loading="lazy" alt="Image" /></div>
                {weatherData?.main?.temp && <div className="temperature-data">
                    <span className="current-temp">{temperatureUnit === "celcius" ? Math.round(weatherData.main.temp) : celciusToFahrenheit(Math.round(weatherData.main.temp))}</span>
                    {temperatureUnit === "celcius" ? <span className="temp-metrics">&#8451;</span> : <span className="temp-metrics">&#176;F</span>}
                </div>}
                {weatherData?.main && <div className="highest-lowest-temp">
                    <span>H: {temperatureUnit === "celcius" ? Math.ceil(weatherData.main?.temp_max) : celciusToFahrenheit(Math.ceil(weatherData.main?.temp_max))}</span>
                    <span>L: {temperatureUnit === "celcius" ? Math.floor(weatherData.main?.temp_min) : celciusToFahrenheit(Math.floor(weatherData.main?.temp_min))}</span>
                </div>}
                <div className="current-time">
                    {getDayTime()}
                </div>
            </div>
            <div className="below-section">
                <div className="weather-description">
                    <span>
                        <Image src={cloudy} height="50" width="50" loading="lazy" alt="Image" />
                    </span>
                    <span>{weatherdetails?.description}</span>
                </div>
                <div className="weather-description humidity-details">
                    <span>
                        <Image src={humidity} height="50" width="50" loading="lazy" alt="Image" />
                    </span>
                    <span>Humidity - {weatherData?.main?.humidity}</span>
                </div>
                <div className="location-details">
                    <Image src={city} height="150" loading="lazy" alt="Image" />
                    <span className="location-name">{`${weatherData?.name}, ${weatherData?.sys?.country}`}</span>
                </div>
            </div>
        </div>
    )
}

export default CurrentForecast;
