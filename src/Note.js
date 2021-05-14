import React from "react";

const Note = (props) => {
  const { note, toggleImportanceOf } = props;
  const label = note.important ? "setUnimportant" : "setImportant";

  return (
    <div>
      <li>
        <button onClick={toggleImportanceOf}>{label}</button>
        {note.content}
      </li>
    </div>
  );
};

export default Note;
