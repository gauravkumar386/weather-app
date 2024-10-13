import { useEffect, useState } from "react";
import { useFetchWeatherData } from "../shared/api/useFetchQuery";
import { API_KEY, WEEKLY_DATA_API } from "../shared/Constants";
import DailyForecastCard from "../molecules/DailyForecastCard";
import Spinner from "../atoms/Spinner";
import '../styles/weeklyData.scss';

interface Coordinates {
    lat: number,
    lon: number
}

interface WeatherData {
    coord?: Coordinates
}

interface ForecastItem {
    dt: number,
    main: {
        humidity: number,
        pressure: number,
        temp: number,
        temp_max: number,
        temp_min: number
    },
    visibility: number,
    wind: {
        speed: number
    }
}

interface ForecastResponse {
    list: ForecastItem[];
}

interface Props {
    weatherData: any,
    dayType: string,
    temperatureUnit: string
}

const WeeklyData: React.FC<Props> = ({ weatherData, dayType, temperatureUnit }) => {
    const [apiUrl, setApiUrl] = useState<string>("")
    const [weeklyData, setWeeklyData] = useState<any[]>([])
    const { data = [], isLoading, isError, refetch } = useFetchWeatherData('weeklyWeather', apiUrl);

    useEffect(() => {
        if (weatherData.coord && dayType === "week") {
            const url = `${WEEKLY_DATA_API}?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric`;
            setApiUrl(url)
            refetch()
        }
    }, [weatherData, dayType, refetch])

    useEffect(() => {
        if (data) {
            const filteredData = data.list?.filter((d: any, index: number) => d.dt_txt?.split(" ")[1] === "12:00:00");
            setWeeklyData(filteredData);
        }
    }, [data])

    return (
        <>
            {isLoading && <Spinner />}
            <div className="weekly-data" style={{justifyContent: dayType==="week" ? "center" : "flex-start"}}>
                {dayType === "week" ?
                    weeklyData?.map((data: any, index: number) => {
                        return (
                            <DailyForecastCard
                                title=""
                                weatherData={data}
                                temperatureUnit={temperatureUnit}
                                index={index}
                            />
                        )
                    })
                    :
                    <DailyForecastCard
                        title=""
                        weatherData={weatherData}
                        temperatureUnit={temperatureUnit}
                    />
                }
            </div>
        </>
    )
}

export default WeeklyData