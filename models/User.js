const {Model, DataTypes} = require("sequelize");    //getting the Model class and DataTypes object from sequelize
const sequelize = require("../config/connection");  //retrieve the sequelize constructor from the connection.js file located in the config folder
const bcrypt = require("bcrypt"); //importing the bcrypt package

// This Model class is what we create our own models from using the extends keyword so User inherits all of 
// the functionality the Model class has.
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}


// Once we create the User class, we use the .init() method to initialize the model's data and configuration, passing 
// in two objects as arguments. The first object will define the columns and data types for those columns. The second 
// object configures certain options for the table. Learn more in the Sequelize documents for model configuration 
// (Links to an external site.)
User.init(
    {
      // define an id column
      id: {
        // use the special Sequelize DataTypes object provide what type of data it is
        type: DataTypes.INTEGER,
        // this is the equivalent of SQL's `NOT NULL` option
        allowNull: false,
        // instruct that this is the Primary Key
        primaryKey: true,
        // turn on auto increment
        autoIncrement: true
      },
      // define a username column
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // define an email column
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // there cannot be any duplicate email values in this table
        unique: true,
        // if allowNull is set to false, we can run our data through validators before creating the table data
        validate: {
          isEmail: true
        }
      },
      // define a password column
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // this means the password must be at least four characters long
          len: [4]
        }
      }
    },
    {
      hooks: {
        // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        // set up beforeUpdate lifecycle "hook" functionality
        async beforeUpdate(updatedUserData) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        }
    },
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
    
        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
      }
    );


// Lastly, export the newly created model so we can use it in other parts of the app. However, before we get there, we need 
// to define the data!
module.exports = User;





