const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../config/dbconfig');
require('dotenv').config()
const mailer = require('../services/mail')
const auth = require('../middlewares/auth')

function admin(){
    
    router.use(auth)

    router.post('/test', (req, res) => {
        res.status(200).json(
            req.body
        )
    })

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

    // router.delete('/delete', (req, res) => {
    //     const {id} = req.body
    //     pool.getConnection((err, con) => {
    //         if(err){
    //             res.status(500).json({
    //                 message: "Internal server error",
    //                 error: err.message
    //             })
    //         }else{
    //             con.query(`DELETE FROM customerrecord WHERE id = ${id}` , (err, result) => {
    //                 con.release()
    //                 if(err){
    //                     res.status(500).json({
    //                         message: "Internal server error",
    //                         error: err.message
    //                     })
    //                 }else{
    //                     console.log(result)
    //                     res.status(204).json({
    //                         message: "Member Deleted"
    //                     })
    //                 }
    //             })
    //         }
    //     })
    // })

    router.post('/update', (req, res) => {
        const {id} = req.body
        pool.getConnection((err, con) => {
            if(err){
                res.status(500).json({
                    message: "Internal server error",
                    error: err.message
                })
            }else{
                con.query(`SELECT * FROM customerrecord WHERE email = '${req.body.email}'`, (err, result) => {
                    if(err){
                        res.status(500).json({
                            message: "Internal server error",
                            error: err.message
                        })
                    }else if(result.length > 0.5){
                        res.status(422).json({
                            message: "Email already exists"
                        })
                    }else{
                        const data = req.body
                        const sql = `
                            UPDATE customerrecord SET
                            fullname = "${req.body.fullname}",
                            email = "${req.body.email}",
                            phonenumber = "${req.body.phonenumber}",
                            businessname = "${req.body.businessname}",
                            amount = "${req.body.amount}",
                            enddate = "${req.body.enddate}",
                            plan = "${req.body.plan}",
                            businessprofile = "${req.body.businessprofile}"
                            WHERE id = ${id}
                        `
                        con.query(sql, (err, result) => {
                            if(err){
                                res.status(500).json({
                                    message: "Internal server error",
                                    error: err.message
                                })
                            }else{
                                con.release()
                                res.status(200).json({
                                    message: "Member data updated"
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
