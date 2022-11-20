const {Router} = require('express')
const bodyParser = require('body-parser')
const router = Router()
const jsonParser = bodyParser.json()
const {verifyUser, userPost, userPut, userDelete, usersGetById} = require('../controllers/user.controllers')
const { body, check} = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')
const cors = require('cors')

router.get('/', validateJWT, verifyUser)
router.get('/:id', [   
    validateJWT, 
    check('id','No Mongo id').isMongoId(), 
    validateFields
], usersGetById );
router.post('/', [
                cors(),jsonParser, 
                body('name', 'name is required').not().isEmpty(),
                body('lastName', 'Last name is required').not().isEmpty(),
                body('email','Email invalid').isEmail(),
                body('password', 'password must contain more than 6 characters').isLength({min : 6}),
                 validateFields,
                ], userPost)
router.put('/:id',[ validateJWT, jsonParser], userPut)
router.delete('/:id', validateJWT, userDelete)

module.exports = router