//add the router
const router = require("express").Router();
const {User} = require('../../models');



//GET/api/users ---> Retrieves ALL data
router.get('/', (req, res) => {
    //Access our User model and run .findAll() method
    User.findAll({
        //Notice how we now pass an object into the method like we do with the .findOne() method. This
        //time, we've provided an attributes key and instructed the query to exclude the password column. 
        //It's in an array because if we want to exclude more than one, we can just add more.
        attributes: { exclude: ['password'] }           
      })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

//GET/api/users/1
router.get("/:id", (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.params.id
        }
      })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

//POST/api/users
router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email, 
        password: req.body.password
    })
    .then(dbUserData => {
        res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    })
});

//PUT/api/users/1
router.put("/:id", (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.update(req.body, {
        where:{
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({message: 'No user found with this id '});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });    
});

//DELETE/api/users/1            DELETE/destroy
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found that this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;