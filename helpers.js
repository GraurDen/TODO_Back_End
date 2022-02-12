const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const handleErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

module.exports = { handleErrors, generateAccessToken };
