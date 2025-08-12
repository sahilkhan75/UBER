const userModel = require('../model/userModel');
const userservice = require('../services/userService');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body);
        const { fullname, email, password } = req.body;

        const hashPassword = await userModel.hashPassword(password);

        const user = await userservice.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword
        });

        const token = user.generateAuthToken();
        return res.status(201).json({ token, user });

    } catch (err) {
        console.error('Error in registerUser:', err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};
