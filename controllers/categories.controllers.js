const Category = require('../models/category')
const { put } = require('../routes/auth.routes')


const categoryGet = async (req, res) =>
{
    //const category = await Category.find()
    const { desde= 0 , limite = 5} = req.query

    const query = {status: true}

    const [categories,total] = await Promise.all([

        Category.find(query).populate('user','name').skip(Number(desde)).limit(Number(limit)),
        Category.countDocuments(query)
    ])

    res.json({categories,total})
}

const categoryGetById = (req, res) =>
{
    
}

const categoryPost = async (req, res) =>
{
    const category = new Category(req.body)
    await category.save()

    res.json({'msg' : 'post'})
}

const categoryPut = async (req,res) =>
{
    const {id} = req.params

    const body = req.body

    const category = await Categorie.findByIdAndUpdate(id, body)

    res.json({'msg': put, product})
}

const categoryDelete = async (req,res) =>
{
    
}

module.exports =
{
 categoryGet,
 categoryPost,
 categoryDelete,
 categoryPut,
 categoryGetById
}