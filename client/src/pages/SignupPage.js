import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import authApi from "../api/auth"
import useSession from "../hooks/useSession"
import handleChange from "../utilities/handleChange"

const SignUp  = ({history}) => {

    useSession(history)

    const [info, setInfo] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })

    const [errors, setErrors] = useState({
        email: null,
        password: null,
        confirm: null
    })

    const handleSubmit = () => {
        let newErrors = {email: null, password: null, confirm: null}

        // validate email
        if(info.email.length <= 4 || !info.email.split("").includes("@")) newErrors.email = "Please provide a valid email";
        // // validate password
        if(info.password.length <= 8) newErrors.password = "Password must contain at least 8 characters";
        // // validate confirm password
        if(info.password !== info.passwordConfirmation) newErrors.confirm = "Passwords must be the same";
        setErrors(newErrors)
        
        if(!newErrors.email && !newErrors.password && !newErrors.confirm) {
            authApi.signup(info)
            .then(({data: {sessionId}}) => {
                localStorage.setItem("adnat_session_id", sessionId)
                window.location.reload(false)
            })
            .catch(err => setErrors({...errors, confirm: "Email already exists"}))
        }

    }

    return (
        <div className="auth-container">
            <div className="form-wrapper" >
                <p className="adnat-logo" > ADNAT </p>
                <div className="auth-form" >
                    <span > Sign up </span>
                    <input 
                        className="form-input" 
                        type="text"  
                        placeholder="Name"
                        name="name"
                        onChange={(e) => handleChange(e, info, setInfo)}
                    /> 
                    <input 
                        className="form-input" 
                        type="email"  
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e, info, setInfo)}
                    /> 
                    {errors.email && <span className="error-msg" > {errors.email} </span>}
                    <input 
                        className="form-input" 
                        type="password"  
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e, info, setInfo)}
                    /> 
                    {errors.password && <span className="error-msg" > {errors.password} </span>}
                    <input 
                        className="form-input" 
                        type="password"  
                        placeholder="Confirm Password"
                        name="passwordConfirmation"
                        onChange={(e) => handleChange(e, info, setInfo)}
                    /> 
                    {errors.confirm && <span className="error-msg" > {errors.confirm} </span>}
                    <button onClick={handleSubmit} > Sign Up </button>
                </div>
                <br/>
                <span> Already have an account? <Link to="/">login here.</Link> </span>
            </div>
        </div>
    )
}

export default SignUp