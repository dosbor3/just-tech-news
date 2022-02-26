/*
Let's start by creating an index.js file in the models folder. This file will become more important as we create more models, but for now it'll just be for collecting and exporting the User model data. For now, the index.js file should look like the following code:
*/


const User = require('./User');

module.exports = { User };

/*
All this file is responsible for right now is importing the User model and exporting an object with it as a property. It seems unnecessary at the moment, but doing this now will set us up for future growth of the application.
*/