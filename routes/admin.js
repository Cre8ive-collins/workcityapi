const express = require('express')
const router = express.Router();


function admin(){
    
    router.get('/', (req, res) => {
        res.status(200).json({
            'message': 'Get /orders'
        })
    })

    router.post('/login', (req, res) => {
        const data = req.body
        const request = req
        res.status(201).json({
            formBody: data
        })
    })

    router.get('/:ordrId', (req, res) => {
        res.status(200).json({
            'message': 'Get /orders/one'
        })
    })

    router.post('/orderId', (req, res) => {
        res.status(201).json({
            'message': 'post /orders/one'
        })
    })

    return router
}

module.exports = admin()