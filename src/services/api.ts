import axios from 'axios'

const api = axios.create({
    baseURL: 'https://happy-backend-deploy-edu.herokuapp.com',
})

export default api;