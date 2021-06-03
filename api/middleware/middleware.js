const Users = require('../users/users-model');


function logger(req, res, next) {
  const date = Date().toLocaleString();
  console.log('LOGGER', req.method, req.originalUrl, date);
  next();
}

 function validateUserId(req, res, next) {
    Users.getById(req.params.id)
      .then(user => {
        if (!user) {
          res.status(404).json({
            message: 'user not found'
          })
        }
        else {
          req.user = user
          next()
        }
      })
      .catch(err => {
        console.log('Error:', {err})
      })
}

function validateUser(req, res, next) {
  const name = req.body.name;
  if (!name) {
    res.status(400).json({
      message: 'missing required name field'
    })
  }
  else {
    next();
  }
}

function validatePost(req, res, next) {
  const text = req.body.text;
  if (!text) {
    res.status(400).json({
      message: 'missing required text field'
    })
  }
  else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost };