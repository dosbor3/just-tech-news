//Like the index.js file in the models folder, this file will serve as a means to collect all of the API routes and package them up for us

const router = require('express').Router(); //importing the express server

const userRoutes = require('./user-routes.js'); //importing the userRoutes

router.use('/users', userRoutes);   //prefixing the userRoutes with the /users prefix

module.exports = router;  //after collecting all of the API routes, package them up as User and export them out