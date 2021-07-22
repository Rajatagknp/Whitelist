const router = require('express').Router();


router.use('/providers',require('./providers'))
router.use('/login',require('./login'))




module.exports = router