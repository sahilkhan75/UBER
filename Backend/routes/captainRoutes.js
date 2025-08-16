const express = require('express')
const router = express.Router();
const {body} = require('express-validator')
const captainController =require('../controllers/captainController')
const authMiddleware = require('../middleware/authmiddleware')



router.post('/register',[
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters long'),
    body('vechile.color').isLength({min:3}).withMessage('color must be at least 3 characters long '),
    body('vechile.plate').isLength({min:3}).withMessage('plate must be at least 3 characters long'),
    body('vechile.capacity').isInt({min:1}).withMessage('capacity must be at least 1'),
    body('vechile.vechileType').isIn(['car', 'motorcycle', 'auto']).withMessage('invalid vechile type')
] , captainController.registerCaptain),

router.post('/login',[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters long'),   
] , captainController.loginCaptain),


router.get('/profile',authMiddleware.authCaptain,  captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);



module.exports = router;

