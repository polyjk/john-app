import React from "react";
import ReactDOM from "react-dom";

const Note = (props) => {
  const { note } = props;

  return (
    <div>
      <li>{note.content}</li>
    </div>
  );
};

export default Note;
