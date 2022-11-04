const { request, response } = require('express');
const bcrypt = require('bcryptjs')

const User = require('../../models/User.js')
const { getUser } = require('./get.js')

const createUser = async (req = request, res = response) => {

    const { email, lastName, name, password, picture } = req.body
    try {
        if (!!(await getUser(email)).length) {
            res.status(404).json({ message: 'Ya existe una cuenta con este correo', stateSignIn: false })
        }
        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(password, salt)
        const user = await User.create({ email, lastName, name, password: hash, picture })
        res.status(201).json({ user, stateSignIn: true })
    } catch (error) {
        console.log(error)
    }
}

const createUserWithGoogle = async (payload) => {

    try {
        const user = await User.create({
            email: payload.email,
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
    createUser,
    createUserWithGoogle
}