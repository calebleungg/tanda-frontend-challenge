import React from "react"
import NewOrgForm from "./NewOrgForm"
import orgApi from "../api/organisation"

const OrgList = ({organisations, updateOrgId, load}) => {

    const handleJoin = async function (id) {
        await orgApi.joinOrganisation({organisationId: id})
        updateOrgId(id)
    }

    const renderOrgList = () => {
        let output = []
        organisations.map(org => {
            output.push(
                <div className="org-list-item" key={org.id}>
                    <span> {org.name} </span>
                    <div>
                        <span> edit </span>
                        <span onClick={() => handleJoin(org.id)} > join </span>
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