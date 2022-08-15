const router = require('express').Router();
const User = require('../../models/User');

router.get('/', (req, res) => {
  User.find().then( (data) => {
    res.json(data)

  }) 
})







module.exports = router