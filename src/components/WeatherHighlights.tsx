import React, { useEffect, useState } from "react";
import { useFetchQuery } from "../shared/api/useFetchQuery";
import { AIR_DATA_API, API_KEY } from "../shared/Constants";
import UVCard from "../molecules/UVCard";
import WindStatus from "../molecules/WindStatus";
import SunriseSunset from "../molecules/SunriseSunset";
import Humidity from "../molecules/Humidity";
import Visibility from "../molecules/Visibility";
import AirQuality from "../molecules/AirQuality";
import '../styles/weatherHighlights.scss'
import Spinner from "../atoms/Spinner";

interface Props {
    weatherData: any,
    dayType: string,
    temperatureUnit: string
}

const WeatherHighlights: React.FC<Props> = ({ weatherData, dayType, temperatureUnit }) => {
    const [cityData, setCityData] = useState<any[]>([])
    const [apiUrl, setApiUrl] = useState<string>("")
    const { data = [], isLoading, isError, refetch } = useFetchQuery('airQuality', apiUrl);

    useEffect(() => {
        if (!isLoading && data?.length > 0) {
            setCityData(data)
        }
    }, [data, isLoading])

    useEffect(() => {
        const lat = weatherData?.coord?.lat, lon = weatherData?.coord?.lon;
        console.log("apiiiiiiii-1",lat,lon)
        if (lat && lon) {
            console.log("apiiiiiiii")
            setApiUrl(`${AIR_DATA_API}?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
            refetch()
        }
    }, [weatherData, refetch])

    return (
        (isLoading ? <Spinner /> :
            <>
                <p>Today's Highlights</p>
                <div className="weather-highlights">
                    <UVCard airQualityData={data} />
                    <WindStatus weatherData={weatherData} />
                    <SunriseSunset weatherData={weatherData} />
                    <Humidity weatherData={weatherData} />
                    <Visibility weatherData={weatherData} />
                    <AirQuality airQualityData={data} />
                </div>
            </>
        )
    )
}

export default WeatherHighlights;
