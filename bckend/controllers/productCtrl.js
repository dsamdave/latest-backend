const Users = require("../models/userModel")


const usersCtrl = {
    getAllUsers: async (req, res)=>{

        const users = await Users.find()

        return res.status(200).json(users)
    },

    getOneProduct: async(req, res)=>{
        res.json({msg: "This is one Product."})
    },

    
    register: async(req, res)=>{
        try { 
            const {firstName, lastName, password, email, phoneNumber, address} = req.body


            const user = await Users.findOne({email})

            if(user) return res.status(400).json({msg: "This user already exist!"})

        
            const newUser = new Users({firstName, lastName, password, email, phoneNumber, address})

            await newUser.save()
        
            return res.json({msg: "Registration successful!"})
        } catch (error) {
            console.log(error.message)
        }
    }, 

    updateProduct: async(req, res)=>{
        res.json({msg: "Product updated successfully."})
    },

    deleteProduct: async(req, res)=>{
        res.json({msg: "Product deleted!"})
    }
}

module.exports = productCtrl