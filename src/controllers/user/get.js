const User = require('../../models/User.js')


const getUser = async (email) => {

    try {
        const userExist = await User.find({ email })
        return userExist;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUser
}