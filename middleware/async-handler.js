const { restart } = require("nodemon");

// Handler function to wrap each route.
exports.asyncHandler = (cb) => {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
          const errors = error.errors.map(err => err.message);
          res.status(400).json({ errors })
        }else if(error.name==='SequelizeForeignKeyConstraintError'){
          //handle the case where the user to whom we want to assign the course does not exist
          res.status(404).json({"msg":"The user with this id does not exist and, therefore, no course can be assigned to them."});
        }else{
          // Forward error to the global error handler
          next(error);
        }
      }
    }
  }