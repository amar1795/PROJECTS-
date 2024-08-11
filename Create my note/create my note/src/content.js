// content.js
console.log('YouTube Notes content script loaded');

function getYouTubeVideoTitle() {
  const titleElement = document.querySelector('h1.title.style-scope.ytd-video-primary-info-renderer');
  return titleElement ? titleElement.textContent.trim() : 'YouTube Video';
}

function getCurrentVideoTime() {
  const video = document.querySelector('video');
  return video ? video.currentTime : 0;
}

function formatTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function createSidebarContent() {
  const videoTitle = getYouTubeVideoTitle();
  return `
    <div id="sidebar-main-content">
      <h1 id="video-title">${videoTitle}</h1>
      <div id="notes-container"></div>
      <button id="add-note-btn">Add Note</button>
    </div>
    <div id="sidebar-right-column">
      <button id="hide-sidebar-button">Hide Sidebar</button>
            <button id="all-notes-button">All Notes</button>

    </div>
  `;
}

function createNoteElement(timestamp, note) {
  const noteElement = document.createElement('div');
  noteElement.className = 'note';
  noteElement.innerHTML = `
    <div class="note-header">
      <p class="note-timestamp"><a href="#" class="timestamp-link">${timestamp}</a></p>
      <div class="note-actions">
        <button class="edit-note-btn">Edit</button>
        <button class="delete-note-btn">Delete</button>
      </div>
    </div>
    <p class="note-content">${note}</p>
  `;

  const timestampLink = noteElement.querySelector('.timestamp-link');
  timestampLink.addEventListener('click', (e) => {
    e.preventDefault();
    seekToTimestamp(timestamp);
  });

  const editBtn = noteElement.querySelector('.edit-note-btn');
  editBtn.addEventListener('click', () => editNote(noteElement, timestamp, note));

  const deleteBtn = noteElement.querySelector('.delete-note-btn');
  deleteBtn.addEventListener('click', () => deleteNote(noteElement));

  return noteElement;
}


function editNote(noteElement, timestamp, currentContent) {
  const contentElement = noteElement.querySelector('.note-content');
  const editInput = document.createElement('textarea');
  editInput.value = currentContent;
  editInput.rows = 3;
  editInput.className = 'edit-note-input';

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'edit-buttons';

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.className = 'save-edit-btn';

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.className = 'cancel-edit-btn';

  buttonContainer.appendChild(saveBtn);
  buttonContainer.appendChild(cancelBtn);

  contentElement.replaceWith(editInput);
  noteElement.appendChild(buttonContainer);

  function restoreOriginalContent() {
    const newContentElement = document.createElement('p');
    newContentElement.className = 'note-content';
    newContentElement.textContent = currentContent;
    editInput.replaceWith(newContentElement);
    buttonContainer.remove();
  }

  saveBtn.addEventListener('click', () => {
    const newContent = editInput.value.trim();
    if (newContent) {
      const newContentElement = document.createElement('p');
      newContentElement.className = 'note-content';
      newContentElement.textContent = newContent;
      editInput.replaceWith(newContentElement);
      buttonContainer.remove();
    }
  });

  cancelBtn.addEventListener('click', restoreOriginalContent);

  editInput.focus();
}

function deleteNote(noteElement) {
  if (confirm('Are you sure you want to delete this note?')) {
    noteElement.remove();
  }
}

function getAllNotes() {
  // This is a placeholder. You should implement actual storage and retrieval.
  // For now, we'll return mock data.
  return [
    {
      title: "Video 1",
      notes: [
        { timestamp: "00:01:23", content: "Note 1 for Video 1" },
        { timestamp: "00:02:34", content: "Note 2 for Video 1" }
      ]
    },
    {
      title: "Video 2",
      notes: [
        { timestamp: "00:00:45", content: "Note 1 for Video 2" },
        { timestamp: "00:03:21", content: "Note 2 for Video 2" }
      ]
    }
  ];
}

 // Toggle sidebar visibility
 function toggleSidebar() {
  sidebar.classList.toggle('visible');
  toggleButton.style.display = sidebar.classList.contains('visible') ? 'none' : 'block';
  
  // Update video title when sidebar is opened
  if (sidebar.classList.contains('visible')) {
    const titleElement = document.getElementById('video-title');
    if (titleElement) {
      titleElement.textContent = getYouTubeVideoTitle();
    }
  }
}

