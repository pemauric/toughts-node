const User = require('../models/User')

const Tought = require('../models/Tought')

const { Op } = require('sequelize')

module.exports = class ToughtController {
    static async showAll(req, res) {
        
        let search = ""

        if(req.query.search){
            search = req.query.search
        }

        let order = "DESC"

        if(req.query.order === "old"){
            order = "ASC"
        } else {
            order = "DESC"
        }

        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: {[Op.like]: `%${search}%`},
            },
            order: [['createdAt', order]],   
        })
        
        const toughts =toughtsData.map((result) => result.get({plain: true}))

        let toughtsQty = toughts.length

        if(toughtsQty === 0){
            toughtsQty = false
        }
    
        res.render('toughts/home', { toughts, search, toughtsQty})

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

        let emptyToughts = false

        if(toughts.length === 0) {
            emptyToughts = true
        }
        
        res.render('toughts/dashboard', { toughts, emptyToughts })
        
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

    static async editToughts(req, res) {
        const id = req.params.id
    
        const tought = await Tought.findOne({
            where: {
                id: id,
            },
            raw: true
        })
    
        res.render('toughts/edit', { tought })
    }

    static async editToughtsSave(req, res) {
        const id = req.body.id;
        
        const updatedTought = {
            title: req.body.title,
        };
    
        try {
            await Tought.update(updatedTought, {
                where: {
                    id: id,
                }
            });
    
            req.flash('message', 'Pensamento alterado com sucesso');
    
            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            });
        } catch (error) {
            console.log(error)
        }
    }
}