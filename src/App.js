import { useState } from "react";
import "./App.css";
import Note from "./Note";

const App = (props) => {
  console.log(props);
  // const { notes } = props;
  const [notes, setNotes] = useState(props.notes);

  const addNote = (event) => {
    event.preventDefault();
    console.log("ButtonClicked", event.target);
  };

  return (
    <div className="App">
      <header className="App-header">Header</header>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note}></Note>
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
