import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import "../assets/stylesheets/Dashboard.scss"
import handleChange from "../utilities/handleChange"
import orgApi from "../api/organisation"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrgEditForm({load}) {

    const [open, setOpen] = React.useState(false);
    const [info, setInfo] = useState({
        name: "",
        hourlyRate: 0
    })
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async function () {
        try {
            await orgApi.createOrganisation(info)
            load()
            handleClose()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <button id="create-org-btn" onClick={handleClickOpen} > Create </button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Create Organisation</DialogTitle>
                    <div id="new-org-form" >
                        <input 
                            type="text" 
                            className="form-input"
                            placeholder="Enter organisation name"
                            name="name"
                            onChange={(e) => handleChange(e, info, setInfo)}
                        /><br/>
                        <input 
                            type="number" 
                            className="form-input"
                            placeholder="Enter hourly rate"
                            name="hourlyRate"
                            onChange={(e) => handleChange(e, info, setInfo)}
                        />
                    </div>
                <DialogActions>
                    <button onClick={handleSubmit} > save </button>
                </DialogActions>
            </Dialog>
        </>
    );
}
