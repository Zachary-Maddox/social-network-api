const router = require('express').Router();
const User = require('../../models/Reaction');

router.get('/', (req, res) => {
  Reaction.find().then( (data) => {
    res.json(data)

  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
})

router.post('/', (req, res) => {
  Reaction.create(req.body).then( (data) => {
    
    res.json(data)

  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
})

router.get('/:id', (req, res) => {
  Reaction.findOne({_id:req.params.id}).then( (data) => {
  
    res.json(data)

  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
})





module.exports = router