import axios from 'axios'

const url = `http://localhost:3001/api/persons`
const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = (person) => {
    const request = axios.post(url,person)
    return request.then(response => response.data)
}

const update = (person) => {
    const request = axios.put(`${url}/${person.id}`,person)
    return request.then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${url}/${id}`)
    .then(response => response)
}

export default {getAll, create, update, remove}