'use strict';

const e = require('express');
const express = require('express');
const bcrypt = require('bcrypt');
const { authenticateUser } = require('./middleware/auth-user');
const {asyncHandler}=require('./middleware/async-handler')
// Construct a router instance.
const router = express.Router();
const User = require('./models').User;
const Course = require('./models').Course;


// Route that returns the authenticated user
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
  
    res.json({
        id:user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        emailAddress: user.emailAddress,
    });
  }));
  
// Route that creates a new user.
router.post('/users', asyncHandler(async (req,res) => {
    try{
        console.log(req.body);
        await User.create(req.body);
        res.location('/');
        res.status(201).end();
    } catch(error){
        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors })
        }
        else{
            throw error;
        }
    }
}));

router.get('/courses',asyncHandler(async (req,res)=>{
    const courses = await Course.findAll({
        attributes: [
            "description",
            "title",
            "userId",
            "materialsNeeded",
            "estimatedTime",
        ],
        include: [
            {
                model: User,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            },
        ],
    });
    res.status(200).json(courses);
}));
router.get("/courses/:id",asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
        attributes: [
            "description",
            "title",
            "userId",
            "materialsNeeded",
            "estimatedTime",
        ],
        include: [
            {
                model: User,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            },
        ],
    });
    res.status(200).json(course);
    })
);

  module.exports = router;
