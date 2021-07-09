const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../config/dbconfig');
require('dotenv').config()
const mailer = require('../services/mail')

function member(){

    router.get('/', (req, res) => {
        const sql = `SELECT * FROM membersdata`
        pool.getConnection((err, con) => {
            if(err){
                throw err
            }
            con.query(sql, (err, response) => {
                con.release()
                console.log(response)
                res.status(200).json({
                    response
                })
            })
        })
    })
   
    router.post('/accesspass', async (req, res) => {
        const data = req.body
        console.log(req.body)
        pool.getConnection((err, con) => {
            if(err){
                res.status(500).json({
                    message: "Internal Server Error",
                    response: err.message
                })
            }else{
                const query = `SELECT * FROM visitors WHERE email = ?`
                con.query(query, data.email,async (err, resposnse) => {
                    if(err){
                        res.status(500).json({
                            message: "Internal Server Error",
                            response: err.message
                        })
                    }else if(resposnse.length > 0.5){
                        try {
                           await mailer.accesspass(data.email)
                        } catch (error) {
                            console.log(error)
                        }
                        res.status(409).json({
                            message: "Access Granted"
                        })
                    }else{

                        const sql = `INSERT INTO visitors SET ? `
                        con.query(sql, data, async (err, result) => {
                            con.release()
                            if(err){
                                res.status(500).json({
                                    message: "Internal Server Error",
                                    response: err.message
                                })
                            }else{
                                console.log(data.email)
                                try {
                                   await mailer.accesspass(data.email)
                                } catch (error) {
                                    console.log(error)
                                }
                                res.status(201).json({
                                    message: "Access Granted"
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

module.exports = member()