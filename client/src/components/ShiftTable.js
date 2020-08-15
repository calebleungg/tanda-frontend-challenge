import React, { useState, useEffect } from "react"

import handleChange from "../utilities/handleChange"
import shiftApi from "../api/shift"
import userApi from "../api/users"
import moment from "moment"
import DatePicker from "./DatePicker"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const ShiftTable = ({user, rate}) => {

    const [shift, setShift] = useState({
        userId: user.id,
        start: '',
        finish: '',
        breakLength: 0,
        organisationId: user.organisationId
    })

    const [shifts, setShifts] = useState([])
    const [users, setUsers] = useState([])
    const [date, setDate] = useState('')
    const [error, setError] = useState(false)
    const [editing, setEditing] = useState({})
    const [search, setSearch] = useState('')
    const [dates, setDates] = useState({
        startDate: '',
        endDate: '',
    })

    useEffect(() => {
        load()
    }, [search, dates])

    const load = async function () {
        try {
            let { data: shifts } = await shiftApi.getShifts()
            let { data: users } = await userApi.getOrganisationsUsers()
            console.log({shifts, users})

            // filtering by name
            if(search !== "") {
                let usersfiltered = []
                const regex = new RegExp(escapeRegex(search), 'gi');
                users.map(user => {
                    if (regex.test(user.name)) usersfiltered.push(user);
                })
                users = usersfiltered
            } 

            // filtering by dates
            if (dates.startDate !== "" && dates.endDate !== "") {
                let shiftsFiltered = []
                shifts.map(shift => {
                    const start = moment(dates.startDate).format("YYYY/MM/DD")
                    const end = moment(dates.endDate).format("YYYY/MM/DD")
                    const date = moment(shift.start).format("YYYY/MM/DD")
                    if(moment(date).isBetween(start, end, undefined, '[]')) {
                        shiftsFiltered.push(shift)
                    }
                })
                shifts = shiftsFiltered
            }

            setShifts(shifts)
            setUsers(users)
        } catch(err) {
            console.log(err)
        }
    }


    const handleSubmit = async function() {
        console.log(shift)
        if (date === '' || shift.start === '' || shift.finish === '') return setError(true)
        setError(false)
        const newShift = {...shift,
            start: `${date} ${shift.start}`,
            finish: `${date} ${shift.finish}`,
        }
        try {
            await shiftApi.createShift(newShift)
            load()
        } catch (err) {
            console.log(err)
        }
    }

    const hanldleDelete = async function(id) {
        await shiftApi.deleteShift(id)
        load()
    }

    const handleEdit = async function(id) {
        const req = {
            start: `${editing.date} ${editing.start}`, 
            finish: `${editing.date} ${editing.finish}`, 
            breakLength: editing.breakLength
        }
        await shiftApi.updateShift(id, req)
        setEditing(false)
        load()
    }


    const renderShifts = () => {
        let output = []
        const sorted = shifts.sort((a,b) => {
            const dateA = moment(a.start)
            const dateB = moment(b.start)
            if (dateA > dateB) return -1;
            if (dateA === dateB) return 0;
            if (dateA < dateB) return 1;
        })

        sorted.map(shift => {
            let shiftLength = moment(shift.finish).diff(moment(shift.start), "minutes")
            if (shiftLength < 1) {
                const startTime = moment(shift.start)
                const endOfDay = moment(shift.start).endOf('day')
                const startOfDay = moment(shift.finish).startOf('day')
                const finishTime = moment(shift.finish)

                const minutesOfFirstDay = moment(endOfDay).diff(moment(startTime), "minutes") + 1
                const minutesOfSecondDay = moment(finishTime).diff(moment(startOfDay), "minutes") 

                shiftLength = minutesOfFirstDay + minutesOfSecondDay
            }
            const shiftUser = users.filter(user => user.id === shift.userId)[0]            
        
            if(shiftUser) {
                if(editing.id === shift.id) {
                    output.push(
                        <tr key={shift.id} >
                            <td> { user.name } </td>
                            <td>
                                <input 
                                    type="date"
                                    name="date"
                                    value={editing.date}
                                    onChange={(e)=>handleChange(e, editing, setEditing)}
                                />
                            </td>
                            <td>
                                <input 
                                    type="time"
                                    name="start"
                                    value={editing.start}
                                    onChange={(e)=>handleChange(e, editing, setEditing)}
                                />
                            </td>
                            <td>
                                <input 
                                    type="time"
                                    name="finish"
                                    value={editing.finish}
                                    onChange={(e)=>handleChange(e, editing, setEditing)}
                                />
                            </td>
                            <td>
                                <input 
                                    type="number"
                                    name="breakLength"
                                    value={editing.breakLength}
                                    onChange={(e)=>handleChange(e, editing, setEditing)}
                                />
                            </td>
                            <td>
                                <button onClick={()=>handleEdit(shift.id)} style={{width: "100%"}} > save </button>
                            </td>
                            <td> <button onClick={()=>setEditing({})} style={{width: "100%"}} > cancel </button> </td>
                            <td></td>
                        </tr>
                    )
                } else {
                    output.push(
                        <tr key={shift.id} >
                            <td> {shiftUser.name} </td>
                            <td> {moment(shift.start).format('DD/MM/YYYY')} </td>
                            <td> {moment(shift.start).format("hh:mm a")} </td>
                            <td> {moment(shift.finish).format("hh:mm a")} </td>
                            <td> {shift.breakLength} </td>
                            <td> {((shiftLength - shift.breakLength) / 60).toFixed(2)} </td>
                            <td> {`$${((shiftLength - shift.breakLength) / 60 * rate).toFixed(2)}`} </td>
                            <td>
                                {user.id === shift.userId && 
                                    <> 
                                        <EditIcon onClick={()=>setEditing({
                                            id: shift.id,
                                            date: shift.start.split(" ")[0],
                                            start: shift.start.split(" ")[1],
                                            finish: shift.finish.split(" ")[1],
                                            breakLength: shift.breakLength
                                        })} />
                                        <DeleteIcon onClick={()=>hanldleDelete(shift.id)} />
                                    </>
                                }
                            </td>
                        </tr>
                    )
                }
            }
        })
        return output
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    
    return (
        <div id="shift-container" >
            <p> <strong>Shifts</strong> </p>
            <div id="filtering-bar" >
                <DatePicker setDates={setDates} />
                <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Search employee"
                    onChange={(e)=>handleSearch(e)}
                    id="name-search-input"
                />
            </div>
            {error && <span className="error-msg"> Please provide all fields for a new shift entry </span>}
            <table id="shift-table" >
                <thead>
                    <tr>
                        <td>Employee name</td>
                        <td>Shift date</td>
                        <td>Start time</td>
                        <td>Finish time</td>
                        <td>Break length (mins)</td>
                        <td>Hours worked</td>
                        <td>Shift cost</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            { user.name }
                        </td>
                        <td>
                            <input 
                                type="date"
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </td>
                        <td>
                            <input 
                                type="time"
                                name="start"
                                onChange={(e) => handleChange(e, shift, setShift)}
                            />
                        </td>
                        <td>
                            <input 
                                type="time"
                                name="finish"
                                onChange={(e) => handleChange(e, shift, setShift)}
                            />
                        </td>
                        <td>
                            <input 
                                type="number"
                                name="breakLength"
                                onChange={(e) => handleChange(e, shift, setShift)}
                            />
                        </td>
                        <td>
                            <button onClick={handleSubmit} style={{width: "100%"}} > create </button>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    {users.length > 0 && renderShifts()}
                </tbody>
            </table>
        </div>
    )
}

export default ShiftTable