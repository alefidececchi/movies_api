const { request, response } = require('express')

const User = require('../../models/User.js')
const { verifyTokenLogoutSession } = require('../../middlewares/auth.js')

const logout = async (req = request, res = response) => {

    const { id } = req.params
    const authorization = req.get('Authorization')

    try {
        if (verifyTokenLogoutSession(authorization, id)) {
            const user = await User.findByIdAndUpdate(id, { stateLogin: false }, { new: true })
            res.status(200).json({ message: "ok", stateLogin: user.stateLogin })
        } else {
            return res.status(403).json({ message: 'No es posible cerrar sesion' })
        }
    } catch (error) {
        return res.status(401).json({ message: "Algo salió mal", error })
    }
}

module.exports = {
    logout
}