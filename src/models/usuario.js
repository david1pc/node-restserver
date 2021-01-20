const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const ROLES = {
    values: ['admin', 'user']
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },

    password: {
        type: String,
        require: [true, 'La contraseña es obligatoria']
    },

    img: {
        type: String,
        require: false
    },

    role: {
        type: String,
        enum: ROLES,
        default: 'user',
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    }
})

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })

module.exports = model('Usuario', usuarioSchema)