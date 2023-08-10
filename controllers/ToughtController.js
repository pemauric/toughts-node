const User = require('../models/User')

const Tought = require('../models/Tought')

module.exports = class ToughtController {
    static async showAll(req, res) {
        
        res.render('toughts/home')

    }

    static async dashboard(req, res) {
        
        const userId = req.session.userId

        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Tought,
            plain: true,
        })

        if (!user) {
            res.redirect('/login')
        }

        const toughts = user.Toughts.map((result) => result.dataValues)

        console.log(toughts)
        
        res.render('toughts/dashboard', { toughts })
        
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

    static async removeToughts(req, res) {
        const id = req.body.id

        try {
            
            await Tought.destroy({
                where: {
                    id: id,
                    UserId: req.session.userId
                }
            })

            req.flash('message', 'Pensamento removido com sucesso!')

            req.session.save(()=> {
                res.redirect('/toughts/dashboard')
            })

        }catch(error) {
            console.log(error)
        }
    }
}