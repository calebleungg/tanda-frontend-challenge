import React, { useState, useEffect } from "react"
import "../assets/stylesheets/Auth.scss"
import { Link } from "react-router-dom"
import authApi from "../api/auth"
import useSession from "../hooks/useSession"
import handleChange from "../utilities/handleChange"


const LoginPage  = ({history}) => {

    useSession(history)

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState(false)
    
    // api call to handle login
    const handleSubmit = () => {
        authApi.login(credentials)
            .then(({data: {sessionId}}) => {
                localStorage.setItem('adnat_session_id', sessionId)
                window.location.reload(false)
            })
            .catch(err => setError(true))
    }

    return (
        <div className="auth-container" >
            <div className="form-wrapper" >
                <p className="adnat-logo" > ADNAT </p>
                <div className="auth-form" >
                    <span > Login </span>
                    <input 
                        className="form-input" 
                        type="email"  
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e, credentials, setCredentials)}
                        /> 
                    <input 
                        className="form-input" 
                        type="password"  
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e, credentials, setCredentials)}
                        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                    /> 
                </div>
                {error && <span className="error-msg"> Invalid username or password </span>}
                <br/>
                <br/>
                <span> Dont have an account? <Link to="/signup">signup here.</Link> </span>
            </div>
        </div>
    )
}

export default LoginPage