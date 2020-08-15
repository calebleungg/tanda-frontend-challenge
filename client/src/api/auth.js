import client from "./client"

const login = (credentials) => client.post('/auth/login', credentials)
const signup = (credentials) => client.post('/auth/signup', credentials)
const logout = () => client.delete('/auth/logout')

export default {
    login,
    signup,
    logout
}