import React, { useCallback, useEffect, useState } from "react";
import '../styles/header.scss'
import AutoCompleteInput from "../atoms/AutoComplete";
import { AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { useFetchQuery } from "../shared/api/useFetchQuery";
import Spinner from "../atoms/Spinner";
import { useDispatch } from "react-redux";
import { addDayTypeDetails, addTemperatureType, addWeatherDetails } from "../redux/actionCreator";
import { API_KEY, CITY_DATA_API } from "../shared/Constants";
import TabViewComponent from "../atoms/TabView";
import { Dispatch } from "redux";
import Profile from "./Profile";

type GeoData = {
    name: string,
    state: string,
    country: string,
    lon: number,
    lat: number,
    list?: Array<any>
}

type Tab = {
    header: string | React.ReactNode,
    description: string,
    type: string,
    value: string
}

export const dayTypeData: Tab[] = [
    {
        header: "Today",
        description: "",
        value: "today",
        type: "day"
    },
    {
        header: "Week",
        description: "",
        value: "week",
        type: "day"
    }
]

export const temperatureUnitData: Tab[] = [
    {
        header: <>&#8451;</>,
        description: "",
        value: "celcius",
        type: "tempUnit"
    },
    {
        header: <>&#176;F</>,
        description: "",
        value: "fahrenheit",
        type: "tempUnit"
    }
]

const Header: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const [searchValue, setSearchValue] = useState<string>("")
    const [locationData, setLocationData] = useState<string[]>([])
    const [selectedValue, setSelectedValue] = useState<string>("")
    const [cityData, setCityData] = useState<GeoData[]>([])
    const [enableApiCall, setEnableApiCall] = useState<boolean>(false)
    const [apiUrl, setApiUrl] = useState<string>("")
    const { data = [], isLoading, isError, refetch } = useFetchQuery(`location${searchValue}`, apiUrl);
    
    useEffect(() => {
        if (!isLoading && data?.length > 0) {
            setCityData(data as GeoData[])
        }
    }, [data, isLoading])

    const search = useCallback((event: AutoCompleteCompleteEvent) => {
        setEnableApiCall(true)
        setSearchValue(event.query)
        setApiUrl(`${CITY_DATA_API}?q=${event.query}&limit=100&appid=${API_KEY}`)
        refetch();
    }, [refetch])

    useEffect(() => {
        let _filteredData: GeoData[] | string[] = [];
        if (!searchValue.trim().length) {
            _filteredData = [...cityData]
        } else {
            _filteredData = cityData?.filter((data: GeoData) => {
                return data?.name
                    .toLowerCase()
                    .startsWith(searchValue.toLowerCase())
            })
        }
        _filteredData = _filteredData?.map((d: GeoData) => {
            const name = d.name + ', ' + d.state + ', ' + d.country
            return name
        })
        setLocationData(_filteredData)
    }, [cityData])

    const saveLocationData = useCallback((locationData: GeoData | undefined) => {
        if (locationData) {
            dispatch(addWeatherDetails(locationData))
        }
    }, [dispatch])

    useEffect(() => {
        const _selectedValue = selectedValue?.split(',')
        const locationDetails = _selectedValue && cityData?.find((x: any) => {
            return x.name == _selectedValue[0]
                && x.state == _selectedValue[1]?.replace(/\s/g, '')
                && x.country == _selectedValue[2]?.replace(/\s/g, '')
        })
        saveLocationData(locationDetails!)
    }, [selectedValue, cityData, saveLocationData])

    const handleTabData = useCallback((selectedTab: Tab) => {
        if (selectedTab?.header) {
            if (selectedTab.type === "tempUnit") {
                dispatch(addTemperatureType(selectedTab.value))
            } else {
                dispatch(addDayTypeDetails(selectedTab.value))
            }
        }
    }, [dispatch])

    function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
        let timeout: NodeJS.Timeout | number | undefined;

        return function (this: any, ...args: Parameters<T>) {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    const debounceSearch = debounce(search, 300)

    return (
        <div className="header-component">
            {isLoading && <Spinner />}
            <div className="left-card">
                <AutoCompleteInput
                    value={selectedValue}
                    suggestions={locationData}
                    placeholder="Search for places..."
                    searchMethod={debounceSearch}
                    setOnChange={setSelectedValue}
                    setLocationData={setLocationData}
                />
            </div>
            <div className="right-card">
                <span><TabViewComponent tabData={dayTypeData} handleTabData={handleTabData} /></span>
                <span><TabViewComponent tabData={temperatureUnitData} handleTabData={handleTabData} /><Profile /></span>
            </div>

        </div>
    )
}

export default Header;
