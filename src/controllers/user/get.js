const User = require('../../models/User.js')


const getUser = async (payload) => {

    try {
        const userExist = await User.find({ e_mail: payload.email})
        return userExist;
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getUser
}