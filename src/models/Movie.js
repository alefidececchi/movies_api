const { model, Schema } = require('mongoose')


const movieSchema = new Schema({
    actors: [String],
    country: String,
    description: { type: String, required: 'debes agregar una descripcion de la pelicula' },
    director: { type: String, required: 'se requiere nombre del director' },
    category: [{ type: String, required: 'se requiere al menos un genero' }],
    link_img: String,
    link_img_larger: String,
    link_trailer: String,
    release_year: { type: Number, required: 'se requiere año de estreno' },
    title: { type: String, required: 'se requiere nombre de la pelicula' },
    type_storage: [{ type: String, enum: ['dvd', 'pendrive'] }]
})


module.exports = model('movie', movieSchema)