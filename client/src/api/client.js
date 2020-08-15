import axios from "axios"

export default axios.create({
    baseURL: "http://localhost:3005",
    timeout: 600000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('adnat_session_id')
    },
    withCredentials: true,
})




