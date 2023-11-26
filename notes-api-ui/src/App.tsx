import { useState } from 'react';
import './index.css';

type Note = {
  id: number,
  title: string,
  content: string
}

function App() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "note title",
      content: "content 1"
    }
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("")

  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const handleNoteClick = (note: Note)=>{
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  const handleAddNote = (event: React.FormEvent) => {
     event.preventDefault();
    //  console.log("title", title);
    //  console.log("content", content);

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content
    }

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  }

  const handleUpdateNote=(event: React.FormEvent)=>{
    event.preventDefault();

    if(!selectedNote){
      return;
    }

    const updateNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content
    }

    const updateNotesList = notes.map((note) => 
      note.id === selectedNote.id ? updateNote : note
    )

    setNotes(updateNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  }

  const handleCancel = () => {
    setTitle("")
    setContent("")
    setSelectedNote(null);
  }

  const deleteNote = (event:React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    const updateNotes = notes.filter(
      (note)=> note.id !== noteId
    )

    setNotes(updateNotes)
  }

  return (
    <>
      <div className='app-container'>
        <form className='note-form' onSubmit={(event) => selectedNote ? handleUpdateNote(event) : handleAddNote(event)}>
          <input placeholder="title" required onChange={(event?)=> setTitle(event.target.value)} value={title}/>
          <textarea placeholder='Content' rows={10} onChange={(event)=>setContent(event?.target.value)} value={content} required></textarea>
          {selectedNote ? (
            <div className="edit-buttons space-x-4">
              <button type="submit">Save</button>
              <button onClick={handleCancel} className='bg-orang-500'>Cancel</button>
            </div>
          ) : (
            <button type="submit">Add Note</button>
          )}
        </form>
        <div className='notes-grid'>
          {
            notes.map((note)=>(
              <div className='note-item' onClick={()=> handleNoteClick(note)}>
                <div className="notes-header">
                  <button onClick={(event)=>deleteNote(event, note.id)}>
                    <i className='fa fa-times'></i>
                  </button>
                </div>
                <h2>{note.title}</h2>
                <p className="mt-14">{note.content}</p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default App;
