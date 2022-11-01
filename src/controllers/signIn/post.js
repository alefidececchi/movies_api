const { request, response } = require('express')
const { getUser } = require('../user/get');
const { createUserWithGoogle } = require('../user/post.js')
const verify = require('../../middlewares/auth.js')



const postJWTFromGoogle = async (req = request, res = response) => {
    try {
        // console.log('Estoy verificando')
        const payload = await verify(req.body.credential)
        const user = await getUser(payload)
        const resp = !user.length ? await createUserWithGoogle(payload) : user;
        res.status(200).json({ message: 'El usuario es: ', resp })
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    postJWTFromGoogle
}