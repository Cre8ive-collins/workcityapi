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
        msg: 'Index route'
    })
})

const paymentstatus = require('./routes/paymentstatus')
app.use('/status', paymentstatus)

const auth = require('./routes/auth')
app.use('/auth', auth)

const admin = require('./routes/admin')
app.use('/admin', admin)

const member = require('./routes/member')
app.use('/member', member)

const modify = require('./routes/modify')
app.use('/modify', modify)

// INVALID ROUTES HANDLINGS 

app.use((req, res, next) => {
    const err = new Error('Invalid Route')
    err.status = 404
    next(err)
  })
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      error: {
        message : err.message
      }
    })
  })



app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
