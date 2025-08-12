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


module.exports.loginUser= async (req, res , next )=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email , password } = req.body;
    const user = await userModel.findOne({email}).select('+password')

    if(!user){
        return res.status(401).send({message:'invalid email or password'})
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).send({message:'invalid email or password'})
    }

    const token = user.generateAuthToken();

    res.status(200).send({token , user});


}