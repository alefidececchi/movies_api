const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    e_mail: { type: String, required: 'se requiere un mail' },
    lastName: { type: String, required: 'se requiere un apellido' },
    name: { type: String, required: 'se requiere un nombre' },
    password: String,
    picture: String,
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" }
})

module.exports = model('user', userSchema)

