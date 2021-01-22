const express = require('express')

const app = express()

const Usuario = require('../models/usuario')

const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/login', (req, res) => {

    let body = req.body

    Usuario.findOne({ email: body.email }, (err, usuarioDb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!usuarioDb) {
            return res.status(400).json({
                ok: false,
                message: '(Usuario) o contraseña incorrectos'
            })
        }

        if (!bcrypt.compareSync(body.password, usuarioDb.password)) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario o (contraseña) incorrectos'
            })
        }

        let token = jwt.sign({
            usuario: usuarioDb,
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

        res.json({
            ok: true,
            usuario: usuarioDb,
            token
        })

    })
})

module.exports = app