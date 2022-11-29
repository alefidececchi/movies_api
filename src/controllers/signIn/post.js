const { request, response } = require('express')
const { getUser } = require('../user/get');
const { createUserWithGoogle } = require('../user/post.js')
const { createUser } = require('../user/post.js')
const verify = require('../../middlewares/auth.js');
const User = require('../../models/User');



const postJWTFromGoogle = async (req = request, res = response) => {

    const { clasic } = req.query
    try {
        if (!clasic) {
            let loginUser;
            const payload = await verify(req.body.credential)
            let signinUser = await getUser(payload.email)
            !signinUser.length ?
                loginUser = await createUserWithGoogle(payload) :
                loginUser = await User.findByIdAndUpdate(signinUser[0]._id, { stateLogin: true }, { new: true })
            res.status(200).json({ message: 'El usuario es: ', user: loginUser, stateSignin: true })
        } else {
            await createUser(req, res);
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    postJWTFromGoogle
}