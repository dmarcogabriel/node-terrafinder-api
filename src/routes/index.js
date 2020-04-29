const {Router} = require('express')

const router = Router()

router.use(function (req, res, next){


  next()
})

router.get('/', (req, res) => res.status(200).json({message:'Route test Ok'}))

module.exports = router