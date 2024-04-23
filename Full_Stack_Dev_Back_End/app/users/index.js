const express = require('express');
const usersController = require('./controller');

const router = express.Router();

router.post('/users', usersController.createUser);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);
router.get('/users', usersController.listAllUsers);
router.post('/login',usersController.login);

module.exports = router;