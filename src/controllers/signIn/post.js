const { request, response } = require('express')

const { createUser } = require('../user/post.js')
const { createUserWithGoogle } = require('../user/post.js')
const { getUser } = require('../user/get');
const { verifyLogin } = require('../login/post');
const { verifyTokenGoogle } = require('../../middlewares/auth.js');
// const User = require('../../models/User');



const postJWTFromGoogle = async (req = request, res = response) => {

    const { clasic } = req.query
    try {
        if (!clasic) {
            let loginUser;
            const payload = await verifyTokenGoogle(req.body.credential)
            let signinUser = await getUser(payload.email)
            const otherReq = {
                body: { email: payload.email, email_verified: payload.email_verified }
            }
            !signinUser.length
                ? loginUser = await createUserWithGoogle(payload)
                : verifyLogin(otherReq)
            // loginUser = await User.findByIdAndUpdate(signinUser[0]._id, { stateLogin: true }, { new: true })
            return res.status(200).json({ message: 'El usuario es: ', stateSignin: true })
        } else {
            await createUser(req, res);
        }
    } catch (error) {
        return res.status(401).json({ message: "Algo salió mal", error })
    }
}

module.exports = {
    postJWTFromGoogle
}