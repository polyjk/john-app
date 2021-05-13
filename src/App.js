import { useEffect, useState } from "react";
import "./App.css";
import Note from "./Note";
import axios from "axios";

const App = (props) => {
  //console.log(props);
  // const { notes } = props;
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((response) => {
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

    axios.post("http://localhost:3001/notes", noteObject).then((response) => {
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

  return (
    <div className="App">
      <header className="App-header">Notes Header</header>

      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "Important" : "All"}
      </button>

      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note}></Note>
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
