const express = require("express")
const dotenv = require("dotenv")
const routes = require("./routes")
const connectDB = require("./db")
dotenv.config()

const app = express()
app.use(express.json())



const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log(`Server started running on port ${PORT}.`)
}) 

connectDB()

app.use("/api", routes)

app.get("/", (req, res)=>{
    res.status(200).json({msg: "Welcome to our backend."})
})


