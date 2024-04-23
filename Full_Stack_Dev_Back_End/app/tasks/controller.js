const TasksService = require('./service');
const models = require('./../../models');
const {  body, isISO8601, validationResult } = require('express-validator');

const { validate } = require('../../models/user.model');

const Task = models.Task;
const User = models.User;

const tasksService = new TasksService({ Task, User });

function createTask(req, res) {
    const paramsValidation = [
        body('userId').notEmpty().withMessage('userId is required'),
        body('dueDate')
            .notEmpty()
            .withMessage('dueDate is required')
            .isISO8601()
            .withMessage('dueDate must be a valid date'),
    ];

    Promise.all(paramsValidation.map((validation) => validation.run(req))).then(async () => {
        const validationErr = validationResult(req);

        if (!validationErr.isEmpty()) {
            return res.status(400).send({
                errors: validationErr.array(),
            });
        }

        const response = await tasksService.createTask(req.body);
        return res.send(response);
    })
    .catch((err) => {
        return res.status(500).send({
            message: 'Something went wrong'
        });
    })
}

function updateTask(req, res) {
    const paramsValidation = [
        param('id').notEmpty().withMessage('User ID is required.'),
        body('userId').notEmpty().withMessage('userId is required'),
        body('dueDate').optional().isISO8601().withMessage('dueDate must be a valid date'),
    ];

    Promise.all(paramsValidation.map(validation => validation.run(req))).then(async () => {
            const validationErr = validationResult(req);

            if (!validationErr.isEmpty()) {
                return res.status(400).send({
                    errors: validationErr.array(),
                });
            }

            const response = await tasksService.updateTask(req.params.id, req.body);

            return res.send(response);
        })
        .catch((err) => {
            return res.status(500).send({
                message: 'Something went wrong'
            });
        })
}

module.exports = {createTask, updateTask};