function initializeSidebarEventListeners() {
  const addNoteBtn = document.getElementById('add-note-btn');
  if (addNoteBtn) {
    addNoteBtn.addEventListener('click', addNoteInput);
  }

  const hideSidebarButton = document.getElementById('hide-sidebar-button');
  if (hideSidebarButton) {
    hideSidebarButton.addEventListener('click', toggleSidebar);
  }

  const allNotesButton = document.getElementById('all-notes-button');
  if (allNotesButton) {
    allNotesButton.addEventListener('click', displayAllNotes);
  }

  // Re-attach event listeners to existing notes
  const notes = document.querySelectorAll('.note');
  notes.forEach(note => {
    const editBtn = note.querySelector('.edit-note-btn');
    const deleteBtn = note.querySelector('.delete-note-btn');
    const timestamp = note.querySelector('.note-timestamp .timestamp-link').textContent;
    const content = note.querySelector('.note-content').textContent;

    if (editBtn) {
      editBtn.addEventListener('click', () => editNote(note, timestamp, content));
    }
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => deleteNote(note));
    }
  });
}

function displayAllNotes() {
  const allNotes = getAllNotes(); // We'll implement this function next
  const sidebarMainContent = document.getElementById('sidebar-main-content');
  const currentVideoContent = document.getElementById('sidebar-main-content').innerHTML;

  sidebarMainContent.innerHTML = `
    <h1>All Notes</h1>
    <div id="all-notes-container"></div>
    <button id="back-to-current-video">Back to Current Video</button>
  `;

  const allNotesContainer = document.getElementById('all-notes-container');
  
  allNotes.forEach(videoNotes => {
    const videoNotesElement = document.createElement('div');
    videoNotesElement.className = 'video-notes';
    videoNotesElement.innerHTML = `
      <h2 class="video-title">${videoNotes.title}</h2>
      <div class="video-notes-content"></div>
    `;

    const notesContent = videoNotesElement.querySelector('.video-notes-content');
    videoNotes.notes.forEach(note => {
      const noteElement = createNoteElement(note.timestamp, note.content);
      notesContent.appendChild(noteElement);
    });

    allNotesContainer.appendChild(videoNotesElement);
  });

  document.getElementById('back-to-current-video').addEventListener('click', () => {
    restoreCurrentVideoView(currentVideoContent);

  });
}

function restoreCurrentVideoView(content) {
  const sidebarMainContent = document.getElementById('sidebar-main-content');
  sidebarMainContent.innerHTML = content;
  initializeSidebarEventListeners();
}



function seekToTimestamp(timestamp) {
  const video = document.querySelector('video');
  if (video) {
    const timeInSeconds = convertTimestampToSeconds(timestamp);
    video.currentTime = timeInSeconds;
  }
}

