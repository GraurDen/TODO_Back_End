const Router = require('express');
const { param } = require('express-validator');
const { users } = require('../models/index');
const handleErrors = require('../helpers');
const userAuthRouter = new Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '24h' });
};

userAuthRouter.post(
    '/auth',
    handleErrors,

    async (req, res) => {
        const { name, password } = req.body;
        try {
            const user = await users.findOne({
                where: { name },
            });

            if (!user) {
                return res.status(400).send({
                    message: `There is no user with name: ${name}`,
                });
            }

            // Compare passwords
            if (!bcrypt.compare(password, user.password)) {
                return res
                    .status(200)
                    .send({ message: 'Password is incorrect' });
            }

            const token = generateAccessToken(user.id);
            
            res.json(token);
        } catch (error) {
            console.log(error);
            res.send({ message: 'Login error' });
        }
    }
);

module.exports = userAuthRouter;
