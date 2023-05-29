const {validationResult} = require("express-validator");
const UserModel = require("../models/user-model");
const UserSocialModel = require("../models/user.social-model");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user-dto");


class UserController{
    async registration(req,res,next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(500).json(errors.array())
            }
            const {email,password,username} = req.body;
            const candidateEmail = await UserModel.findOne({email})
            if(candidateEmail)
                return res.status(400).json({message:"Email has already been taken!"})
            const candidateUsername = await UserModel.findOne({username})
            if(candidateUsername)
                return res.status(400).json({message:"Username has already been taken!"})
            const hashPassword = await bcrypt.hash(password,10);
            const user = await UserModel.create({email,password:hashPassword,username});

            const userDto = new UserDto(user);
            return res.status(200).json({user:userDto})

        } catch (e) {
            next(e)
        }
    }

    async login(req,res,next){
        try{
            const {email,password} = req.body;
            const user = await UserModel.findOne({email})
            if(!user)
                return res.status(400).json({message:"User with this email didnt found!"})

            const isPassEqual = bcrypt.compareSync(password,user.password);
            if(!isPassEqual)
                return res.status(400).json({message:"Incorrect password or Email!"})

            const userDto = new UserDto(user);

            return res.status(200).json({user:userDto})

        } catch (e) {
            next(e)
        }
    }
    async loginWithSocialMedia(req,res,next){
        try{
            const {first_name,id} = req.body;
            const user = await UserSocialModel.findOne({accountId:id})
            if(!user){
                await UserSocialModel.create({username:first_name,accountId:id})
            }
            return res.status(200).json({});
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();