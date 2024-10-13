export const getDayTime = () => {
    const now = new Date();

    // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
    const day = now.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[day];

    // Get the time in 24-hour format
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;

    return (`${dayName}, ${time}`);
}

export const celciusToFahrenheit = (celcius: number) => {
    return Math.round((celcius * 9 / 5) + 32);
}

export const getDateFormat = (timestampData: number) => {
    const timestamp: number = timestampData; // Unix timestamp in seconds
    const date: Date = new Date(timestamp * 1000); // Convert seconds to milliseconds

    // Extract month, day, and year
    const month: number = date.getMonth() + 1; // Months are zero-based
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    // Format as MM/DD/YYYY
    const formattedDate: string = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
    return formattedDate
}

export const getTimeFormat = (timeStampData: number) => {
    // Example Unix timestamp (seconds)
    const unixTimestamp = timeStampData;

    // Convert Unix timestamp to milliseconds
    const date = new Date(unixTimestamp * 1000);

    // Format date to a human-readable string
    const formattedDate = date.toLocaleString();
    return formattedDate
}

const visibilityRanges = [
    { range: [0, 1], description: 'Very Poor', icon: 'pi-thumbs-down' },
    { range: [1, 2], description: 'Poor', icon: 'pi-thumbs-down' },
    { range: [2, 5], description: 'Moderate', icon: 'pi-thumbs-up' },
    { range: [5, 10], description: 'Good', icon: 'pi-thumbs-up' },
    { range: [10, Infinity], description: 'Excellent', icon: 'pi-thumbs-up' }
];

export const getVisibilityDescription = (visibility: number) => {
    for (let range of visibilityRanges) {
        if (visibility > range.range[0] && visibility <= range.range[1]) {
            return range;
        }
    }
    return;
}

const airQualityRanges = [
    { range: [0, 12], description: 'Good', icon: 'pi-thumbs-up' },
    { range: [12, 35], description: 'Moderate', icon: 'pi-thumbs-up' },
    { range: [35, 55], description: 'Unhealthy for sensitive group', icon: 'pi-thumbs-down' },
    { range: [55, 150], description: 'Unhealthy', icon: 'pi-thumbs-down' },
    { range: [150, 250], description: 'Very Unhealthy', icon: 'pi-thumbs-down' },
    { range: [250, Infinity], description: 'Hazardous', icon: 'pi-thumbs-down' }
];

export const getAirQualityDescription = (airQuality: number) => {
    for (let range of airQualityRanges) {
        if (airQuality > range.range[0] && airQuality <= range.range[1]) {
            return range;
        }
    }
    return;
}