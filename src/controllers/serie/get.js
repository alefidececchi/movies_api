const { request, response } = require('express')
const Serie = require('../../models/Serie.js');

const getSeries = async (req = request, res = response) => {

    let { categories, title } = req.query
    let series;

    try {
        if (categories) {
            series = await getSeriesCategory(categories)
        } else if (title) {
            series = await getSerieTitle(title)
        } else {
            series = await Serie.find()
        }
        return res.status(200).json({ series })
    } catch (error) {
        return res.status(404).json({ message: 'Algo salió mal', error })
    }
}

const getSerieId = async (req = request, res = response) => {

    const { id } = req.params
    try {
        const serie = await Serie.findById(id)
        return res.status(200).json({ serie })
    } catch (error) {
        return res.status(404).json({ message: 'Algo con el id salió mal', error })
    }
}

const getSeriesCategory = async (categories) => {
    try {
        const arr = categories.split(',')
        const query = { $all: arr }
        const series = await Serie.find({ category: query })
        return series
    } catch (error) {
        return res.status(404).json({ message: 'Algo salío mal con las categorías seleccionadas', error })
    }
}

const getSerieTitle = async (title) => {
    try {
        const series = await Serie.find({ title: new RegExp(title, 'i') })
        return series
    } catch (error) {
        return new Error('Algo salió mal con el titulo')
    }
}

const getSeriesYearRelease = (series, year) => {
    return series.filter(s => s.release_year == year)
}


module.exports = {
    getSeries,
    getSerieId,
    getSerieTitle,
    getSeriesCategory,
    getSeriesYearRelease
}