import React, { useState } from 'react';

type Position = {
    latitude: any,
    longitude: any
}

export const useCurrentLocation = () => {
    const [position, setPosition] = useState<Position>({
        latitude: null,
        longitude: null
    });
    const [error, setError] = useState<any>(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setPosition(prevPosition => ({ ...prevPosition, latitude, longitude }));
                    setError(null);
                },
                (error) => {
                    setError(error.message);
                    setPosition({ ...position, latitude: null, longitude: null });
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    return { getLocation, position, error }
};
