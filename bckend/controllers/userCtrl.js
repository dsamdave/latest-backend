const Users = require("../models/userModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require("axios")


const generateAccessToken = (id)=>{
    const accessToken = jwt.sign({id}, `${process.env.ACCESSTOKEN}`, {expiresIn: "5m"});
    return accessToken
}

const generateRefreshToken = (id)=>{
    const refreshToken = jwt.sign({id}, `${process.env.REFRESHTOKEN}`, {expiresIn: "7d"})

    return refreshToken
}


const usersCtrl = {
    getAllUsers: async (req, res)=>{

        const users = await Users.find().select("-password")

        return res.status(200).json(users)
    },

    getOneUser: async(req, res)=>{

        // const resp = await axios.get("https://jsonplaceholder.typicode.com/users")

        // const result = (resp.data)

        // console.log(result)

        const id = req.params.id

        const user = await Users.findOne({id})

        if(!user) 
        return res.status(400).json({msg: "This user does not exist!"})

        return res.json({
            msg: "user found!",
            user
        })
    },

    
    register: async(req, res)=>{
        try { 
            const {firstName, lastName, password, email, phoneNumber, address} = req.body


            const user = await Users.findOne({email})

            if(user) return res.status(400).json({msg: "This user already exist!"})

            const hashPassword = await bcrypt.hash(password, 8)

            const newUser = new Users({firstName, lastName, password: hashPassword , email, phoneNumber, address})

            await newUser.save()

            const access_token = generateAccessToken(newUser._id)
            const refresh_token = generateRefreshToken(newUser._id)
        
            return res.json({
                msg: "Registration successful!",
                access_token,
                refresh_token,
                user: {
                    id: newUser._id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    address: newUser.address,
                    phoneNumber: newUser.phoneNumber
                }
            }, )

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }, 

    login: async(req, res)=>{

        const {email, password} = req.body

        const newUser = await Users.findOne({email})

        if(!newUser) return res.status(400).json({msg: "This user does not exist!"})

        

        const isMatch = await bcrypt.compare(password, newUser.password)

        if(isMatch === false)
        return res.status(400).json({msg: "Incorrect Password"})

        const access_token = generateAccessToken(newUser._id)
        const refresh_token = generateRefreshToken(newUser._id)

        res.json({
            msg: "Login Successful.",
            access_token,
            refresh_token,
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                address: newUser.address,
                phoneNumber: newUser.phoneNumber
            }
        })
    },

    // deleteProduct: async(req, res)=>{
    //     res.json({msg: "Product deleted!"})
    // }
}

module.exports = usersCtrl