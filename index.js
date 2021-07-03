const express = require('express')
const cors = require('cors')
const pool = require('./config/dbconfig')
const port = 3000
const prefix = ''
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use((req, res ,next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
    if (req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', '*')
      return res.status(200).json({})
    }
  })

app.get(`${prefix}`, (req, res) => {
    // res.send(`${prefix}/${port}`)
    res.status(200).jsonp({
        msg: 'Index route',
        host: process.env.HOST,
        host: process.env.HOST,
        user: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DB,

    })
})

const admin = require('./routes/admin')
app.use('/admin', admin)

app.get(`${prefix}/workcity`, (req, res) => {
    pool.getConnection((err, con) => {
        if(err){
            console.log(err)
            res.send(err)
        }else{
            console.log('db connected')
            // const data = req.body
            // console.log(data)
            res.status(200).json({
                msg: 'another route'
            })
        }
    } )
})



app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
