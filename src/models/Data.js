const { model, Schema } = require('mongoose');


const schemaData = new Schema({
    categories: [{ type: String }],
})

module.exports = model('data', schemaData)