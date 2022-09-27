'use strict';
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'An email is required.',
          },
        },
        isEmail: {
          msg: 'This is not a valid email!',
        },
      },
    password:{
        type:Sequelize.STRING,
        allowNull: false,
        set(val) {
            const hashedPassword = bcrypt.hashSync(val,10);
            this.setDataValue('password',hashedPassword);
        },
    }
  }, { sequelize });

  User.associate = (models) => {
    // TODO Add associations.
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };


  return User;
};