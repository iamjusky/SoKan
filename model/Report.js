  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    opStatus:{
        type:String,
        default:'Success'
    },
    scanInfo:{
        numTests:{
            type:Number,
            default:0
        },
        numFinishedTest:{
            type:Number,
            default:0
        }
    },
    scanOutput:{
        info:{
            protocol:String,
            tech:String,
            services:[
        
            ]
        }
    },
    scanStatus:{
        type:String,
        default:'Running'
    },
    target:{
       
    }
  });

module.exports  = mongoose.model("Report", reportSchema,"reports");