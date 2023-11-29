const express = require('express')
const app = express()
const port = 3000

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
    // console.log(arrNames[req.params.id].name)
    // let result = "not found";
    const urlId = parseInt(req.params.id)

    // arrNames.forEach((obj, index) => {
    //     if(obj.id === urlId){
    //         result = arrNames[index].name
    //     }
    // })

    let result = arrNames.find(el => el.id === urlId).name

    if(!result){
        result = "Not found"
    } else {
        result = result.name
    }

    res.send(result)
})

app.listen(port, ()=>{
    console.log(`L' app d'exemple écoute le port ${port}`)
})
