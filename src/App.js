import { useEffect, useState } from "react";
import "./App.css";
import Note from "./Note";
import axios from "axios";
import noteService from "./services/notes";

const App = (props) => {
  //console.log(props);
  // const { notes } = props;
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    // axios.get("http://localhost:3001/notes").then((response) => {
    noteService.getAll().then((response) => {
      console.log("promise fufilled");
      console.log(response);
      setNotes(response.data);
    });
  }, []);
  console.log("render", notes.length, "notes");

  const addNote = (event) => {
    event.preventDefault();
    //console.log("ButtonClicked", event.target);
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      //id: notes.length + 1,
    };

    // axios.post("http://localhost:3001/api/notes", noteObject)
    noteService.create(noteObject).then((response) => {
      console.log("promise fulfilled");
      console.log(response);
      setNotes(notes.concat(response.data));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = (id) => {
    console.log("Note", id, "needs to be toggled.");
    //const url = `http://localhost:3001/api/notes/${id}`;
    const note = notes.find((i) => i.id === id);
    const changedNote = { ...note, important: !note.important };
    // axios.put(url, changedNote)
    noteService
      .update(id, changedNote)
      .then((response) => {
        console.log("promise fulfilled");
        console.log(response);
        setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  return (
    <div className="App">
      <header className="App-header">Notes Header</header>

      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "Important" : "All"}
      </button>

      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportanceOf={() => toggleImportanceOf(note.id)}
          ></Note>
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
