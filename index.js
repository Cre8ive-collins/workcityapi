const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const pool = require('./config/dbconfig')
const port = 3000
const prefix = '/api/v1'

const app = express()
app.use(cors())
app.use(morgan('combined'))
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get(`${prefix}`, (req, res) => {
    // res.send(`${prefix}/${port}`)
    res.status(200).json({
        msg: 'Index route'
    })
})

app.post(`${prefix}/workcity`, (req, res) => {
    pool.getConnection((err, con) => {
        if(err){
            console.log(err)
        }else{
            console.log('db connected')
        }
    } )
    const data = req.body
    console.log(data)
    res.status(200).json(data)
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
