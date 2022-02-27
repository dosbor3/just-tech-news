/*
Let's start by creating an index.js file in the models folder. This file will become more important as we create more models, but for now it'll just be for collecting and exporting the User model data. For now, the index.js file should look like the following code:
*/


const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

// create associations ~ One to Many User to Post
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//Many to One Many Posts belong to One user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

//User can vote for many posts
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
  });
  
  //post
  Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
  });
  Vote.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  Vote.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
  User.hasMany(Vote, {
    foreignKey: 'user_id'
  });
  
  Post.hasMany(Vote, {
    foreignKey: 'post_id'
  });


  module.exports = { User, Post, Vote };

/*
All this file is responsible for right now is importing the User model and exporting an object with it as a property. It seems unnecessary at the moment, but doing this now will set us up for future growth of the application.

Notice the syntax. We instruct the application that the User and Post models will be connected, but in this case through the Vote model. We state what we want the foreign key to be in Vote, which aligns with the fields we set up in the model. We also stipulate that the name of the Vote model should be displayed as voted_posts when queried on, making it a little more informative.
*/