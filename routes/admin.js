const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../config/dbconfig');
require('dotenv').config()
const mailer = require('../services/mail')
const auth = require('../middlewares/auth')

function admin(){
    
    router.use(auth)

    router.get('/filter', (req, res) => {
        const filterparam = req.query.filterby
        const sql = `SELECT * FROM customerrecord WHERE plan = ${filterparam}`
        pool.getConnection((err, con) => {
            if(err){
                res.status(500).json({
                    message: "Internal Server Error",
                    response: err.message
                })
            }else{
                con.query(sql, (err, result) => {
                     con.release()
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
    router.get('/members', (req, res) => {
        pool.getConnection((err, con) => {
            if(err){
                res.status(500).json({
                    message: "Internal Server Error",
                    response: err.message
                })
            }else{
                con.query(`SELECT * FROM customerrecord`, (err, result) => {
                    con.query(`SELECT * FROM customerrecord WHERE plan = 'SD'`, (err, SD) => {
                        con.query(`SELECT * FROM customerrecord WHERE plan = 'VO'`, (err, VP) => {
                            con.query(`SELECT * FROM customerrecord WHERE plan = 'PO'`, (err, PO) => {
                                con.release()
                                if (err){
                                    res.status(500).json({
                                        message: "Internal Server Error",
                                        response: err.message
                                    })
                                }else{
                                    res.status(200).json({
                                        members : result,
                                        SD : SD,
                                        VP: VP,
                                        PO: PO
                                    })
                                }
                            })
                        })
                    })
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
