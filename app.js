const express = require('express')
const app = express()
const port = 3000

const mockCoworkings = require('./mock-coworking')

const arrNames = [
    {

        id: 12,
        name: 'William',
        age: '22'

    }, {

        id: 15,
        name: 'Paul',
        age: '35'

    }, {

        id: 6,
        name: 'Mathieu',
        age: '19'

    }
]

app.get('/', (req, res) => {
    res.send(`<h1>Page d'accueil</h1><br>
    <a href="/about">A propos</a>`)
})

app.get('/about', (req, res) => {
    res.send(`<h1>A propos</h1><br>
    <a href="/">Accueil</a>`)
})

app.get('/names', (req, res) => {
    let sentence = ''
    arrNames.forEach((name) => {
        sentence += name + " "
    })

    res.send(sentence)
})

app.get('/names/:id', (req, res) => {
    const urlId = parseInt(req.params.id)
    let result = arrNames.find(el => el.id === urlId).name

    result = result ? result.name : "Not found"

    res.send(result)
})

app.get('/api/coworkings', (req, res) => {
    let result = `Il y a ${mockCoworkings.length} coworkings dans la liste.`

    
    res.send(result)
})

app.get('/api/coworkings/:id', (req, res) => {
    const urlId = parseInt(req.params.id)
    let result = mockCoworkings.find(el => el.id === urlId)

    result = result ? result : `Aucun élément ne correspond à l'id n°${urlId}`

    res.send(result)
})

app.listen(port, ()=>{
    console.log(`L' app d'exemple écoute le port ${port}`)
})
