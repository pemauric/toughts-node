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
            const createdUser = await User.create(user)

            req.session.userid = createdUser.id
            
            req.flash('message', 'Cadastro realizado com sucesso!')

            console.log(createdUser.id)

            req.session.save(() => {
                res.redirect('/')
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}