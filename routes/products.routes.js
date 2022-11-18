const {Router} = require('express')
const bodyParser = require('body-parser')
const router = Router()
const jsonParser = bodyParser.json()

const {productGet, productPost, productPut, productDelete, productGetById} = require('../controllers/products.controllers.js')
const {body, check} = require('express-validator')
const {validateFields} = require ('../middlewares/validate-fields')
const {productExist} = require('../helpers/validate-db')

router.get('/', productGet)
router.get('/:id',[
    check('id','No Mongo id').isMongoId(),
    check('id').custom(productExist),
    validateFields], 
    productGetById)
router.post('/',[jsonParser,
                body('name', 'name is required').not().isEmpty(),
                body('description', 'description is required').not().isEmpty(),
                body('price', 'price is required').not().isEmpty(),
                body('stock', 'stock is required').not().isEmpty(),
                body('category', 'category is required').not().isEmpty(),
                 validateFields], productPost)
router.put('/:id', jsonParser, productPut)
router.delete('/:id', productDelete)


module.exports = router