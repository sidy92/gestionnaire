const UsersService = require('./service');
const { body, param, query, validationResult } = require('express-validator');
const models = require('./../../models');

const User = models.User;
const usersService = new UsersService({ User });



function createUser(req, res) {
    const paramsValidation = [
        body('fullname').notEmpty().withMessage('Full name is required.'),
        body('job').notEmpty().withMessage('Job is required.'),
        body('role').notEmpty().withMessage('Role is required.'),
        body('email').notEmpty().withMessage('Email is required.'),
        body('password').notEmpty().withMessage('Password is required.'),
    ];

    Promise.all(paramsValidation.map(validation => validation.run(req)))
    .then(async () => {
        const validationErr = validationResult(req);

        if (!validationErr.isEmpty()) {
            return res.status(400).send({
                errors: validationErr.array()
            });
        }

        const response = await usersService.createUser(req.body);

    //usersService.createUser();

    return res.send(response);

    })
    .catch((err) => {
        console.log(err)

        return res.status(500).send({
            message: 'Something went wrong'
        });
})
    
}

function updateUser(req, res) {
    const paramsValidation = [
        param('id').notEmpty().withMessage('User ID is required.'),
    ];

    Promise.all(paramsValidation.map(validation => validation.run(req))).then(async () => {
            const validationErr = validationResult(req);

            if (!validationErr.isEmpty()) {
                return res.status(400).send({
                    errors: validationErr.array(),
                });
            }

            const response = await usersService.updateUser(req.params.id, req.body);

            return res.send(response);
        });
}

function deleteUser(req, res) {
    const paramsValidation = [
        param('id').notEmpty().withMessage('User ID is required.'),
    ];

    Promise.all(paramsValidation.map(validation => validation.run(req))).then(async () => {
            const validationErr = validationResult(req);

            if (!validationErr.isEmpty()) {
                return res.status(400).send({
                    errors: validationErr.array(),
                });
            }

            const response = await usersService.deleteUser(req.params.id);

            return res.send(response);
        });
}

async function listAllUsers(req, res) {
    const paramsValidation = [
        query('page').optional().isInt().withMessage('Page must be an integer.'),
        query('limit').optional().isInt().withMessage('Limit must be an integer.')
    ];
    
    Promise.all(paramsValidation.map(validation => validation.run(req))).then(async () => {
        const validationErr = validationResult(req);

        if (!validationErr.isEmpty()) {
            return res.status(400).send({
                errors: validationErr.array(),
            });
        }

        const response = await usersService.listAllUsers(req.query);

        return res.send(response);
    })
    .catch((err) => {
        return res.status(500).send({
            message: 'Something went wrong'
        });
})
}

function login(req,res) {
    const paramsValidation = [
        body('email').notEmpty().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password is required')
    ]
    Promise.all(paramsValidation.map(validation =>validation.run(req)))
        .then(async ()=>{ const validationErr = validationResult(req);
            
        if (!validationErr.isEmpty()){
            return res.status(400).send({
                errors:validationErr.array()
            });
        }
        const response = await usersService.login(req.body);
    
        return res.send(response);
    })
    .catch((err)=>{
        return res.status(500).send({
            message : 'Something went wrong'
        });
    });
    
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    listAllUsers,
    login
};