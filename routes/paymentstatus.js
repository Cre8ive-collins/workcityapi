const express = require('express');
const pool = require('../config/dbconfig');
const router = express.Router();
const auth = require('../middlewares/auth')


const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function dateDiffInDays(a, b) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function paymentstatus(){

    router.use(auth)
    
    router.get('/', (req,res) => {
        pool.getConnection((err, con) => {
            if(err){
                res.status(500).json({
                    message: 'Internal server error',
                    error: err.message
                })
            }else{
                con.query('SELECT * FROM customerrecord', (err, results) => {
                    if(err){
                        res.status(500).json({
                            message: 'Internal server error',
                            error: err.message
                        })
                    }else{
                        let active = []
                        let inactive = []
                        let due = []
                        for(let i = 0; i<results.length; i++){
                            if(dateDiffInDays(new Date(), new Date(results[i].enddate)) < -30 ){
                                inactive.push(results[i])
                            }
                            if(dateDiffInDays(new Date(), new Date(results[i].enddate)) < -5 ||  dateDiffInDays(new Date(), new Date(results[i].enddate)) < 5){
                                due.push(results[i])
                            }
                            if(dateDiffInDays(new Date(), new Date(results[i].enddate)) > 0 ){
                                active.push(results[i])
                            }
                        }
                        console.log(dateDiffInDays(new Date(), new Date(results[0].enddate)))
                        res.status(200).json({
                            inactive,
                            due, 
                            active
                        })
                    }
                })
            }
        })
    })

    return router
}

module.exports = paymentstatus()