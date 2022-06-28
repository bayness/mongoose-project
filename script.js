const express = require('express');
const mongoose = require("mongoose");
const Person = require("./UserSchemas/User");

const app = express();

var MongoClient = require("mongodb").MongoClient;

const Port = process.env.Port || 3000;

app.listen(Port, () => console.log("server started"));


mongoose.connect("mongodb://localhost/Users");

// creating  the first model person with arrow  function creatUser
const user1 = Person.createUser({name: "younesse",
age: 16,
email: "Youbayou@gmail.com",
food: ['cousous', 'panini', 'chabakiya'],});

const user2 = Person.createUser({name: "Anas",
age: 23,
email: "Yansau@gmail.com",
food: ['sppofy', 'danap', 'mirondina'],});

const user3 = Person.createUser({name: "Mounir",
age: 28,
email: "mouniraha@gmail.com",
food: ['rfissa', 'lazagnya', 'hrira'],});

const user4 = Person.createUser({name: "mimoune",
age: 45,
email: "Ymoouinou@gmail.com",
food: ['burger', 'brochette', 'pastilla'],});

const  createUser = async (req,res,next) => {
  try{
     const person = new Person({...req.body  
  });

  await person.save();
  console.log(person);
  } catch (e){
    next(e);
  }
 
}




const findAllPersons = async (req, res, next) => {
  try {
    const person = await person.find();
    res.status(200).json(person);
  } catch (err) {
    next(err);
  }
};

//find person with id 
const findPersonById = async (req, res, next) => {
  try {
    const person = await person.findById(req.params.id);

    res.status(200).json(person);
  } catch (err) {
    next(err);
  }
};

const findUserByUsername = async (req, res, next) => {
  try {
    const user = await Person.findOne({ username: req.params.username });
    //need to add more security here
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//update user in database
const updateUser = async (req, res, next) => {
  try {
    await Person.updateOne({ username: req.params.username }, { ...req.body });
    res
      .status(200)
      .json({ status: "success", msg: "successfully updated user !" });
  } catch (err) {
    next(err);
  }
};

//delete user from database
const deleteUser = async (req, res, next) => {
  try {
    await Person.deleteOne({ username: req.params.username });
    res.status(200).json({
      status: "success",
      msg: "user removed from database successfully",
    });
  } catch (err) {
    next(err);
  }
};