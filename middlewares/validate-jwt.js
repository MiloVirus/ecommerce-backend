const jwt = require('jsonwebtoken')
const {User} = require('../models/user')

const validateJWT = async(req, res, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(400).json({ msg: 'not token' });
    }

    try {
        const { uid } = jwt.verify(token, "s3cr3tk3y@4pplo4d3r");

        const user = await User.findById(uid);

    
        if(!user){
            return res.status(400).json({ msg: 'Token invalid - user not exist' });
        }
       
        if(!user.status){
            return res.status(400).json({ msg: 'Token invalid' });
        }

        req.user=user;
        next();
    } catch (error) {
        return res.status(400).json({ msg: 'token invalid' });
    }



}

module.exports = {
    validateJWT
}