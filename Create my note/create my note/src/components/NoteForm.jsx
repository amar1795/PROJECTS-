import React, { useState } from 'react';

const NoteForm = ({ addNote }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const video = document.querySelector('video');
    if (video) {
      const timestamp = video.currentTime;
      addNote(timestamp, text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter note"
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
