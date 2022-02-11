const Router = require('express');
const { param } = require('express-validator');
const { users } = require('../models/index');
const handleErrors = require('../helpers');
const userGetRouter = new Router();

userGetRouter.get('/getuser', handleErrors, async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
});

module.exports = userGetRouter;
