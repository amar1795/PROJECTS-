import React from 'react';

const NoteList = ({ notes }) => (
  <ul>
    {notes.map((note, index) => (
      <li key={index}>
        {new Date(note.timestamp * 1000).toISOString().substr(11, 8)}: {note.text}
      </li>
    ))}
  </ul>
);

export default NoteList;
