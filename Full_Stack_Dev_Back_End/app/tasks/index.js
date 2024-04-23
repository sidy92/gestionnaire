const express = require('express');
const tasksController = require('./controller');

const router = express.Router();


router.post('/tasks', tasksController.createTask);
router.put('/tasks/:id', tasksController.updateTask);

module.exports = router;