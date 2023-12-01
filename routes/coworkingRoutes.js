const express = require('express')
let mockCoworkings = require('../mock-coworking')
const router = express.Router()

router
    .route('/')
    .get((req, res) => {
        res.json(mockCoworkings)
    })
    .post((req, res) => { 
        const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
        let coworking = { id: newId, ...req.body}
    
        mockCoworkings.push(coworking)
    
        const result = {message: 'Le coworking a bien été ajouté', data: coworking}
        res.json(result)
    })

router
    .route('/:id')
    .get((req, res) => {
        const urlId = parseInt(req.params.id)
        let result = mockCoworkings.find(el => el.id === urlId)
    
        result = result ? result : `Aucun élément ne correspond à l'id n°${urlId}`
    
        res.json(result)
    })
    .put((req, res) => {
        const coworking = mockCoworkings.find(el => el.id === parseInt(req.params.id))
    
        let result
        if (coworking){
            const newCoworking = {...coworking, ...req.body}
            const index = mockCoworkings.findIndex(el => el.id === parseInt(req.params.id))
            mockCoworkings[index] = newCoworking
            result = {message: `Coworking modifié avec succès`, data : newCoworking}
        } else {
            result = {message: `Le coworking n'existe pas`, data : {}}
        }
        
        res.json(result)
    })
    .delete((req, res) => {
        let coworking = mockCoworkings.find((el) => el.id === parseInt(req.params.id))   
    
        let result
        if (coworking){
            mockCoworkings = mockCoworkings.filter(el => el.id !== coworking.id)
            result = {message: 'Coworking supprimé avec succès', data: coworking }
        } else {
            result = {message: `Le coworking n'existe pas`}
        }
    
        res.json(result)
    })

module.exports = router