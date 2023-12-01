const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000


app.use(express.json())
app.use(morgan('dev'))


const coworkingRouter = require('./routes/coworkingRoutes')

app.use('/api/coworkings', coworkingRouter)


app.listen(port, ()=>{
    console.log(`L' app d'exemple écoute le port ${port}`)
})
