const { request, response } = require('express')
const User = require('../../models/User.js')


const logout = async (req = request, res = response) => {

    const { id } = req.params

    try {
        const user = await User.findByIdAndUpdate(id, { stateLogin: false }, { new: true })
        res.status(201).json({ message: "sesion cerrada exitosamente", user })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    logout
}