const {Schema, model} = require('mongoose')

const categorySchema = Schema(
    {
        name: {type: String, required: [true, 'Name Required']},
        status : {type: Boolean, default: true}
    }
)


categorySchema.methods.toJSON = function ()
{
    const {__v, status, ...category} = this.toObject()
    return category
}


module.exports = model('Categorie', categorySchema)