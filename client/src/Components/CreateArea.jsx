import React, { useEffect, useState } from 'react'
import M from 'materialize-css';
import Notes from './Notes';

function CreateArea(){
    const [isExpanded, setExpand] = useState(false);
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [notes, setNotes] = useState([]);
     
    //UPLOADING NOTES TO THE BACKEND
    const submitNote=(e)=>{
        e.preventDefault();
        
        fetch('/createNote', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer "+ localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title,
                body
            })
        }).then(res => res.json())
        .then(note =>{
            if(note.error){
                M.toast({html: note.error,classes:"#c62828 red darken-3"})
            }
            else{
                setTitle('');
                setBody('');
                setExpand(false);
                // getAllNotes();
            }
            
        })
    }

    const handleOnClick=()=>{
        setExpand(true)
    }

    //FETCHING ALL THE NOTES
    useEffect(() => {
        fetch('/getAllNotes', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(data => {
            setNotes(data.mypost)
            // console.log("All the notes posted by user:", notes)
        })
    },[isExpanded])
   
    //DELETE NOTE
    const deleteNote=(id)=>{
        // console.log(id);
        fetch(`/deleteNote/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            const newNotes = notes.filter(note=>{
                return note._id !== result._id
            })
            setNotes(newNotes)
            M.toast({html: "deleted NOTE successfully",classes:"#43a047 green darken-1"})
        })
    }
    
    return(
    <div>
      <form className="create-note">
        { isExpanded && 
            <input 
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="create-note-text"
                autoFocus
            ></input> }
            <textarea
                name="body"
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                onClick={handleOnClick}
                placeholder="Take a note...."
                className="create-note-text"
                rows={isExpanded ? "3" : "1"}
            ></textarea>
            <a className="btn-floating right btn-large waves-effect waves-light" onClick={submitNote}>
                <i className="material-icons">add</i>
            </a>
        </form>
        
        <div className="notes-container">
            {notes.map(note => {
                return (
                    <Notes 
                        key={note._id}
                        id={note._id}
                        title={note.title}
                        body={note.body}
                        onDelete={deleteNote}
                    />
                )
            })}
        </div>
       
        
    </div>
    )
}

export default CreateArea;