function convertTimestampToSeconds(timestamp) {
  const [hours, minutes, seconds] = timestamp.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

// to check if a note already exists for the given timestamp
function noteExistsForTimestamp(timestamp) {
  const notes = document.querySelectorAll('.note');
  for (let note of notes) {
    const noteTimestamp = note.querySelector('.note-timestamp .timestamp-link').textContent;
    if (noteTimestamp === timestamp) {
      return {
        element: note,
        content: note.querySelector('.note-content').textContent,
        timestampElement: note.querySelector('.note-timestamp')
      };
    }
  }
  return null;
}

function addNoteInput() {
  const timestamp = formatTime(getCurrentVideoTime());

   // Check if a note already exists for this timestamp
   const existingNoteInfo = noteExistsForTimestamp(timestamp);

   if (existingNoteInfo) {
    // Trigger edit for existing note
    editNote(existingNoteInfo.element, timestamp, existingNoteInfo.content);

    return;
  }

  const noteInput = document.createElement('div');
  noteInput.className = 'note-input';
  noteInput.innerHTML = `
    <p class="note-timestamp">${timestamp}</p>
    <textarea class="note-content-input" rows="3"></textarea>
    <button class="save-note-btn">Add to Note</button>
  `;

  const notesContainer = document.getElementById('notes-container');
  notesContainer.appendChild(noteInput);

  const saveBtn = noteInput.querySelector('.save-note-btn');
  const textarea = noteInput.querySelector('.note-content-input');

  saveBtn.addEventListener('click', () => {
    const noteContent = textarea.value.trim();
    if (noteContent) {
      const noteElement = createNoteElement(timestamp, noteContent);
      notesContainer.insertBefore(noteElement, noteInput);
      notesContainer.removeChild(noteInput);
      document.getElementById('add-note-btn').style.display = 'block';
    }
  });

  textarea.focus();
  document.getElementById('add-note-btn').style.display = 'none';
}

function addSidebar() {
  // Create the sidebar container
  const sidebar = document.createElement('div');
  sidebar.id = 'yt-notes-sidebar-container';
  sidebar.innerHTML = createSidebarContent();
  
  document.body.appendChild(sidebar);

  // Create the toggle button
  const toggleButton = document.createElement('div');
  toggleButton.id = 'yt-notes-toggle-button';
  toggleButton.textContent = 'Toggle Sidebar';
  document.body.appendChild(toggleButton);

  // Toggle sidebar visibility
  function toggleSidebar() {
    sidebar.classList.toggle('visible');
    toggleButton.style.display = sidebar.classList.contains('visible') ? 'none' : 'block';
    
    // Update video title when sidebar is opened
    if (sidebar.classList.contains('visible')) {
      const titleElement = document.getElementById('video-title');
      if (titleElement) {
        titleElement.textContent = getYouTubeVideoTitle();
      }
    }
  }

  toggleButton.addEventListener('click', toggleSidebar);



  // Hide sidebar button
  const hideSidebarButton = document.getElementById('hide-sidebar-button');
  hideSidebarButton.addEventListener('click', toggleSidebar);

  // Add note button
  const addNoteBtn = document.getElementById('add-note-btn');
  addNoteBtn.addEventListener('click', addNoteInput);

  const allNotesBtn = document.getElementById('all-notes-button');
  allNotesBtn.addEventListener('click', displayAllNotes);

  console.log('Sidebar elements added');
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleSidebar") {
    const sidebar = document.getElementById('yt-notes-sidebar-container');
    const toggleButton = document.getElementById('yt-notes-toggle-button');
    if (sidebar && toggleButton) {
      sidebar.classList.toggle('visible');
      toggleButton.style.display = sidebar.classList.contains('visible') ? 'none' : 'block';
      
      // Update video title when sidebar is opened
      if (sidebar.classList.contains('visible')) {
        const titleElement = document.getElementById('video-title');
        if (titleElement) {
          titleElement.textContent = getYouTubeVideoTitle();
        }
      }
    }
  }
});

// Run the function after a short delay to ensure the DOM is ready
setTimeout(addSidebar, 1000);

// Listen for YouTube navigation events
let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
  }
}).observe(document, {subtree: true, childList: true});

function onUrlChange() {
  console.log('URL changed');
  const sidebar = document.getElementById('yt-notes-sidebar-container');
  if (sidebar && sidebar.classList.contains('visible')) {
    const titleElement = document.getElementById('video-title');
    if (titleElement) {
      titleElement.textContent = getYouTubeVideoTitle();
    }
  }
}