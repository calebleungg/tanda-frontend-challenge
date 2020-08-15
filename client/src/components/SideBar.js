import React from "react"
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from "react-router-dom";
import authApi from "../api/auth"

const SideBar = ({history}) => {

    const handleLogout = async function() {
        await authApi.logout()
        localStorage.removeItem('adnat_session_id')
        window.location.reload(false)
    }


    return (
        <div id="side-bar">
            <div id="top-options">
                <Link to="/">
                    <div className="sidebar-btn">
                        <HomeIcon />
                        <span> Dashboard </span>
                    </div>
                </Link>
                <Link to="/account">
                    <div className="sidebar-btn">
                        <AccountCircleIcon />
                        <span> Account </span>
                    </div>
                </Link>
            </div>
            <div className="sidebar-btn" onClick={handleLogout} style={{cursor: "pointer"}} >
                <ExitToAppIcon />
                <span> Logout </span>
            </div>
        </div>
    )
}

export default SideBar