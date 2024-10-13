import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CurrentForecast from "./CurrentForecast";
import WeatherHighlights from "./WeatherHighlights";
import '../styles/dashboard.scss'
import { IRootState } from "..";
import { useCurrentLocation } from "../shared/hooks/useCurrentLocation";
import { useFetchQuery } from "../shared/api/useFetchQuery";
import { API_KEY, WEATHER_DATA_API } from "../shared/Constants";
import { getDayTime } from "../shared/util/utils";
import WeeklyData from "./WeeklyData";

const Dashboard: React.FC = () => {
    const locationData = useSelector((state: IRootState) => state.locationData);
    const dayTypeData = useSelector((state: IRootState) => state.dayType);
    const temperatureUnit = useSelector((state: IRootState) => state.temperatureUnit);
    const { getLocation, position, error } = useCurrentLocation();
    const [apiUrl, setApiUrl] = useState<string>("")
    const [queryKey, setQueryKey] = useState<string>("")
    const { data = [], isLoading, isError, refetch } = useFetchQuery(queryKey, apiUrl);

    useEffect(() => {
        getLocation();
        getDayTime();
    }, [])

    useEffect(() => {
        if (locationData?.lat != undefined || locationData?.lat != null) {
            setQueryKey('search_location_weather' + locationData.lat + locationData.lon)
            setApiUrl(`${WEATHER_DATA_API}?lat=${locationData?.lat}&lon=${locationData?.lon}&units=metric&appid=${API_KEY}`)
            refetch()
        } else if (position?.latitude != undefined || position?.latitude != null) {
            setQueryKey('current_location_weather' + position.latitude + position.longitude)
            setApiUrl(`${WEATHER_DATA_API}?lat=${position?.latitude}&lon=${position?.longitude}&units=metric&appid=${API_KEY}`)
            refetch()
        }
    }, [position, locationData, refetch])

    return (
        <div className="dashboard-element">
            <div className="left-card">
                <CurrentForecast weatherData={data} temperatureUnit={temperatureUnit} />
            </div>
            <div className="right-card">
                {dayTypeData === "week" && <WeeklyData weatherData={data} dayType={dayTypeData} temperatureUnit={temperatureUnit} />}
                <WeatherHighlights weatherData={data} dayType={dayTypeData} temperatureUnit={temperatureUnit} />
            </div>
        </div>
    )
}

export default Dashboard;
