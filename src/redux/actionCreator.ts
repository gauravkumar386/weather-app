import * as actionTypes from "./actionTypes"


export function addWeatherDetails(locationData: LocationData) {
    const action = {
        type: actionTypes.ADD_LOCATION_DATA,
        locationData
    }
    return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: LocationAction) {
    return (dispatch: DispatchType) => {
        dispatch(action)
    }
}

export const addDayTypeDetails = (dayType: string) => ({
    type: actionTypes.ADD_DAY_TYPE_DATA,
    dayType
})

export const addTemperatureType = (temperatureUnit: string) => ({
    type: actionTypes.ADD_TEMPERATURE_DATA,
    temperatureUnit
})