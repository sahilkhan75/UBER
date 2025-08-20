const userModel = require('../model/userModel');
const userservice = require('../services/userService');
const { validationResult } = require('express-validator');
const blacklisttokenModel = require('../model/blacklisttokenModel')

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body, 'ajdBCa ');
        const { fullname, email, password } = req.body;

        const isUserExists = await userModel.findOne({ email })
        if (isUserExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

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


module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password')

    if (!user) {
        return res.status(401).send({ message: 'invalid email or password' })
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).send({ message: 'invalid email or password' })
    }

    const token = user.generateAuthToken();

    res.cookie('token', token)

    res.status(200).send({ token, user });


}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user)
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklisttokenModel.create({ token });

    res.status(200).json({ message: 'User logged out successfully' })

}

