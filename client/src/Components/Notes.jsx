import React from 'react'


function Notes(props){
    let s = props.body;
    let trimContent = s.substring(0,30);
    trimContent = trimContent + ".................";

    const handleClick=()=>{
        props.onDelete(props.id);
    } 
    return (
        <div className="note">
          <h1 className="note-h1">{props.title}</h1>
          <p className="note-p">{props.body.length<30 ? props.body : trimContent}</p>
          <button className="note-button" onClick={handleClick}>DELETE</button>
        </div>
      );
}

export default Notes;


  // useEffect(() => {
    //     fetch('/getAllNotes', {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             'Authorization': "Bearer "+ localStorage.getItem("jwt")
    //         }
    //     }).then(res => res.json())
    //     .then(data => {
    //         setNotes(data.mypost)
    //     })
    // },[])
    
//     data-target="modal1" className="note modal-trigger" onClick={searchModal}
//      {/* Modal Structure  classname modal useRef is referring to in the useEffect*/}
//           {/* Modal Structure  */}
//           <div id="modal1" class="modal" ref={searchModal}>
//             <div class="modal-content">
//               <h4>Modal Header</h4>
//               <p>A bunch of text</p>
//             </div>
//             <div class="modal-footer">
//               <a class="modal-close waves-effect waves-green btn-flat">Agree</a>
//             </div>
//           </div>


// const searchModal = useRef(null)
// useEffect(()=>{
//     M.Modal.init(searchModal.current)
// },[])
