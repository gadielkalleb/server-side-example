const express = require('express')
const router = express.Router()

const { home, lista }= require('./routes')

router.use('/home', home)
router.use('/produtos', lista)

module.exports = router
