const express = require('express');
const pool = require('../config/dbconfig');
const router = express.Router();
const auth = require('../middlewares/auth')


function paymentstatus(){

    router.use(auth)

    router.get('/', (req, res) => {
        res.status(200).json({
            message: "welcomre "
        })
    })

    
    return router
}

module.exports = paymentstatus()