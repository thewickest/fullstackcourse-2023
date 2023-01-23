import axios from 'axios'

const url = 'https://restcountries.com/v3.1'
const imgUrl = 'https://flagcdn.com/w320/'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getAll = () => {
    const request =  axios.get(`${url}/all`)
    return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
    const request = axios.get(weatherUrl, {
        params: {lat, lon, appid: process.env.REACT_APP_API_KEY}})
    return request.then(response => response.data)
}

const getFlag = ({tld}) => {
    const request = axios.get(`${imgUrl}/${tld}.png`)
    request.then(response => response.data)
}

const print = () => {console.log('print');}

export default { getAll, getFlag, getWeather, print }