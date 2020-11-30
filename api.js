import axios from 'axios'


const api = axios.create({
    baseURL: 'https://vast-wave-96041.herokuapp.com/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

export default api;