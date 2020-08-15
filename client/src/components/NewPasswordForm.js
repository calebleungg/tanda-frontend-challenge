import React, { useState } from "react"
import handleChange from "../utilities/handleChange"
import userApi from "../api/users"

const NewPasswordForm = () => {

    const [newPassword, setNewPassword] = useState({
        oldPassword: '',
        newPassword: '',
        newPasswordConfirmation: ''
    })
    const [flash, setFlash] = useState(null)

    const handleChangePassword = async function() {
        try {
            const change = await userApi.changePassword(newPassword)
            setFlash({message: "Password successfully updated", color: "green"})
        } catch (err) {
            console.log(err)
            setFlash({message: "Current password is incorrect / passwords do not match", color: "red"})
        }
    }
    return (
        <div id="password-input" >
            <div className="edit-item" >
                <span> Current password </span><br/>
                <input
                    type="password"
                    name="oldPassword" 
                    onChange={(e)=>handleChange(e, newPassword, setNewPassword)}
                />
            </div>
            <div className="edit-item" >
                <span> New password </span><br/>
                <input
                    type="password"
                    name="newPassword" 
                    onChange={(e)=>handleChange(e, newPassword, setNewPassword)}
                />
            </div>
            <div className="edit-item" >
                <span> Confirm new password </span><br/>
                <input
                    type="password"
                    name="newPasswordConfirmation" 
                    onChange={(e)=>handleChange(e, newPassword, setNewPassword)}
                /><br/>
                {flash && <span style={{color: flash.color}} > {flash.message} </span>}
            </div>
            <button onClick={handleChangePassword} > change </button>
        </div>
    )
}

export default NewPasswordForm