const jwt = require('jsonwebtoken')
const User = require('../models/user')


const validateJWT = async(req, res, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(400).json({ msg: 'not token' });
    }

    try {
        console.log(process.env.SECRET_JWT)
        
        const { uid } = jwt.verify(token, process.env.SECRET_JWT);
        
        console.log(uid)
        
        

        const user = await User.findById('63d713daa1fd88278840911f');
        
        if(!user){
            return res.status(400).json({ msg: 'Token invalid - user not exist' });
        }
       
        if(!user.status){
            return res.status(400).json({ msg: 'Token invalid' });
        }

        req.user=user;
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: 'token invalid' });
        
    }
}

module.exports = {
    validateJWT
}