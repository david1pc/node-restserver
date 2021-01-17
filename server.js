const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('./src/config/config')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/usuario', function(req, res) {
    res.json({ message: 'Get Usuario' })
})

app.post('/usuario', function(req, res) {
    let body = req.body

    if (body.name === undefined) {
        res.status(400).json({
            ok: false,
            message: 'Post request is not complete'
        })
    } else {
        res.json({ Persona: body })
    }
})

app.put('/usuario/:id', function(req, res) {
    res.json({ message: 'Put Usuario' })
})

app.delete('/usuario/:id', function(req, res) {
    res.json({ message: 'Delete Usuario' })
})

app.listen(process.env.PORT, () => {
    console.log(`Escuchando peticiones desde el puerto ${process.env.PORT}`)
})