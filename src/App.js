import { useState } from "react";
import "./App.css";
import Note from "./Note";

const App = (props) => {
  console.log(props);
  const { notes } = props;

  return (
    <div className="App">
      <header className="App-header">Header</header>
      <ul>
        {notes.map((note) => (
          <Note note={note}></Note>
        ))}
      </ul>
    </div>
  );
};

export default App;
