const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
// const User = mongoose.model("User")
const Note = mongoose.model("Note")
const requireLogin = require("../Middleware/requireLogin")

//POST route to create google note 
router.post("/createNote", requireLogin, (req,res)=>{
    const {title, body} = req.body
    if(!title || !body){
        return res.status(422).json({error: "Enter both title and notes description" })
    }
    // saving note in the database and sending it to the frontend
    const googleNote = new Note({
        title: title,
        body: body,
        postedBy: req.user
    })
    googleNote.save()
        .then(result=>{
            res.json({note: result})
        }).catch(err=>{
            console.log(err)
        })

})

//get all the notes posted by the logged in user
router.get("/getAllNotes", requireLogin, (req,res)=>{
    Note.find({postedBy:req.user._id})
    .populate("PostedBy","_id name")
    .sort('-createdAt')
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

//DELETE NOTES
router.delete("/deleteNote/:id", requireLogin, (req,res)=>{
    const noteId = req.params.id;
    // console.log(noteId)
    Note.findOne({ _id: noteId })
    .populate("postedBy","_id")
    .exec((err, note)=>{
        if(err || !note){
            return res.status(422).json({error:err})
        }

        //we have to match that the user who requested to delete the post is equal to the user who has loggen in
        if(note.postedBy._id.toString() === req.user._id.toString()){
            note.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                console.log(err)
            })
      }
    })
})

module.exports = router