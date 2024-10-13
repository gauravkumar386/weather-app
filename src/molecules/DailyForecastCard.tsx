import React from "react";
import Cards from "../atoms/Card";
import { celciusToFahrenheit, getDateFormat } from "../shared/util/utils";
import { Image } from "primereact/image";
import '../styles/dailyForecastCard.scss';

type Props = {
    title: string,
    className?: string,
    weatherData: any,
    temperatureUnit: string,
    index?: number
}

const DailyForecastCard: React.FC<Props> = ({ title, className, weatherData, temperatureUnit, index = 0 }) => {
    const weatherDetails = weatherData?.weather && weatherData.weather[0];
    return (
        <Cards title={title} className="forecast-card" key={index}>
            <div className="date-format">{getDateFormat(weatherData?.dt)}</div>
            <div className="weather-image"><Image src={`https://openweathermap.org/img/wn/${weatherDetails?.icon}@2x.png`} height="70" width="70" loading="lazy" alt="Image" /></div>
            <div className="highest-lowest-temp">
                <span>{temperatureUnit === "celcius" ? Math.ceil(weatherData.main?.temp_max) : celciusToFahrenheit(Math.ceil(weatherData.main?.temp_max))}&#176;</span>
                <span>{temperatureUnit === "celcius" ? Math.floor(weatherData.main?.temp_min) : celciusToFahrenheit(Math.floor(weatherData.main?.temp_min))}&#176;</span>
            </div>
        </Cards>
    )
}

export default DailyForecastCard;
