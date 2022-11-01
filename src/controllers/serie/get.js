const { request, response } = require('express')
const Serie = require('../../models/Serie.js');

const getSeries = async (req = request, res = response) => {

    let { category, title, year } = req.query
    let series;

    
    try {
        if (!title) {
            series = await Serie.find()
            series = year ? getSeriesYearRelease(series, year) : series;
            series = category ? getSeriesCategory(series, category) : series
            return res.status(200).json({ series })
        } else {
            series = await getSerieTitle(title)
        }
        return res.status(200).json({ series })
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

const getSerieId = async (req = request, res = response) => {

    const { id } = req.params
    try {
        const serie = await Serie.findById(id)
        return res.status(200).json({ serie })
    } catch (error) {
        return res.status(404).json({ error: 'Algo con el id salió mal' })
    }
}

const getSeriesCategory = (series, category) => {
    return series.filter(s => s.category.includes(category))
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