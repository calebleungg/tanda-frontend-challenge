import React, { useEffect, useState } from "react"
import userApi from "../api/users"
import handleChange from "../utilities/handleChange"

const EditDetails = () => {

    const [details, setDetails] = useState({
        name: '',
        email: ''
    })
    const [flash, setFlash] = useState(null)

    useEffect(() => {
        load()
    }, [])

    // api call to retrieve user data
    const load = async function() {
        const { data: { name, email } } = await userApi.getUser()
        setDetails({name, email})
    }

    // api call to update user details and state
    const handleUpdate = async function () {
        try {
            const { data: { name, email} } = await userApi.updateUser(details)
            setDetails({name, email})
            setFlash({
                message: "Details saved",
                color: "green"
            })
        } catch(err) {
            console.log(err)
            setFlash({
                message: "Error saving details",
                color: "red"
            })
        }
    }

    return (
        <>
            <div className="edit-item" >
                <span> Name </span><br/>
                <input
                    type="text"
                    name="name" 
                    value={details.name}
                    onChange={(e)=>handleChange(e, details, setDetails)}
                />
            </div>
            <div className="edit-item" >
                <span> Email </span><br/>
                <input
                    type="text"
                    name="email" 
                    value={details.email}
                    onChange={(e)=>handleChange(e, details, setDetails)}
                /><br/>
                {flash && <span style={{color: flash.color}} > {flash.message} </span>}
            </div>
            <button onClick={handleUpdate} > Update details </button>
        </>
    )
}

export default EditDetails