const { request, response } = require('express')
const Serie = require('../../models/Serie.js');

const getSeries = (req = request, res = response) => {

    const { genre, title, year } = req.query

}

const getSerieId = (req = request, res = response) => {

    const { id } = req.params


}

const getSerieGenre = (req = request, res = response) => {

}

const getSerieTitle = (req = request, res = response) => {

}

const getSerieYearRelease = (req = request, res = response) => {

}


module.exports = {
    getSeries,
    getSerieId,
    getSerieTitle,
    getSerieGenre, 
    getSerieYearRelease
}