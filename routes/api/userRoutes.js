const router = require("express").Router();
const User = require("../../models/User");

// find all users
router.get("/", (req, res) => {
    User.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
// create user
router.post("/", (req, res) => {
    User.create(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
// find user by id
router.get("/:id", (req, res) => {
    User.findOne({ _id: req.params.id })
    .populate("thoughts")
    .populate("friends")
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
// Add friend
router.put("/add/:userId/:friendId", (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId},{$addToSet:{friends:req.params.friendId}},{new:true})
    .populate("friends")
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Update user
router.put("/:userId", (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId},{$set:req.body} ,{new:true,runValidators:true})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete friend
router.put("/remove/:userId/:friendId", (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId},{$pull:{friends:req.params.friendId}},{new:true})
    .populate("friends")
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete user by id
router.delete("/delete/:id", (req, res) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
