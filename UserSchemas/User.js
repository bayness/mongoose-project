const { MongoServerClosedError } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name :{type : String, required : true, unique : true},

  age : Number, 
  
  email : {type : String, required : true, lowercase : true},

  food: [String],
  
})


module.exports = mongoose.model("User", userSchema)