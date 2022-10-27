const { model, Schema } = require('mongoose');


const schemaCarousel = new Schema({
    desktop_img: String,
    movieOrSerie: { type: String, enum: ["movie", "serie"] },
    phone_img: String,
    tablet_img: String,
    title: String, 
    // { type: Schema.Types.ObjectId, ref: 'movie' || 'serie' },
})

module.exports = model('carousel', schemaCarousel)