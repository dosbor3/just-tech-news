const router = require('express').Router();

//First, import the necessary modules and models into home-routes.js by adding the following lines of code:
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');



router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // pass a single post object into the homepage template
      console.log(dbPostData[0]);
      //We need the entire array of posts to be in the template. That also means we'll need to serialize the entire array.
      const posts = dbPostData.map(post => post.get({ plain: true }));//You didn't need to serialize data before when you built API routes, because the res.json() method automatically does that for you
      
      
      /*
      
    
      This will loop over and map each Sequelize object into a serialized version of itself, saving the results in a new posts array. Now we can plug that array into the template. However, even though the render() method can accept an array instead of an object, that would prevent us from adding other properties to the template later on. To avoid future headaches, we can simply add the array to an object and continue passing an object to the template.

      Update the render() method so it matches what's shown in the following code:

      res.render('homepage', { posts });  

      */  
      
      res.render('homepage',{posts}); 
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;

/*
Previously, we used res.send() or res.sendFile() for the response. Because we've hooked up a template engine, we can now use res.render() and specify which template we want to use. In this case, we want to render the homepage.handlebars template (the .handlebars extension is implied). This template was light on content; it only included a single <div>. Handlebars.js will automatically feed that into the main.handlebars template, however, and respond with a complete HTML file.

*/