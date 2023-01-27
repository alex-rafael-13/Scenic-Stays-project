'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    //Method to find preview images only
    async findPreviewImages(id){
      //get SpotImage model
      const SpotImage = this.sequelize.models.SpotImage
      const images = await SpotImage.findOne({
        where:{
          spotId: id,
          preview: true
        },
        attributes: ['url']
      });

      if(!images){
        return "Preview image not set"
      }

      return images.url
    }




    static associate(models) {
      //Association to Users for ownerId
      Spot.belongsTo(
        models.User, {
          foreignKey: 'ownerId',
          as: 'Owner'
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

      //Connecting associationg to Review
      Spot.hasMany(models.Review, {
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
