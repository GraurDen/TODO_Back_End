const Router = require('express');
const { body } = require('express-validator');
const { users } = require('../models/index');
const { handleErrors, generateAccessToken } = require('../helpers');
const userRgisterRouter = new Router();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(5);

userRgisterRouter.post(
    '/register',
    body('password')
        .notEmpty()
        .isLength({ min: 4 })
        .withMessage('Password must be at least 4 chars long'),
    body('name')
        .notEmpty()
        .isLength({ min: 4 })
        .withMessage('Name must be at least 4 chars long'),
    handleErrors,
    async (req, res) => {
        const { name, password } = req.body;

        try {
            const userExists = await users.findOne({
                where: { name },
            });

            if (userExists) {
                return res.status(400).send({
                    message: `User with name: ${name} already exists`,
                });
            }
            // create hash password
            const hashPassword = bcrypt.hashSync(password, salt);

            const userCreate = await users.create({
                name,
                password: hashPassword,
            });

            res.send({ message: 'User is registered' });
        } catch (error) {
            console.log(error);
            res.send({ message: 'Registration error' });
        }
    }
);

module.exports = userRgisterRouter;
