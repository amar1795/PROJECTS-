// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const addNoteButton = document.getElementById('add-note');
    const notesContainer = document.getElementById('notes-container');
  
    function displayNotes() {
      chrome.storage.local.get(['notes'], (result) => {
        const notes = result.notes || [];
        notesContainer.innerHTML = notes.map(note => `
          <div class="note">
            <p>Time: ${note.timestamp}</p>
            <p>${note.note}</p>
          </div>
        `).join('');
      });
    }
  
    addNoteButton.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => {
            const timestamp = prompt('Enter the video timestamp:');
            const note = prompt('Enter your note:');
            if (timestamp && note) {
              chrome.storage.local.get(['notes'], (result) => {
                const notes = result.notes || [];
                notes.push({ timestamp, note });
                chrome.storage.local.set({ notes });
              });
            }
          }
        });
      });
    });
  
    displayNotes();
  });
  