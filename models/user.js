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
      validate:{
        notNull:{
            msg:'First Name is required.',
        },
        notEmpty: {
            msg: 'First Name cannot be empty.'
        }
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate:{
        notNull:{
            msg:'Last Name is required.',
        },
        notEmpty: {
            msg: 'Last Name cannot be empty.'
        }
      },
    },
    emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:{
            msg:"This email already exists!",
        },
        validate: {
          notNull: {
            msg: 'An email is required.',
          },
          notEmpty: {
            msg: 'Email cannot be empty.'
        },
          isEmail: {
            msg: 'This is not a valid email!',
          }
        },
      },
    password:{
        type:Sequelize.STRING,
        allowNull: false,
        set(val) {
            const hashedPassword = bcrypt.hashSync(val,10);
            this.setDataValue('password',hashedPassword);
        },
        validate:{
            notNull:{
                msg:'A password is required.',
            },
            notEmpty: {
                msg: 'Password cannot be empty.'
            }
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