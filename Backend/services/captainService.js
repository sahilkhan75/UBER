const captainModel = require('../model/captainModel')



module.exports.createCaptain = async({
    firstname,lastname,email,password,color, plate , capacity, vechileType 
})=>{
    if(!firstname || !email || !password || !color || !plate || !capacity || !vechileType) {
        throw new Error('All fields are required');
    }

    const captain = await captainModel.create({
        fullname:{
            firstname,
            lastname,
        },
        email, 
        password,
        vechile:{
            color,
            plate,
            capacity,
            vechileType
        }
    })

    return captain
}