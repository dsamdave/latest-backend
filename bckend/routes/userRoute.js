
const express = require("express")
const usersCtrl = require("../controllers/userCtrl")

const router = express.Router()

router.get("/allusers", usersCtrl.getAllUsers)

router.get("/sample/:id", usersCtrl.getOneUser)

router.post("/register", usersCtrl.register)

router.post("/login", usersCtrl.login)


 
module.exports = router