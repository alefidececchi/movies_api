const { request, response } = require('express')

const User = require('../../models/User.js')
const { verifyTokenLogoutSession } = require('../../middlewares/auth.js')

const logout = async (req = request, res = response) => {

    const { id } = req.params
    // // const authorization = req.headers.authorization
    // const auth = req.headers['access-control-request-headers']
    //  get('Authorization')
    const authorization = req.get('Authorization')

    try {
        // console.log('auth2 ',auth2)
        if(verifyTokenLogoutSession(authorization, id)) {
            const user = await User.findByIdAndUpdate(id, { stateLogin: false }, { new: true })
            console.log(user)
            res.status(200).json({ message: "ok", stateLogin: user.stateLogin })
        } else {
            return res.status(403).json({ message: 'No es posible cerrar sesion' })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    logout
}