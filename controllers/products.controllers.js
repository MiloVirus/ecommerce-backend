const Product = require('../models/product')


const productGet = async (req,res) =>
{
    const product = await Product.find().populate('category','name') 
    res.json(product)
}

const productPost = async (req,res) =>
{
    const product = new Product(req.body)
    await product.save()


    res.json({'msg' : 'post'})
}

const productGetById = async(req, res) =>
{
    const { id } = req.params

    const product = await Product.findById(id).populate('category','name');
    console.log(product)

    res.json(product)
}


const productPut = async (req,res) =>
{   
    const {id} = req.params

    const body = req.body

    const product = await Product.findByIdAndUpdate(id, body)

    res.json({'msg' : 'put', product})
}

const productDelete = async (req,res) =>
{
    
}

module.exports = {productGet, productPost, productPut, productDelete, productGetById}