const {Router} = require('express')
const bodyParser = require('body-parser')
const router = Router()
const jsonParser = bodyParser.json()
const {categoryGet, categoryGetById, categoryPost, categoryPut, categoryDelete} = require('../controllers/categories.controllers.js')
const {body, check} = require('express-validator')
const {validateFields} = require('../middlewares/validate-fields')
const { categoryExist } = require('../helpers/validate-db')
const {validateJWT} = require('../middlewares/validate-jwt')

router.get('/', categoryGet)
router.get('/:id',[
                    check('id','No Mongo id').isMongoId(),
                    check('id').custom(categoryExist),
                    validateFields], 
                    categoryGetById)
router.post('/', [  jsonParser,
                    body('name','name is invalid').not().isEmpty(),
                    validateFields], categoryPost)
router.put('/:id', jsonParser, categoryPut)
router.delete('/:id', categoryDelete)

module.exports = router