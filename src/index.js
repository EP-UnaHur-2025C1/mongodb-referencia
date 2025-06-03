const express = require('express')
const conectarDB = require('./config/db')
const routerAutor = require('./routes/autorRoutes')
const routerLibro = require('./routes/libroRoutes')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())

// Rutas
app.use('/autores', routerAutor)
app.use('/libros', routerLibro)

// Conexión a MongoDB
conectarDB()

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})