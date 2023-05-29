const {Schema,model} = require('mongoose')

const UserSocialSchema = new Schema({
    username:{type:String,require:true},
    accountId:{type:String,require: true,unique:true},
    FavouritePokemons:{type:Array,default:[]}
})

module.exports = model("UserSocial",UserSocialSchema);