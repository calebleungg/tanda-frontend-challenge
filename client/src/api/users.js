import client from "./client"

const getUser = () => client.get('/users/me')

const getOrganisationsUsers = () => client.get('/users')

const updateUser = (req) => client.put('/users/me', req)

const changePassword = (req) => client.put('/users/me/change_password', req)

export default {
    getUser,
    getOrganisationsUsers,
    updateUser,
    changePassword
}