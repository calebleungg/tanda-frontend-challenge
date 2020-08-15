import { useEffect } from "react"

// custom hook to manage cross browser sessions
const useSession = (history) => {
    useEffect(() => {
        const session = localStorage.getItem("adnat_session_id")
        if (session) return history.push('/')
    }, [])
}

export default useSession