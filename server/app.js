require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app=express();

mongoose.connect('mongodb://localhost:27017/hopOnDB');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userSchema=new mongoose.Schema({
    id:String,
    username:{
     type:String,
     required:true
    },
    email:{
     type:String,
     rrequired:true
    },
    History:[String],
    password:{
     type:String,
     required:true
    }
})

const User = new mongoose.model("User", userSchema);

app.get("/",function(req,res){
    console.log("hello world")
})

app.get("/getkey",function(req,res){
    res.send({
     key:process.env.API_KEY 
    })
});

app.post("/addhistory",function(req,res){
  User.findOneAndUpdate(
    { email: req.body.email },
    {$push:{ History:req.body.link }},
    { new: true } // This option returns the updated document
  )
  .then(updatedUser => {
    if (!updatedUser) {
      // User not found
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    } else {
      res.send({ updatedUser });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "Failed to update user" });
  });
})


app.post("/login", async function(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (user === null) {
      res.send({ success: false });
      console.log("No user found");
    } else {
      const passwordVerification = bcrypt.compareSync(req.body.password, user.password);
      if (passwordVerification) {
        res.send({
          success: true,
          username: user.username,
          id: user._id,
          email: user.email,
          history: user.History,
          password: user.password
        });
      } else {
        res.send({ success: false });
      }
    }
  } catch (err) {
    console.log(err);
    // Handle the error
  }
});

app.post("/signup", function(req, res) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user !== null) {
        res.send({ success: false });
        console.log("User already exists");
      } else {
        bcrypt.hash(req.body.password, 10, function(err, bHash) {
          const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: bHash
          });
          newUser.save();
          res.send({
            success: true,
            username: newUser.username,
            id: newUser._id,
            email: newUser.email,
            history: newUser.History,
            password: newUser.password
          });
          console.log("User successfully signed up");
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/changepassword",function(req,res){
     User.findOne({ email: req.body.email })
     .then(user=>{
      if (user !== null) {
        if(user.username===req.body.username){
          const passwordVerification = bcrypt.compareSync(req.body.password, user.password);
        if(passwordVerification){
          res.send({ success: true });
          console.log("User already exists");
        }else{
          res.send({ success: false });
          console.log("User not exists");
        }
      }
      }
      else if(user === null){
        res.send({ success: false });
        console.log("User not exists");
      } 
     })
     .catch(err => {
      console.log(err);
    });
})

app.post("/changepasswordtonew", function(req, res) {
  bcrypt.hash(req.body.password, 10)
    .then(hashcode => {
      User.findOneAndUpdate(
        { email: req.body.email },
        { $set: { password: hashcode } },
        { new: true } // This option returns the updated document
      )
      .then(updatedUser => {
        if (!updatedUser) {
          // User not found
          console.log("User not found");
          return res.status(404).json({ error: "User not found" });
        } else {
          res.send({ updatedUser });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Failed to update user" });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Failed to hash password" });
    });
});


app.post(`/changeusername`,function(req,res){
User.findOneAndUpdate(
  { email:req.body.email},
  { $set: { username: req.body.username} },
  { new: true } // This option returns the updated document
)
  .then(updatedUser => {
    if (!updatedUser) {
      // User not found
      console.log("user not found");
      return res.status(404).json({ error: "User not found" });
    }
    else{
    res.send({updatedUser});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "Failed to update user" });
  });
});



app.listen(5000, function() {
    console.log("Server started on port 5000");
  });
