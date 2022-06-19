export const useWeatherData = () => {
    return useState('weatherData', () => [])
}

export const pushWeatherData = (weather_data) => {
    useWeatherData().value.push(weather_data)
}

export const delWeatherData = (index: number) => {
    useWeatherData().value.splice(index, 1)
}