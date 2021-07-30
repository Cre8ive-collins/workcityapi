const express = require('express');
const pool = require('../config/dbconfig');
const router = express.Router();
const auth = require('../middlewares/auth')


function paymentstatus(){

    router.use(auth)

    router.delete('/', (req, res) => {
        const {id} = req.body
        pool.getConnection((err, con) => {
            if(err){
                res.status(500).json({
                    message: "Internal server error",
                    error: err.message
                })
            }else{
                con.query(`DELETE FROM customerrecord WHERE id = ${id}` , (err, result) => {
                    con.release()
                    if(err){
                        res.status(500).json({
                            message: "Internal server error",
                            error: err.message
                        })
                    }else{
                        console.log(result)
                        res.status(204).json({
                            message: "Member Deleted"
                        })
                    }
                })
            }
        })
    })

    router.post('/', (req, res) => {
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

module.exports = paymentstatus()