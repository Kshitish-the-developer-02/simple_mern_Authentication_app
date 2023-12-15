const express=require('express')
const mongoose =require('mongoose')
const cors =require('cors')
const bodyParser =require('body-parser')
const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')
const User=require("./schema/userSchema.js")
const SECRET_KEY='secretkeykshitish'

//connet  to express app
const app=express()

//connect to mongodb
dbURI='mongodb+srv://kshitishnayak82:Kshitish123@cluster0.7mvlcda.mongodb.net/UserDb?retryWrites=true&w=majority'
mongoose.connect(dbURI,{    
})
.then(()=>{
    app.listen(3001,()=>{
        console.log("server is connected to port 3001 and connected to mongodb successfully");
    })
})
.catch((error)=>{
    console.log("unable to connect with server",error);
})

//middleware
app.use(bodyParser.json())
app.use(cors())




//routes
/*
   C create-post request
   R read -get request
   U update -put or patch request
   D delete-delete request
*/

//user registration
//post register
 app.post('/register',async(req,res)=>{
    try {
        const{email,username,password}=req.body
        const hasedPassword=await bcrypt.hash(password,10)
        const newUser=new User({email,username,password:hasedPassword})
        await newUser.save()
        res.status(201).json({message:'user create successfully'})
    } catch (error) {
        res.status(500).json({error:"error signing up"})
    }
 })

 //get registered users
app.get('/register',async(req,res)=>{
    try {
        const users=await User.find()
        res.status(201).json(users)
    } catch (error) {
        res.status(500).json({error:'unable to get users'})
    }
})

//GET Login
app.post('/login',async(req,res)=>{
        try {
            const{username,password}=req.body
            const user= await User.findOne({username})
            if(!user){
                return res.status(401).json({error:'Invalid credentials'})
            }
            const isPasswordValid=await bcrypt.compare(password,user.password)
            if(!isPasswordValid){
                return res.status(401).json({error:'Invalid credentials'})
            }
            const token=jwt.sign({userId:user._id},SECRET_KEY,{expiresIn:'1hr'})
            res.json({message:'Login Successful'})
        } catch (error) {
            res.status(501).json({error:'Error logging in',error})
        }
})


