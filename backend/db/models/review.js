'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Creating association to spot
      Review.belongsTo(
        models.Spot, {
          foreignKey: 'spotId'
        }
      );
      //Creating association to user
      Review.belongsTo(
        models.User, {
          foreignKey: 'userId'
        }
      );

      //Creating association to reviewImage
      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId'
      });

    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
