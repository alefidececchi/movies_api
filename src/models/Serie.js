const { model, Schema } = require('mongoose')


const serieSchema = new Schema({
    actors: [{ type: String, required: 'Agrega al menos un actor' }],
    country: String,
    description: { type: String, required: 'debes agregar una descripcion de la serie' },
    director: { type: String, required: 'se requiere nombre del director' },
    category: [{ type: String, required: 'se requiere al menos un genero' }],
    link_img: String,
    link_img_larger: String,
    link_trailer: String,
    release_year: { type: Number, required: 'se requiere año de lanzamiento' },
    season: Number,
    title: { type: String, required: 'se requiere nombre de la serie' },
    type_storage: [{ type: String, enum: ['dvd', 'pendrive'] }]
})


module.exports = model('serie', serieSchema)