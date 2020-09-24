const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    body:{
        type:String,
        require:true
    },
    postedBy:{
        type: ObjectId, //id of the user who have created this post
        ref: "User" //this will refer to the User model
    }
},{timestamps:true})

mongoose.model("Note", noteSchema)