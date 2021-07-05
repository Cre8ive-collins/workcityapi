const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../config/dbconfig');
require('dotenv').config()
const mailer = require('../services/mail')

function admin(){

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
   
    router.post('/', (req, res) => {
        const data = req.body
        pool.getConnection((err, con) => {
            if(err){
                res.status(500).json({
                    message: "Internal Server Error",
                    response: err.message
                })
            }else{
                const query = `SELECT * FROM membersdata WHERE email = ?`
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

                        const sql = `INSERT INTO membersdata SET ? `
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