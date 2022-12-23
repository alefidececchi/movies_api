const { request, response } = require('express')

const Data = require('../../models/Data')

const getCategories = async (req = request, res = response) => {

    try {
        const data = await Data.find()
        // console.log(data[0])
        return res.status(200).json({ categories: data[0].categories })
    } catch (error) {
        return res.status(404).json({ message: 'Algo salió mal', error })
    }
}

module.exports = {
    getCategories
}