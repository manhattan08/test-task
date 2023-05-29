const {Schema,model} = require('mongoose')

const UserSchema = new Schema({
    username:{type:String,unique:true,require:true},
    email:{type:String,unique: true,require: true},
    password:{type:String,unique:true,require:true},
    FavouritePokemons:{type:Array}
})

module.exports = model("User",UserSchema);