const API_KEY = '0b8e358f5f95b03bf1e0893b83eb2df1'

const fetchData = position => {
    const {latitude, longitude} = position.coords
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
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

    let text = ''
    let grade = ''

    Object.keys(weatherData).forEach(key => {

        if (key == 'humidity') {
            text = 'Humedad: '
        } else if (key == 'pressure') {
            text = 'Presión: '
        } else if (key == 'temperature') {
            grade = '°'
        }

        document.getElementById(key).textContent = text + weatherData[key] + grade

        text = ''
        grade = ''

        console.log(key)
    })

    insertData()

    cleanUp()
}

const insertData = () => {

    

    /*document.getElementById('temperature').textContent = weatherData[temperature]
    <p id="temperature" class="temperature"></p>
            

    <div id="location" class="location"></div>
            <div id="date" class="date"></div>
            <div id="description" class="description"></div>
            <div id="humidity" class="humidity"></div>
            <div id="pressure" class="pressure"></div>*/
}

const cleanUp = () => {
    let container = document.getElementById('container')
    let loader = document.getElementById('loader')

    loader.style.display = 'none'
    container.style.display = 'flex'
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}