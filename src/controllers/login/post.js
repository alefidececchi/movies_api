const { request, response } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { getUser } = require('../user/get')
const User = require('../../models/User')

const verifyLogin = async (req = request, res = response) => {

    const { email, password } = req.body

    try {
        let user = (await getUser(email))[0]
        if (!user) {
            return res.status(401).json({ message: `Correo o contraseña invalida` })
        } else {
            if (!!bcrypt.compareSync(password, user.password)) {
                user = await User.findByIdAndUpdate(user._id, { stateLogin: true })
                if (!user.stateLogin) {
                    const userForToken = {
                        id: user._id,
                        role: user.role
                    }
                    const token = jwt.sign(userForToken, process.env.SECRET)
                    console.log(token)
                    return res.status(200).json({
                        id: user._id,
                        role: user.role,
                        stateLogin: true,
                        token
                    })
                } else {
                    return res.status(401).json({ message: `Ya se encuentra una sesion abierta` })
                }
            } else {
                return res.status(401).json({ message: `Correo o contraseña invalida` })
            }
        }
    } catch (error) {
        return res.status(401).json({ message: "Algo salió mal", error })
    }
}

module.exports = {
    verifyLogin
}