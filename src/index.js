import express from 'express'
import cors from 'cors'
import alumnosRoutes from './routes/alumnos.routes.js'
import indexRoutes from './routes/index.alumnos.js'

const app = express()

app.use(cors());
app.use(express.json())

app.use(indexRoutes)
app.use('/api', alumnosRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not Fund'
    })
})

app.listen(3000)

console.log('Server corriendo en el puerto 3000')