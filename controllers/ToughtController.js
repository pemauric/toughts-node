const User = require('../models/User')

const Tought = require('../models/Tought')

module.exports = class ToughtController {
    static async showAll(req, res) {
        
        res.render('toughts/home')

    }

    static async dashboard(req, res) {
        res.render('toughts/dashboard')
    }

    static createToughts(req, res) {
        res.render('toughts/create')
    }

    static async createToughtsSave(req, res) {
        
        const tought = {
            title: req.body.title,
            UserId: req.session.userId
        }
        
        try {
            await Tought.create(tought)
            
            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(()=> {
                res.redirect('/toughts/dashboard')
            })
        }catch(error) {
            console.log(err)
        }
        
    }
}