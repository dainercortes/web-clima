const API_KEY = '0b8e358f5f95b03bf1e0893b83eb2df1'

const fetchData = position => {
    const {latitude, longitude} = position.coords
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => setWeatherData(data))
    console.log(data)
}

const setWeatherData = data => {
    console.log(data)
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate()
    }

    insertData(weatherData)

    cleanUp()
}

const insertData = (weatherData) => {
    let text = ''
    let grade = ''

    Object.keys(weatherData).forEach(key => {

        if (key == 'humidity') {
            text = 'Humidity: '
        } else if (key == 'pressure') {
            text = 'Pressure: '
        } else if (key == 'temperature') {
            grade = '°'
        }

        document.getElementById(key).textContent = text + weatherData[key] + grade

        text = ''
        grade = ''
    })

    if (weatherData.description == 'Clouds') {
        document.getElementById('mi-image').src = '../img/noche.png'
    } else if ((weatherData.description == 'Rain')) {
        document.getElementById('mi-image').src = '../img/lluvioso.png'
    } else if ((weatherData.description == 'Snow')) {

    }
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