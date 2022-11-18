const {Schema, model} = require('mongoose')

const productSchema = Schema(
    {
        name: {type: String, required: [true, 'Name required']},
        description: {type : String, required : [true, 'Description required']},
        price: {type: Number, required : [true, 'Price Required']},
        imgUrl: {type: String, deafault: ''},
        stock: {type: Number, required : [true, 'Stock Required']},
        category: {type: Schema.Types.ObjectId, ref: 'Categorie'}
    }
)

module.exports = model('Product', productSchema)