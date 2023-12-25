const API_KEY = '0b8e358f5f95b03bf1e0893b83eb2df1'
let iconWeather = ''

const fetchData = position => {
    const {latitude, longitude} = position.coords
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => setWeatherData(data))
}

const setWeatherData = data => {
    console.log(data)

    const weatherData = {
        location: data.name + ", " + data.sys.country,
        description: data.weather[0].main + ", " + data.weather[0].description,
        humidity: data.main.humidity,
        windspeed: (data.wind.speed * 3.6).toFixed(1),
        temperature: data.main.temp,
        date: getDate()
    }

    iconWeather = data.weather[0].icon

    console.log(iconWeather)

    insertData(weatherData)

    cleanUp()
}

const insertData = (weatherData) => {
    let text = ''
    let grade = ''

    Object.keys(weatherData).forEach(key => {

        if (key == 'humidity') {
            text = 'Humidity: '
        } else if (key == 'windspeed') {
            text = 'Wind speed: '
        } else if (key == 'temperature') {
            grade = '°C'
        }

        document.getElementById(key).textContent = text + weatherData[key] + grade

        text = ''
        grade = ''
    })
    
    document.getElementById('mi-image').src = `https://openweathermap.org/img/wn/${iconWeather}@4x.png`
}

const cleanUp = () => {
    let container = document.getElementById('container')
    let loader = document.getElementById('loader')
    let figuraFondo = document.getElementById('figura-fondo')

    loader.style.display = 'none'
    container.style.display = 'flex'
    figuraFondo.style.display = 'initial'
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}