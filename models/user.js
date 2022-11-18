const {Schema, model} = require('mongoose')

const userSchema = Schema(
    {
        name : {type : String, required : [true, 'Name Required']},
        lastName: {type : String, required : [true, 'Last Name Required']},
        address: {type: String, default:''},
        city: {type: String, default:''},
        country: {type: String, default:''},
        state: {type: String, default:''},
        email:{type: String, unique: [true, 'email unique']},
        password:{type: String, required: [ true, 'Password Required']},
        status : {type: Boolean, default: true},
    }
)

userSchema.methods.toJSON = function ()
{
    const {__v, password, _id, ...user} = this.toObject()
    user.uid = _id
    console.log(user)
    return user
}

module.exports = model('User', userSchema)