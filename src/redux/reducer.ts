import * as actionTypes from "../redux/actionTypes"
export type IRootState = ReturnType<typeof reducer>

const initialState: InitialState = {
    locationData: {
        name: "",
        lat: null,
        lon: null,
        country: "",
        state: ""
    },
    dayType: "Today",
    temperatureUnit: "celcius"
};
const reducer = (
    state: InitialState = initialState,
    action: ReduxAction
): InitialState => {
    switch (action.type) {
        case actionTypes.ADD_LOCATION_DATA:
            return {
                ...state, locationData: {
                    ...state.locationData,
                    name: action.locationData?.name,
                    lat: action.locationData?.lat,
                    lon: action.locationData?.lon,
                    country: action.locationData?.country,
                    state: action.locationData?.state
                }
            }

        case actionTypes.ADD_DAY_TYPE_DATA:
            return {
                ...state,
                dayType: action.dayType
            }

        case actionTypes.ADD_TEMPERATURE_DATA:
            return {
                ...state,
                temperatureUnit: action.temperatureUnit
            }
    }
    return state
}

export default reducer