const { request, response } = require('express')
const Serie = require('../../models/Serie.js');

const getSeries = async (req = request, res = response) => {

    let { categories, limit, page, title } = req.query
    let obj = {};

    try {
        if (categories) {
            obj = await getSeriesCategory(categories, page, limit)
        } else if (title) {
            obj = await getSerieTitle(title, page, limit)
        } else {
            obj.count = await Serie.find().count()
            obj.series = await Serie.find().sort({ _id: -1 }).skip((page - 1) * limit).limit(limit)
        }
        return res.status(200).json({ count: obj.count, page, series: obj.series })
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

const getSeriesCategory = async (categories, page, limit) => {
    try {
        const arr = categories.split(',')
        const count = await Serie.find({ category: { $all: arr } }).count()
        const series = await Serie.find({ category: { $all: arr } }).sort({ _id: -1 }).skip((page - 1) * limit).limit(limit)
        return ({ count, series })
    } catch (error) {
        return res.status(404).json({ message: 'Algo salío mal con las categorías seleccionadas', error })
    }
}

const getSeriesDashboard = async (req = request, res = response) => {

    const { title } = req.query
    let series;
    try {
        if (title) {
            series = await Serie.find({ title: new RegExp(title, 'i') }, { title: 1, link_img: 1 }).sort({ _id: -1 })
        } else {
            series = await Serie.find({}, { title: 1, link_img: 1 }).sort({ _id: -1 })
        }
        return res.status(200).json({ series })
    } catch (error) {
        return res.status(404).json({ message: 'Hubo algún error', error })
    }
}

const getSerieTitle = async (title, page, limit) => {
    try {
        const count = await Serie.find({ title: new RegExp(title, 'i') }).count()
        const series = await Serie.find({ title: new RegExp(title, 'i') }).sort({ _id: -1 }).skip((page - 1) * limit).limit(limit)
        return ({ count, series })
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
    getSeriesDashboard,
    getSeriesYearRelease
}