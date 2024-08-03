// Function to inject UI below the YouTube video
function injectUI() {
    // Check if the UI is already injected
    if (document.getElementById('youtube-notes-ui')) return;
  
    // Create container for the UI
    const uiContainer = document.createElement('div');
    uiContainer.id = 'youtube-notes-ui';
    uiContainer.style.position = 'fixed';
    uiContainer.style.bottom = '0';
    uiContainer.style.left = '0';
    uiContainer.style.width = '100%';
    uiContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    uiContainer.style.color = 'white';
    uiContainer.style.padding = '10px';
    uiContainer.style.zIndex = '1000';
    uiContainer.style.boxShadow = '0 -2px 10px rgba(0, 0, 0, 0.5)';
  
    // Create input for adding notes
    const noteInput = document.createElement('input');
    noteInput.type = 'text';
    noteInput.id = 'note-input';
    noteInput.placeholder = 'Enter your note here...';
    noteInput.style.width = '80%';
    noteInput.style.padding = '5px';
  
    // Create button to add notes
    const addButton = document.createElement('button');
    addButton.innerText = 'Add Note';
    addButton.id = 'add-note-button';
    addButton.style.marginLeft = '10px';
    addButton.style.padding = '5px 10px';
    addButton.style.backgroundColor = '#4CAF50';
    addButton.style.color = 'white';
    addButton.style.border = 'none';
    addButton.style.cursor = 'pointer';
  
    // Create container for existing notes
    const notesContainer = document.createElement('div');
    notesContainer.id = 'notes-container';
    notesContainer.style.marginTop = '10px';
  
    // Append elements to the UI container
    uiContainer.appendChild(noteInput);
    uiContainer.appendChild(addButton);
    uiContainer.appendChild(notesContainer);
  
    // Insert UI container into the page
    document.body.appendChild(uiContainer);
  }
  
  // Function to add a timeline marker
  function addTimelineMarker(timestamp) {
    const videoPlayer = document.querySelector('video');
    if (videoPlayer) {
      // Calculate the time in seconds from the timestamp
      const time = parseFloat(timestamp);
      if (!isNaN(time)) {
        // Create a marker element
        const marker = document.createElement('div');
        marker.className = 'timeline-marker';
        marker.style.position = 'absolute';
        marker.style.left = `${(time / videoPlayer.duration) * 100}%`;
        marker.style.top = '0';
        marker.style.width = '5px';
        marker.style.height = '100%';
        marker.style.backgroundColor = 'red';
        marker.style.cursor = 'pointer';
        marker.title = `Note at ${timestamp}`;
  
        // Add click event to show note
        marker.addEventListener('click', () => {
          chrome.storage.local.get(['notes'], (result) => {
            const notes = result.notes || [];
            const note = notes.find(n => n.timestamp === timestamp);
            if (note) {
              alert(`Note: ${note.note}`);
            }
          });
        });
  
        videoPlayer.parentElement.appendChild(marker);
      }
    }
  }
  
  // Function to load notes and add markers
  function loadNotes() {
    chrome.storage.local.get(['notes'], (result) => {
      const notes = result.notes || [];
      notes.forEach(note => addTimelineMarker(note.timestamp));
    });
  }
  
  // Inject UI and load existing notes
  injectUI();
  loadNotes();
  
  // Handle add note button click
  document.addEventListener('click', (event) => {
    if (event.target.id === 'add-note-button') {
      const noteInput = document.getElementById('note-input');
      const noteText = noteInput.value.trim();
      if (noteText) {
        const videoPlayer = document.querySelector('video');
        if (videoPlayer) {
          const timestamp = (videoPlayer.currentTime).toFixed(2);
          chrome.storage.local.get(['notes'], (result) => {
            const notes = result.notes || [];
            notes.push({ timestamp, note: noteText });
            chrome.storage.local.set({ notes }, () => {
              addTimelineMarker(timestamp); // Add new marker
              noteInput.value = ''; // Clear input
            });
          });
        }
      }
    }
  });
  