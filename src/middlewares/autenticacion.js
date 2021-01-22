const jwt = require('jsonwebtoken')
const _ = require('underscore')

let verificarToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                err
            })
        }

        req.usuario = decoded.usuario

        next()
    })
}

let verificarAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (!_.isEqual(usuario.role, "admin")) {
        return res.json({
            message: 'No tiene permisos para realizar este servicio'
        })
    }

    next()
}

module.exports = {
    verificarToken,
    verificarAdminRole
}