'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  Course.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull:false,
      validate:{
        notNull:{
            msg: 'Course title cannot be empty.'
        }
      }
    },
    description: {
      type: Sequelize.STRING,
      allowNull:false,
      validate:{
        notNull: {
            msg:'Course description cannot be empty.'
        }
      }
    },
    estimatedTime: {
        type: Sequelize.STRING,
    },
    materialsNeeded: {
        type: Sequelize.STRING,
    },
  }, { sequelize });

  Course.associate = (models) => {
    // TODO Add associations.
    Course.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userId',
        allowNull:false,
        validate:{
            notNull:{
                msg:'Course owner cannot be empty.'
            }
        }
      },
    });
  };

  return Course;
};