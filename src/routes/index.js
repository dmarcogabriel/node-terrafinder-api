const { Router } = require('express')
const https = require('https')

const router = Router()

router.use(function (req, res, next){
  if (req.method === 'POST') {
    console.log('Create array of logs')
  }
  
  next()
})

router.get('/', (req, res) => res.status(200).json({ message:'Route test Ok' }))

module.exports = router