const User = require('../models/User')

const Tought = require('../models/Tought')

module.exports = class ToughtController {
    static async showAll(req, res) {
        
        res.render('toughts/home')

    }
}