'use strict';
const {
  Model
} = require('sequelize');
const spotimage = require('./spotimage');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Association to Users for ownerId
      Spot.belongsTo(
        models.User, {
          foreignKey: 'ownerId'
        }
      );

      //Associating Spot Images
      Spot.hasMany(models.SpotImage,{
        foreignKey: 'spotId'
      });
      
      //Connecting association to Booking
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId'
      })


    }
  }
  Spot.init({
    ownerId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type:DataTypes.STRING,
      allowNull: false
    },
    city: {
      type:DataTypes.STRING,
      allowNull: false
    },
    state: {
      type:DataTypes.STRING,
      allowNull: false
    },
    country: {
      type:DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type:DataTypes.DECIMAL,
      allowNull: false,
      validate:{
        min: -90,
        max: 90
      }
    },
    lng: {
      type:DataTypes.DECIMAL,
      allowNull: false,
      validate:{
        min: -180,
        max: 180
      }
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [2, 50]
      }
    },
    description: {
      type:DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type:DataTypes.DECIMAL,
      allowNull: false,
      validate:{
        min: 0
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};