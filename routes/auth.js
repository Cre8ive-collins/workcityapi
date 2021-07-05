const express = require('express')
const router = express.Router();
const pool = require('../config/dbconfig')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


function auth(){
    
    router.get('/', (req, res) => {
        res.status(200).json({
            'message': 'Get /orders'
        })
    })

    router.post('/login', (req, res) => {
        const data = req.body
        pool.getConnection((err, con) => {
            if(err){
                res.status(500).json({
                    message: "Internal Server Error",
                    response: err.message
                })
            }else{
                // console.log(data)
                con.query('SELECT * FROM associates WHERE email = ?', (data.email), (err, user) => {
                    if(err){
                        res.status(500).json({
                            message: "Internal Server Error",
                            response: err.message
                        })
                    }else if (user.length < 0.5){
                        res.status(403).json({
                            path: 'email',
                            message: 'Incorect Email or Password'
                        })
                    }else{
                        bcrypt.compare(data.password, user[0].password, (err, passed) => {
                            if(err) {
                                res.status(403).json({
                                    message: 'Incorect Email or Password'
                                })
                            }else if(passed){
                                const token = jwt.sign({id: user[0].id}, process.env.TOKEN_SECRET)
                                res.status(200).json({
                                    message: 'good credentials',
                                    token: token
                                })
                            }else{
                                res.status(403).json({
                                    path: 'pass',
                                    message: 'Incorect Email or Password'
                                })
                            }
                        })
                    }
                })
            }
        })
    })

    router.post('/register', (req, res) => {
        const data = req.body
        pool.getConnection((err, con) => {
            if(err){
                res.status(500).json({
                    message: "Internal Server Error"
                })
            }else{
                con.query('SELECT * FROM associates WHERE email = ?', (data.email), (err, result) => {
                    if(err){
                        res.status(500).json({
                            message: "Internal Server Error",
                            response: err.code,
                            error_message: err.message
                        })
                    }else if (result.length > 0.5){
                        res.status(409).json({
                            message: "Email Already Exists"
                        })
                    }else{
                        bcrypt.genSalt(10, (err, salt)=> {
                            bcrypt.hash(req.body.password, salt, (err, hash) => {
                                data.password = hash
                                const sql = 'INSERT INTO associates SET ?'
                                con.query(sql, (data), (err, result) => {
                                    con.release()
                                    if(err){
                                        res.status(500).json({
                                            // message: "Internal Server Error"
                                            response: err.code,
                                            message: err.message, 
                                            formBody: data
                                        })
                                    }else{
                                        res.status(200).json({
                                            message: "User Added Successfully"
                                        })
                                    }
                                })
                            })
                        })
                    }
                })
              
            }
        })
    })

    return router
}

module.exports = auth()