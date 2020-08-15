import client from "./client"

const getOrganisations = () => client.get('/organisations')
const createOrganisation = (req) => client.post('/organisations/create_join', req)
const leaveOrganisation = () => client.post('/organisations/leave')
const joinOrganisation = (req) => client.post('/organisations/join', req)
const updateOrganisation = (id, req) => client.put(`/organisations/${id}`, req)

export default {
    getOrganisations,
    createOrganisation,
    leaveOrganisation,
    joinOrganisation,
    updateOrganisation
}