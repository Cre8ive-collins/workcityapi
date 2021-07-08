const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../config/dbconfig');
require('dotenv').config()
const mailer = require('../services/mail')

function admin(){
    router.use((req, res, next) => {
        const token = req.headers['token']
        if(!token){
            res.status(401).json({
                message: "UnAuthorized Access",
                eror: 'No token'
            })
        }else{
            jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                if(err){
                    res.status(401).json({
                        message: "UnAuthorized Access"
                    })      
                }else{
                    const id = decoded.id
                    pool.getConnection((err, con) => {
                        if(err){
                            res.status(500).json({
                                message: "Internal Server Error",
                                error: err.message
                            })
                        }else{
                            con.query('SELECT * FROM associates WHERE id = ?', id, (err, result) => {
                                if(err){ 
                                    res.status(500).json({
                                        id: id,
                                        message: "Internal Server Error",
                                        error: err.message
                                    })
                                }else if(result.length == 0 ){
                                    res.status(500).json({
                                        message: "Internal Server Error",
                                        error: "No Result"
                                    })
                                }else{
                                    const currentUser = result[0].name
                                    res.header('user', currentUser)
                                    next()
                                }
                            })
                        }
                    })
                }
            })
        }
    })


    router.get('/all', (req, res) => {
        pool.getConnection((err, con) => {
            if(err){
                res.status(500).json({
                    message: "Internal Server Error",
                    response: err.message
                })
            }else if(con){
                con.query(`SELECT * FROM customerrecord`, (err, results) => {
                    if(err){
                        res.status(500).json({
                            message: "Internal Server Error",
                            response: err.message
                        })
                    }else{
                        res.status(200).json({
                            members : results
                        })
                    }
                })
            }else{
                res.status(500).json({
                    message: "Internal Server Error",
                    response: 'DB ERROR'
                })
            }
    })
})

    router.get('/members', (req, res) => {
        pool.getConnection((err, con) => {
            if(err){
                res.status(500).json({
                    message: "Internal Server Error",
                    response: err.message
                })
            }else{
                con.query(`SELECT * FROM customerrecord`, (err, result) => {
                    if (err){
                        res.status(500).json({
                            message: "Internal Server Error",
                            response: err.message
                        })
                    }else{
                        res.status(200).json({
                            members : result
                        })
                    }
                })
            }
        })
    })
    router.post('/addmember', (req, res) => {
        // res.send(req.headers)
        const data = req.body
        pool.getConnection((err, con) => {
            if(err){
                res.status(500).json({
                    message: "Internal Server Error",
                    response: err.message
                })
            }else{
                const query = `SELECT * FROM customerrecord WHERE email = ?`
                con.query(query, data.email, (err, resposnse) => {
                    if(err){
                        res.status(500).json({
                            message: "Internal Server Error",
                            response: err.message
                        })
                    }else if(resposnse.length > 0.5){
                        res.status(409).json({
                            message: "Email Already Exists"
                        })
                    }else{

                        const sql = `INSERT INTO customerrecord SET ? `
                        con.query(sql, data, (err, result) => {
                            con.release()
                            if(err){
                                res.status(500).json({
                                    message: "Internal Server Error",
                                    response: err.message
                                })
                            }else{
                                console.log(data.email)
                                mailer.membershipmail(data)
                                res.status(201).json({
                                    message: "Created"
                                })
                            }
                        })
                    }
                })
            }
        })

    })
    return router
}

module.exports = admin()