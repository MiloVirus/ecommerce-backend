const {Categorie} = require('../models/category')
const {Product} = require('../models/product')

const categoryExist = async(id) =>
{
    const categoryExist = await Categorie.findById(id)

    if(!categoryExist)
    {
        throw new Error(`Id does not exist`)
    }
}
const productExist = async(id) =>
{
    const producExist = await Product.findById(id)

    if(!producExist)
    {
        throw new Error(`Id does not exist`)
    }
}

module.exports = {categoryExist, productExist}