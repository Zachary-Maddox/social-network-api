const router = require('express').Router();
const Thought = require('../../models/Thought');

router.get('/', (req, res) => {
  Thought.find().then( (data) => {
    res.json(data)

  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
})

router.post('/', (req, res) => {
  Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Thought created but no user id matched!' });
        }

        res.json({ message: 'Thought created successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
})

router.get('/:id', (req, res) => {
  Thought.findOne({_id:req.params.id}).then( (data) => {
  
    res.json(data)

  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
})





module.exports = router