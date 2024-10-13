import { useQuery } from "@tanstack/react-query";

type GeoData = {
    name: string,
    state: string,
    country: string,
    lon: number,
    lat: number
}

type ForecastItem = {
    list: {
        dt: number,
        main: {
            humidity: number,
            pressure: number,
            temp: number,
            temp_max: number,
            temp_min: number
        },
        visibility: number,
        weather: {
            description: string,
            icon: string
        }[],
        wind: {
            speed: number
        }
    }[]
}

const fetchData = async (apiUrl: string): Promise<GeoData[]> => {
    const response = await fetch(apiUrl, {
        method: "GET"
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: GeoData[] = await response.json();
    return data;
};

const fetchWeatherData = async (apiUrl: string): Promise<any> => {
    const response = await fetch(apiUrl, {
        method: "GET"
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: any = await response.json();
    return data;
};

export const useFetchQuery = (apiKey: string, apiUrl: string) => {
    const { data, isLoading, isError, refetch } = useQuery<GeoData[], Error>({
        queryKey: [apiKey],
        queryFn: async () => {
            return await fetchData(apiUrl);
        },
        staleTime: 6000,
        refetchOnWindowFocus: false,
        retry: 1,
        enabled: true,
    });
    return { data, isLoading, isError, refetch };
}

export const useFetchWeatherData = (apiKey: string, apiUrl: string) => {
    const { data, isLoading, isError, refetch } = useQuery<any, Error>({
        queryKey: [apiKey],
        queryFn: async () => {
            return await fetchWeatherData(apiUrl);
        },
        staleTime: 6000,
        refetchOnWindowFocus: false,
        retry: 1,
        enabled: true,
    });
    return { data, isLoading, isError, refetch };
}