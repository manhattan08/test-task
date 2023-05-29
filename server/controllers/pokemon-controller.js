const UserModel = require("../models/user-model");
const UserSocialModel = require("../models/user.social-model");
const UserDto = require("../dtos/user-dto");
const axios = require("axios");



class PokemonController{
    async setFavoutirePokemons(req,res,next){
        try{
            const {id,pokiName} = req.body;
            let user;
            if(id.includes("+facebook")){
                const result = id.split('+')[0];
                user = await UserSocialModel.findOne({accountId:result})
                if(!user)
                    return res.status(401).json({message:"unauthorized!"})
            }
            else{
                user = await UserModel.findOne({_id:id})
                if(!user)
                    return res.status(401).json({message:"unauthorized!"})
            }
            if(pokiName && user.FavouritePokemons.includes(pokiName.toLowerCase()))
                return res.status(200).json({message:"This pokemon is already added to favorites!"})

            user.FavouritePokemons.push(pokiName.toLowerCase())
            await user.save()
            const userDto = new UserDto(user);
            return res.status(200).json(userDto);
        } catch (e) {
            next(e)
        }
    }
    async getFavouritePokemons(req,res,next){
        try{
            const id = req.params.id;
            let user;
            if(id.includes("+facebook")){
                const result = id.split('+')[0];
                user = await UserSocialModel.findOne({accountId:result})
                if(!user)
                    return res.status(401).json({message:"unauthorized!"})
            }
            else{
                user = await UserModel.findById(id)
                if(!user)
                    return res.status(401).json({message:"unauthorized!"})
            }
            let pokemons = []

            if(user.FavouritePokemons.length !== 0)
                for(let i = 0;i<user.FavouritePokemons.length;i++){
                    const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${user.FavouritePokemons[i]}`)
                    pokemons.push(pokemon.data)
                }

            return res.status(200).json({pokemons})
        } catch (e) {
           next(e)
        }
    }
    async removeFavouritePokemon(req,res,next){
        try{
            const {id,name}= req.body;
            let user;
            if(id.includes("+facebook")){
                const result = id.split('+')[0];
                user = await UserSocialModel.findOne({accountId:result})
                if(!user)
                    return res.status(401).json({message:"unauthorized!"})
            }
            else{
                user = await UserModel.findById(id)
                if(!user)
                    return res.status(401).json({message:"unauthorized!"})
            }
            user.FavouritePokemons = user.FavouritePokemons.filter((item) => item !== name.toLowerCase());
            await user.save()
            return res.status(200).json({pokemons:user.FavouritePokemons})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PokemonController();