const express = require('express')

const app = express()

const Usuario = require('../models/usuario')

const bcrypt = require('bcrypt')

const _ = require('underscore')

const bodyParser = require('body-parser')

const { verificarToken, verificarAdminRole } = require('../middlewares/autenticacion')
const { json } = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/usuario', verificarToken, (req, res) => {

    let desde = Number(req.query.desde)

    let limite = Number(req.query.limite)

    Usuario.find({ estado: true })
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.countDocuments({ estado: true }, (err, cantidad) => {
                res.json({
                    ok: true,
                    usuarios,
                    cantidadUsuarios: cantidad
                })
            })
        })
})

app.post('/usuario', [verificarToken, verificarAdminRole], function(req, res) {

    let usuarioDb = req.body

    let usuario = new Usuario({
        nombre: usuarioDb.nombre,
        email: usuarioDb.email,
        password: bcrypt.hashSync(usuarioDb.password, 10),
        role: usuarioDb.role
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });


})

app.put('/usuario/:id', [verificarToken, verificarAdminRole], function(req, res) {

    let id = req.params.id

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'estatus', 'role'])

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuarioDb
        })
    })
})

app.delete('/usuario/:id', [verificarToken, verificarAdminRole], function(req, res) {
    let id = req.params.id;

    let estado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, estado, { new: true }, (err, usuario) => {
        if (err) {
            return res.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            estadoUsuario: usuario
        })

    })

    /*
    Usuario.findByIdAndRemove(id, (err, usuarioDb) => {
        if (err) {
            return res.json({
                ok: false,
                err
            })
        }

        if (usuarioDb === null) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            message: 'Usuario eliminado',
            usuario: usuarioDb
        })

    })
    */
})

module.exports = app