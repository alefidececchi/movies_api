const User = require('../../models/User.js')


const createUserWithGoogle = async (payload) => {

    try {
        const user = await User.create({
            e_mail: payload.email,
            lastName: payload.family_name,
            name: payload.given_name,
            picture: payload.picture,
        })
        return user
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    createUserWithGoogle
}