import React, { useState, useEffect } from 'react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

const Sidebar = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    chrome.storage.local.get('notes', (data) => {
      setNotes(data.notes || []);
    });
  }, []);

  const addNote = (timestamp, text) => {
    const newNote = { timestamp, text };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    chrome.storage.local.set({ notes: updatedNotes });
  };

  return (
    <div>
      <NoteForm addNote={addNote} />
      <NoteList notes={notes} />
    </div>
  );
};

export default Sidebar;
