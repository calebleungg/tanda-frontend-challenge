import React, { useState } from "react"

import orgApi from "../api/organisation"
import "../assets/stylesheets/Dashboard.scss"

import OrgEditForm from "../components/OrgEditForm"
import ShiftTable from "./ShiftTable"

const OrgDetails = ({organisation, updateOrgId, load, user}) => {

    const org = organisation[0]

    const handleLeave = async function () {
        await orgApi.leaveOrganisation()
        updateOrgId(null)
    }

    return (
        <div id="org-manage">
            <p> Manage your organisation. </p>
            <h3> {org?.name} </h3>
            <span> Hourly Rate: {`$${org?.hourlyRate.toFixed(2)}`} </span>
            <div id="org-manage-bar">
                <OrgEditForm load={load} details={org} />
                <button onClick={handleLeave} > Leave </button>
            </div>
            <ShiftTable user={user} rate={org?.hourlyRate} />
        </div>
    )
}

export default OrgDetails