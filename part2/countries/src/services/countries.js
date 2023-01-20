import axios from 'axios'

const url = 'https://restcountries.com/v3.1'
const imgUrl = 'https://flagcdn.com/w320/'
const getAll = () => {
    const request =  axios.get(`${url}/all`)
    return request.then(response => response.data)
}

const getFlag = ({tld}) => {
    const request = axios.get(`${imgUrl}/${tld}.png`)
    request.then(response => response.data)
}

export default { getAll, getFlag }