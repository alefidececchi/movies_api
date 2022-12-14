const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: { type: String, required: 'se requiere un mail' },
    lastName: { type: String, required: 'se requiere un apellido' },
    name: { type: String, required: 'se requiere un nombre' },
    password: String,
    // picture: String,
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
    stateLogin: { type: Boolean, default: false },
})

module.exports = model('user', userSchema)

