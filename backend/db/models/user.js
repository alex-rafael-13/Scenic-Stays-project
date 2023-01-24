'use strict';
const {
  Model,
  Validator,
  Op
} = require('sequelize');

//Import bcrypt
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

  //------------------------ Instance Methods ------------------------//
    //Returns object with the info that is safe to save in the JWT
    toSafeObject() {
      const { id, firstName, lastName, username, email} = this
      return {id, firstName, lastName, username, email}
    };
    
    //Checks if inputed password matches the hashed password
    validatePassword(password){
      return bcrypt.compareSync(password, this.hashedPassword.toString())
    }

  //------------------------ Static Methods ------------------------//
    //Returns the current user
    static getCurrentUserById(id){
      return User.scope('currentUser').findByPk(id);
    }

    //Logs in user if credential and password passes specs
    static async login({credential, password}){
      const user = await User.scope('loginUser').findOne({
        where:{
          [Op.or]:{
            username: credential,
            email: credential
          }
        }
      });

      if(user && user.validatePassword(password)){
        return await User.scope('currentUser').findByPk(user.id)
      }
    }

    //Signs up an user if inputs are valid
    static async signup({firstName, lastName, username, email, password}){
      //hash the password
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      });

      return await User.scope('currentUser').findByPk(user.id);
    }

  //------------------------ Associations ------------------------//
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [2,30],
        isNotEmail(value){
          if(Validator.isEmail(value)){
            throw new Error('Cannot be an email')
          }
        }
      }
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [2,30],
        isNotEmail(value){
          if(Validator.isEmail(value)){
            throw new Error('Cannot be an email')
          }
        }
      }
    },
    username: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        len: [4, 30],
        isNotEmail(value){
          if(Validator.isEmail(value)){
            throw new Error('Cannot be an email')
          }
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope:{
      attributes:{
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes:{
      currentUser:{
        attributes:{
          exclude: ['hashedPassword', 'createdAt', 'updatedAt']
        }
      },
      loginUser:{
        attributes: {}
      }
    }
  });
  return User;
};
