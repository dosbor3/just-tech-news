const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create our post model
class Post extends Model {}

// create fields/columns for Post model
Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      post_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      //configuring the metadata, including the naming conventions
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );

  //Exporting the Post model
  module.exports = Post;

  /*
  If this file looks a little familiar, it should—because it closely resembles the User model we created previously.

  Before we can use the Post model, we need to require it in models/index.js and export it there. 

  */