const app = require('./src/routes/usuario.routes')
require('./src/config/config')
const mongoose = require('mongoose');

mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(res => console.log('Database is connected'))
    .catch(err => console.log(err))

app.listen(process.env.PORT, () => {
    console.log(`Escuchando peticiones desde el puerto ${process.env.PORT}`)
})