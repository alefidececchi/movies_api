const { request, response } = require('express');
const bcrypt = require('bcryptjs')

const User = require('../../models/User.js')
const { getUser } = require('./get.js')

const createUser = async (req = request, res = response) => {

    const { email, lastName, name, password } = req.body
    try {
        if (!!(await getUser(email)).length) {
            return res.status(404).json({ message: 'Correo inválido', stateSignin: false })
        } else {
            const salt = bcrypt.genSaltSync()
            const hash = bcrypt.hashSync(password, salt)
            await User.create({ email, lastName, name, password: hash })
            return res.status(201).json({ message: 'Usuario creado', stateSignin: true })
        }
    } catch (error) {
        return res.status(401).json({
            error,
            message: 'Algo salió mal al crear el usuario',
            stateSignin: false
        })
    }
}

const createUserWithGoogle = async (payload) => {

    try {
        const user = await User.create({
            email: payload.email,
            lastName: payload.family_name,
            name: payload.given_name,
            stateLogin: true
        })
        return user
    } catch (error) {
        return res.status(401).json({ message: "Algo salió mal", error })
    }
}

module.exports = {
    createUser,
    createUserWithGoogle
}