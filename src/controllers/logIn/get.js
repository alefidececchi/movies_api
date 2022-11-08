const { request, response } = require('express')
const bcrypt = require('bcryptjs')

const { getUser } = require('../user/get')
const User = require('../../models/User')

const verifyLogin = async (req = request, res = response) => {

    const { email, password } = req.body

    try {
        let user = (await getUser(email))[0]
        if (!user) {
            res.status(404).json({ message: `No existe ese correo` })
        } else {
            if (!!bcrypt.compareSync(password, user.password)) {
                user = await User.findByIdAndUpdate(user._id, { stateLogin: true }, { new: true })
                res.status(200).json({ message: `Hola ${user.name}!`, user })
            } else {
                res.status(400).json({ message: `Escribiste mal la contraseña` })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    verifyLogin
}