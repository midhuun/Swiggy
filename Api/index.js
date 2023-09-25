const mongoose = require('mongoose');
const express = require('express');
const User = require('./Models/User')
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { json } = require('react-router-dom');
const cookieParser = require('cookie-parser');
const Cart = require('./Models/CartItems')
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true,origin:'http://localhost:5173'}));
const salt = bcrypt.genSaltSync(10);
const secret = "aw23ewrdswwej322ssww21";
mongoose.connect("mongodb+srv://midhun:midhun123@cluster0.mr3s84c.mongodb.net/")
.then(()=>{
  console.log("Connected Successfully");
})
.catch((err)=>{
    console.log(err);
})

app.post("/post",async(req,res)=>{
    const {name,password,email,phone} = req.body;
    try{
    const hashedPassword = await bcrypt.hashSync(password,salt);
    const data = await User.create({name,email,password:hashedPassword,phone});
      res.json(data);
    }
    catch(err){
        console.log(err);
    }
})
app.post("/cart", async (req, res) => {
  const data = req.body;
  const newCart = Object.entries(data).map(([id, count]) => ({ id: Number(id), count }));
  console.log(newCart);
  const {key} = req.cookies;
  jwt.verify(key,secret,{},async(err,token)=>{
    if(err){
      console.log(err);
    }
     const {id} = token;
     console.log(id);
     try{
     const user = await User.findByIdAndUpdate(id, { $set: { carItems: newCart } },{ new: true });
    const cartItems = user.carItems;
    const name = user.name;
    const resultObject = {};
     cartItems.forEach(item => {
    resultObject[item.id] = item.count;
    });
    res.json({cart:resultObject,name:name})
  }
  catch(err)
   {
    console.log(err);
   }
  })
});
app.post("/login",async(req,res)=>{
   const {phone,password} = req.body;
   try{
    const data = await User.findOne({phone});
    const comparePassword =bcrypt.compareSync(password,data.password);
    if(comparePassword){
      jwt.sign({name:data.name,id:data._id},secret,{},(err,token)=>{
        if(err) throw err;
        res.cookie('key',token).json({id:data._id,name:data.name,token:token});
      })
    }
    else{
      console.log("Authentication Failed");
    }
   }
   catch(err){
    console.log(err);
   }
})
app.post('/logout',(req,res)=>{
  res.cookie('key','').json('ok');
})
app.get("/home",(req,res)=>{
 const {key} = req.cookies;
  jwt.verify(key,secret,{},(err,token)=>{
    if(err){
      console.log(err);
    }
    res.json(token);
  })
})
app.listen(3000,()=>{
    console.log("Port Running");
})