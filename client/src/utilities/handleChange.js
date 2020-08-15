const handleChange = (e, state, cb) => {
    const { name, value } = e.target
    cb({...state, [name]: value})
}

export default handleChange