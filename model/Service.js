  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    port:{
        type:Number
    },
    name:{
        type:String
    },
    protocol:{
        type:String
    }
  });

module.exports  = mongoose.model("Service", serviceSchema,"services");