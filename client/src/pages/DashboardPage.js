import React, { useEffect, useState } from "react"
import userApi from "../api/users"
import orgApi from "../api/organisation"

import "../assets/stylesheets/Dashboard.scss"
import SideBar from "../components/SideBar"
import OrgList from "../components/OrgList"
import OrgDetails from "../components/OrgDetails"

const Dashboard  = ({history}) => {

    const [user, setUser] = useState({})
    const [organisations, setOrganisations] = useState([])

    const load = async function() {
        const { data: user } = await userApi.getUser()
        console.log(user.organisationId)
        const { data: organisations } = await orgApi.getOrganisations()
        setUser(user)
        setOrganisations(organisations)
    }

    useEffect(() => {
        const session = localStorage.getItem('adnat_session_id')
        if (!session) return history.push('/login')
        load()
    }, [])

    const organisation = () => {
        return organisations.filter(org => org.id === user.organisationId)
    }

    const updateOrgId = (id) => {
        setUser({...user, organisationId: id})
    }

    return (
        <div className="dashboard-container"  >
            <SideBar history={history} />
            <div className="dashboard-content">
                <h3> Hi, {user.name} </h3>
                {user.organisationId ? 
                    <OrgDetails user={user} organisation={organisation()} updateOrgId={updateOrgId} load={load} />
                    :
                    <OrgList organisations={organisations} updateOrgId={updateOrgId} load={load} />
                }
            </div>
        </div>
    )
}

export default Dashboard