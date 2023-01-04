const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Question is Required"],
        minlength:[10,"Question Must Be At Least 10"]
    },

    choice1:{
        type:String,
        required:[true,"Must Include Country 1"],
    },

    votes1:{
        type:Number,
        default:0},

    choice2:{
    type:String,
    required:[true,"Must Include Country 2"],
    },

    votes2:{
        type:Number,
        default:0},


    choice3:{
        type:String,
    },

    votes3:{
        type:Number
        ,default:0},

    
    choice4:{
        type:String,
    },
    
    votes4:{
        type:Number
        ,default:0},

    user: { type: mongoose.Types.ObjectId,
            ref: 'User'
         },
    userName:{type :String,required:true}

},{timestamps: true});


module.exports.Polls = mongoose.model("Polls" ,PollSchema)