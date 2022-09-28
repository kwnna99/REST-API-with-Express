'use strict';

const e = require('express');
const express = require('express');
const bcrypt = require('bcrypt');
const { authenticateUser } = require('./middleware/auth-user');
const {asyncHandler}=require('./middleware/async-handler');
const course = require('./models/course');
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
    await User.create(req.body);
    res.location('/');
    res.status(201).end();
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
router.get("/courses/:id",asyncHandler(async (req, res,next) => {
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
    if(course){
        res.status(200).json(course);
    }else{
        res.status(404).json({'msg':'Course not found!'});
    }
    })
);

router.put('/courses/:id',authenticateUser,asyncHandler(async(req,res)=>{
    const courseInfo=req.body;
    const user = req.currentUser;
    let course= await Course.findByPk(req.params.id);
    if(course){
        if(course.userId===user.id){
            await course.update(req.body);
            res.status(204).end();
        }else{
            res.status(403).json({"msg":"Not Authorized!"});
        }
    }else{
        res.status(404).json({"msg":"Course not found!"});
    }
}))
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
    const courseInfo= req.body;
    const owner=await User.findByPk(courseInfo.userId);
    if(owner){
        const course= await Course.create({title: courseInfo.title,
            description: courseInfo.description,
            estimatedTime: courseInfo.estimatedTime,
            materialsNeeded: courseInfo.materialsNeeded,
            userId: courseInfo.userId,});
        res.location(`/${course.id}`);
        res.status(201).end();
    }else{
        res.status(404).json({'error':'User not found'});
    }
}
));

  module.exports = router;
