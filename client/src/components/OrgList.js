import React from "react"
import NewOrgForm from "./NewOrgForm"
import orgApi from "../api/organisation"
import OrgEditForm from "./OrgEditForm"

const OrgList = ({organisations, updateOrgId, load}) => {

    // api call to join organisation
    const handleJoin = async function (id) {
        await orgApi.joinOrganisation({organisationId: id})
        updateOrgId(id)
    }

    // helper function to render list
    const renderOrgList = () => {
        let output = []
        organisations.map(org => {
            output.push(
                <div className="org-list-item" key={org.id}>
                    <span> {org.name} </span>
                    <div>
                        <OrgEditForm load={load} details={org} />
                        <button onClick={() => handleJoin(org.id)} style={{marginLeft: "10px"}} > join </button>
                    </div>
                </div>
            )
        })
        return output
    }

    return (
        <>
            <p id="no-org-prompt" > You are not apart of an organisation. <br/>Join an existing one from the list below or create a new one! </p>
            <div id="org-list" >
                <p> <strong>Organisations</strong> </p>
                <NewOrgForm load={load} />
                <br/>
                {renderOrgList()}
            </div>
        </>
    )
}

export default OrgList