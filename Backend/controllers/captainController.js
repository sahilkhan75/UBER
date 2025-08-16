const blacklisttokenModel = require('../model/blacklisttokenModel');
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


module.exports.loginCaptain = async (req, res, next) => {
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select("+password")

        if (!captain) {
            return res.status(401).send({ message: 'invalid email or password' })
        }

        const isMatch = await captain.comparePassword(password);

        if (!isMatch) {
            return res.status(401).send({ message: 'invalid email or password' })
        }

        const token = captain.generateAuthToken();
        res.cookie('token', token)

        res.status(200).send({token,captain});




    } catch (error) {
        console.error('Error in loginCaptain:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }

};

module.exports.getCaptainProfile = async(req,res,next)=>{
    try {
        res.status(200).json({captain:req.captain});
    } catch (error) {
        res.status(500).json({message:'Internal Server Error', error:error.message})
    }
}

module.exports.logoutCaptain = async(req,res,next)=>{
    try {
        const token= req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        await blacklisttokenModel.create({token});
    
        res.clearCookie('token') 
    
        res.status(200).json({message:'successfully logged out' })
        
    } catch (error) {
        
        res.status(500).json({message:'Internal Server Error', error:error.message})
    }


}
