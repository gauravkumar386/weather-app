interface LocationData {
    name: string,
    lat: number | null,
    lon: number | null,
    country: string,
    state: string
}

interface LocationAction {
    type: string,
    locationData: LocationData,
}

type InitialState = {
    locationData: LocationData,
    dayType: string,
    temperatureUnit: string
}

type ReduxAction = {
    type: string,
    locationData: LocationData,
    dayType: string,
    temperatureUnit: string
}

type DispatchType = (args: LocationAction) => LocationAction