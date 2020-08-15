import client from "./client"

const getShifts = () => client.get('/shifts')
const createShift = (req) => client.post('/shifts', req)
const deleteShift = (id) => client.delete(`/shifts/${id}`)
const updateShift = (id, req) => client.put(`/shifts/${id}`, req)


export default {
    createShift,
    getShifts,
    deleteShift,
    updateShift
}