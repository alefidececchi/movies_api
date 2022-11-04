const { request, response } = require('express')
const { getUser } = require('../user/get');
const { createUserWithGoogle } = require('../user/post.js')
const { createUser } = require('../user/post.js')
const verify = require('../../middlewares/auth.js')



const postJWTFromGoogle = async (req = request, res = response) => {

    const { clasic } = req.query
    try {
        if(!clasic) {
            const payload = await verify(req.body.credential)
            const user = await getUser(payload.email)
            const resp = !user.length ? await createUserWithGoogle(payload) : user;
            res.status(200).json({ message: 'El usuario es: ', user: resp, stateSignIn: true, stateLogIn: true })
        }
        createUser(req, res);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    postJWTFromGoogle
}