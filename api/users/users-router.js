const express = require('express');
const { validateUserId, validatePost, validateUser } = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require('./users-model');
const Post = require('../posts/posts-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
    .then(users => {
      res.json(users);
    })
    .catch(next);
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user);
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert({name: req.name})
    .then(user => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, {name: req.name})
    .then(() => {
      return Users.getById(req.params.id)
    })
    .then(user => {
      res.json(user);
    })
    .catch(next)

  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
    .then(() => {
      res.json(req.user);
    })
    .catch(next)
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then(resp => {
      res.json(resp);
    })
    .catch(next);

  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  Post.insert({
    user_id: req.params.id,
    text: req.text,
  })
    .then(resp => {
      res.status(201).json(resp);
    })
    .catch(err => {
      res.status(500).json({err});
    })

  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
