const API_KEY = 'f670e82759514a045db5cf6c6cf479fe';

const fetchData = position => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
}

const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity + '%',
        pressure: data.main.pressure + '%',
        temperature: data.main.temp + ' c°',
        date: getDate(),

    }
    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).innerHTML = weatherData[key];
    })
    if (weatherData.description == 'Clouds'){
        document.foto.src = 'nublado.png'
    } else if (weatherData.description == 'Clear'){
        document.foto.src = 'sun.png'
    }else if (weatherData.description == 'Rain'){
        document.foto.src ='rain.png'
    }else {
        document.foto.src ='normal.png'

    }
        
}

const getDate = () => {
    let date = new Date();
    return `${ ('0' + date.getDate()).slice(-2) }-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}

