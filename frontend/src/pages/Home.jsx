import { useEffect, useState } from "react";

function Home() {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null); // State to manage the note being edited

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("http://localhost:5555/notes");
      const notes = await response.json();
      setNotes(notes.data);
      console.log(notes.data);
    };

    fetchNotes();
  }, [notes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const date = e.target.date.value;

    if (editNote) {
      // If we're editing a note, send a PUT request to update it
      const response = await fetch(
        `http://localhost:5555/notes/${editNote._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content, date }),
        }
      );
      const updatedNote = await response.json();
      setNotes(
        notes.map((note) =>
          note._id === editNote._id ? updatedNote.data : note
        )
      );
      setEditNote(null); // Clear edit state after update
    } else {
      // If we're adding a new note, send a POST request
      const response = await fetch("http://localhost:5555/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, date }),
      });
      const note = await response.json();
      setNotes([...notes, note.data]);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5555/notes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setNotes(notes.filter((note) => note._id !== id)); // Remove deleted note from state
    }
  };

  const handleEdit = (note) => {
    setEditNote(note); // Set the note being edited
  };

  return (
    <div className="main">
      <h1>NotesX</h1>
      <div className="grid">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={editNote ? editNote.title : ""}
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            defaultValue={editNote ? editNote.content : ""}
          />
          <input
            type="date"
            name="date"
            placeholder="Date"
            defaultValue={editNote ? editNote.date : ""}
          />
          <button type="submit">{editNote ? "Update Note" : "Add Note"}</button>
        </form>

        <div className="notes">
          {notes.map((note) => (
            <div key={note._id} className="note-div">
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <p>{note.date}</p>
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button onClick={() => handleDelete(note._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
