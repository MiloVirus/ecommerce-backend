const {Router} = require('express')
const { body, check} = require('express-validator')
const bodyParser = require('body-parser')


const jsonParser = bodyParser.json()
const {verifyUser, userPost, userPut, userDelete, usersGetById} = require('../controllers/user.controllers')

const { validateFields, validateJWT } = require('../middlewares');

const router = Router()


router.get('/', validateJWT, verifyUser)
router.get('/:id', [   
    validateJWT, 
    check('id','No Mongo id').isMongoId(), 
    validateFields
], usersGetById );
router.post('/', [
                jsonParser, 
                body('name', 'name is required').not().isEmpty(),
                body('lastName', 'Last name is required').not().isEmpty(),
                body('email','Email invalid').isEmail(),
                body('password', 'password must contain more than 6 characters').isLength({min : 6}),
                 validateFields,
                ], userPost)
router.put('/:id',[ validateJWT, jsonParser], userPut)
router.delete('/:id', validateJWT, userDelete)

module.exports = router