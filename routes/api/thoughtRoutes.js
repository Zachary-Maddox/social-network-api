const router = require('express').Router();
const Thought = require('../../models/Thought');
const User = require('../../models/User');
const Reaction = require('../../models/Reaction');

// find all thoughts
router.get('/', (req, res) => {
  Thought.find().then( (data) => {
    res.json(data)

  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
})
// create Thought
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
// find thought by id
router.get('/:id', (req, res) => {
  Thought.findOne({_id:req.params.id}).then( (data) => {
  
    res.json(data)

  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
})

// Update thought by Id
router.put("/update/:thoughtId", (req, res) => {
  Thought.findOneAndUpdate({ _id: req.params.thoughtId},{$set:req.body} ,{new:true,runValidators:true})
      .then((data) => {
          res.json(data);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});

// delete a thought by id
router.delete("/delete/:id", (req, res) => {
  Thought.findOneAndDelete({ _id: req.params.id })
      .then((data) => {
          res.json(data);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});

// add a reaction to thought
router.put("/add/:thoughtId/:reactionId", (req, res) => {
  Thought.findOneAndUpdate({ _id: req.params.thoughtId},{$set:req.body} ,{new:true,runValidators:true})
      .then((data) => {
          res.json(data);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});

// remove reaction from thought
router.put("/remove/:thoughtId/:reactionId", (req, res) => {
  Thought.findOneAndUpdate({ _id: req.params.thoughtId},{$pull:{reaction:req.params.reactionId}},{new:true})
      .then((data) => {
          res.json(data);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router