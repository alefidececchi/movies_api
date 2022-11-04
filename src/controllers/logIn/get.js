const { request, response } = require('express')
const bcrypt = require('bcryptjs')

const { getUser } = require('../user/get')

const verifyLogin = async (req = request, res = response) => {

    const { email, password } = req.body

    try {
        const user = (await getUser(email))[0]
        if (!user) {
            res.status(404).json({ message: `No existe ese correo` })
        } else {
            !!bcrypt.compareSync(password, user.password)
                ? res.status(200).json({ message: `Hola ${user.name}!`, stateLogin: true })
                : res.status(400).json({ message: `Parece que hubo un error`, stateLogin: false })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    verifyLogin
}