const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    
    static async login(req, res) {
        res.render('auth/login');
    }

    static async register(req, res) {
        res.render('auth/register');
    }

    static async registerPost(req, res) {
        const {name, email, password, confirmpassword} = req.body

        if (password != confirmpassword) {
            req.flash('message', 'A senhas nao conferem, tente novamente!')
            res.render('auth/register');
            
            return
        }

        const checkIfUserExists = await User.findOne({where: {email: email}})

        if (checkIfUserExists) {
            req.flash('message', 'E-mail ja cadatrado, tente outro endereco')
            res.render('auth/register');
            
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            
            User.create(user)
            
            .then((user) => {
                
                req.session.userId = user.id

                req.flash('message', 'Usuario criado com sucesso!')
                
                console.log(user.id)

                req.session.save(() => {
                    res.redirect('/')
                })
            })
            .catch((err) => {
                console.log(err)
            })

        }
        catch (err) {
            console.log(err)
        }
    }

    static async logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}