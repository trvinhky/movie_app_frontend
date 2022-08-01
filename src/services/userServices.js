import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'

const createNewUser = (data) => {
    return axios.post('/api/v1/create-new-user', data)
}

const handleUpdateUser = (data) => {
    return axios.post('/api/v1/update-user', data)
}

const handleLogin = (data) => {
    return axios.post('/api/v1/login', data)
}

const createNewFavourite = (data) => {
    return axios.post('/api/v1/create-new-favourite', data)
}

const getFavouriteUser = (id) => {
    return axios.get(`/api/v1/get-favourite-user?id=${id}`)
}

const handleDeleteFavourite = (data) => {
    return axios.delete('/api/v1/delete-favourite-user', { data })
}

const createNewHistory = (data) => {
    return axios.post('/api/v1/create-new-history', data)
}

const getHistoryUser = (id) => {
    return axios.get(`/api/v1/get-history-user?id=${id}`)
}

const handleDeleteHistory = (data) => {
    return axios.delete('/api/v1/delete-history-user', { data })
}

export {
    createNewUser,
    handleLogin,
    createNewFavourite,
    getFavouriteUser,
    handleDeleteFavourite,
    createNewHistory,
    getHistoryUser,
    handleDeleteHistory,
    handleUpdateUser
}