import { useState, useEffect } from "react"

const useApi = (apiRequest) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const request = async function () {
        try {
            const response = await apiRequest()
            console.log('API CALL', response)
            setLoading(false)
            setData(response.data)
        } catch (err) {
            console.log(err)
            setError(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        request()
    }, [])
    return { data, loading, error }
}

export default useApi