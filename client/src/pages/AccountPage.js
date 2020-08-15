import React, { useState, useEffect } from "react"
import "../assets/stylesheets/Dashboard.scss"

import SideBar from "../components/SideBar"
import EditDetails from "../components/EditDetails"
import NewPasswordForm from "../components/NewPasswordForm"

const AccountPage = ({history}) => {

    const [change, setChange] = useState(false)

    useEffect(() => {
        const session = localStorage.getItem('adnat_session_id')
        if (!session) return history.push('/login')
    }, [])

    return (
        <div className="dashboard-container">
            <SideBar />
            <div className="dashboard-content">
                <h3> Your account </h3>
                <p> Edit your details here </p>
                <div id="profile-edit-form">
                    <EditDetails />
                    {change ? 
                        <NewPasswordForm />
                        :
                        <button onClick={()=>setChange(!change)} > Change password </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AccountPage