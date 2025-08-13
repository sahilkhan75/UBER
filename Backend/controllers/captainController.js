const captainModel = require('../model/captainModel');
const captainService = require('../services/captainService');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body)

        const { fullname, email, password, vechile } = req.body;

        // Check required fields
        if (!fullname?.firstname || !fullname?.lastname || !email || !password || !vechile?.plate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check duplicate email
        const isCaptainExists = await captainModel.findOne({ email });
        if (isCaptainExists) {
            return res.status(400).json({ message: 'Captain already exists' });
        }

        // Hash password
        const hashPassword = await captainModel.hashPassword(password);

        // Pass correct spelling and structure
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword,
            color: vechile.color,
            plate: vechile.plate,
            capacity: vechile.capacity,
            vechileType: vechile.vechileType
        });




        const token = captain.generateAuthToken();

        res.status(201).json({ token, captain });
    } catch (error) {
        next(error);
    }
};
