const jwt = require('jsonwebtoken')
const pool = require('../config/dbconfig')

module.exports = ((req, res, next) => {
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