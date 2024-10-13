import { useQuery } from '@tanstack/react-query';

const fetchQueryData = (longitude: number, latitude: number) => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: () => {
            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ceef2665a1fac8c75364db2c7bb8aaf2`)
                .then(response => response.json());
        },
        enabled: false
    })
}

export default fetchQueryData;