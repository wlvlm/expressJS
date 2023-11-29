const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

let mockCoworkings = require('./mock-coworking')

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.json(`<h1>Page d'accueil</h1><br>
    <a href="/about">A propos</a>`)
})

app.post('/api/coworkings', (req, res) => {
    
    const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
    let coworking = { id: newId, ...req.body}

    mockCoworkings.push(coworking)

    const result = {message: 'Le coworking a bien été ajouté', data: coworking}
    res.json(result)
})

app.get('/api/coworkings', (req, res) => {
    res.json(mockCoworkings)
})

app.get('/api/coworkings/:id', (req, res) => {
    const urlId = parseInt(req.params.id)
    let result = mockCoworkings.find(el => el.id === urlId)

    result = result ? result : `Aucun élément ne correspond à l'id n°${urlId}`

    res.json(result)
})

app.put('/api/coworkings/:id', (req, res) => {
    const coworking = mockCoworkings.find((el) => el.id === parseInt(req.params.id))    

    let result
    if (coworking){
        coworking.superficy = req.body.superficy
        result = {message: 'Coworking modifié avec succès', data : {coworking}}
    } else {
        result = {message: `Le coworking n'existe pas`, data : {}}
    }
    
    res.json(result)
})

app.delete('/api/coworkings/:id', (req, res) => {
    const coworking = mockCoworkings.find((el) => el.id === parseInt(req.params.id))   

    let result
    if (coworking){
        mockCoworkings = mockCoworkings.filter(el => el.id !== coworking.id)
        result = {message: 'Coworking supprimé avec succès', data: coworking }
    } else {
        result = {message: `Le coworking n'existe pas`}
    }

    res.json(result)
})

app.listen(port, ()=>{
    console.log(`L' app d'exemple écoute le port ${port}`)
})
