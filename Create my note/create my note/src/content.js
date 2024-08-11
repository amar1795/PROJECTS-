// content.js
console.log('YouTube Notes content script loaded');

function getYouTubeVideoTitle() {
  const titleElement = document.querySelector('h1.title.style-scope.ytd-video-primary-info-renderer');
  return titleElement ? titleElement.textContent.trim() : 'YouTube Video';
}

document.addEventListener('yt-navigate-finish', () => {
  console.log('YouTube navigation finished');
  setTimeout(updateSidebarForCurrentVideo, 500); // 500ms delay
});

function getYouTubeVideoId(url) {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get('v');
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

function createNoteElement(videoId, timestamp, note) {
  const noteElement = document.createElement('div');
  noteElement.className = 'note';
  noteElement.dataset.videoId = videoId;
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
  editBtn.addEventListener('click', () => editNote(noteElement, videoId, timestamp, note));

  const deleteBtn = noteElement.querySelector('.delete-note-btn');
  deleteBtn.addEventListener('click', () => deleteNote(noteElement, videoId, timestamp));

  return noteElement;
}

function editNote(noteElement, videoId, timestamp, currentContent,callback) {
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

      // Update the note in storage
      chrome.storage.sync.get('allNotes', function(data) {
        let allNotes = data.allNotes || {};
        if (allNotes[videoId] && allNotes[videoId].notes) {
          const noteIndex = allNotes[videoId].notes.findIndex(n => n.timestamp === timestamp);
          if (noteIndex !== -1) {
            allNotes[videoId].notes[noteIndex].content = newContent;
            chrome.storage.sync.set({ allNotes: allNotes }, function() {
              console.log('Note updated for video:', videoId);
              if (callback) callback(newContent);

            });
          }
        }
      });



    }
  });

  cancelBtn.addEventListener('click', restoreOriginalContent);

  editInput.focus();
}

function deleteNote(noteElement, videoId, timestamp) {
  if (confirm('Are you sure you want to delete this note?')) {
    chrome.storage.sync.get('allNotes', function(data) {
      let allNotes = data.allNotes || {};
      if (allNotes[videoId] && allNotes[videoId].notes) {
        allNotes[videoId].notes = allNotes[videoId].notes.filter(n => n.timestamp !== timestamp);
        chrome.storage.sync.set({ allNotes: allNotes }, function() {
          console.log('Note deleted for video:', videoId);
          noteElement.remove(); // Remove from UI
          // If in "All Notes" view, refresh the display
          if (document.getElementById('all-notes-container')) {
            displayAllNotes();
          } else {
            // If in single video view, refresh notes for current video
            loadNotesForVideo(videoId);
          }
        });
      }
    });
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
  } else {
    console.log('Sidebar or toggle button not found');
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
    const videoId = note.dataset.videoId;

    if (editBtn) {
      editBtn.addEventListener('click', () => {
        editNote(note, videoId, timestamp, content, (updatedContent) => {
          note.querySelector('.note-content').textContent = updatedContent;
        });
      });
    }
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => deleteNote(note, videoId, timestamp));
    }
  });
}

function deleteVideoNotes(videoId) {
  if (confirm('Are you sure you want to delete all notes for this video?')) {
    chrome.storage.sync.get('allNotes', function(data) {
      let allNotes = data.allNotes || {};
      if (allNotes[videoId]) {
        delete allNotes[videoId];
        chrome.storage.sync.set({ allNotes: allNotes }, function() {
          console.log('All notes deleted for video:', videoId);
          // Refresh the All Notes view
          displayAllNotes();
        });
      }
    });
  }
}

function clearAllNotes() {
  if (confirm('Are you sure you want to delete all notes for all videos? This action cannot be undone.')) {
    chrome.storage.sync.set({ allNotes: {} }, function() {
      console.log('All notes have been cleared');
      // Refresh the All Notes view
      displayAllNotes();
      loadNotesForVideo(videoId);

    });
  }
}

function displayAllNotes() {
  const currentVideoContent = document.getElementById('sidebar-main-content').innerHTML;
  const sidebarMainContent = document.getElementById('sidebar-main-content');
  
  if (!sidebarMainContent) {
    console.log('Sidebar main content not found');
    return;
  }

  sidebarMainContent.innerHTML = `
    <h1>All Notes</h1>
        <button id="clear-all-notes">Clear All Notes</button>

    <div id="all-notes-container"></div>
    <button id="back-to-current-video">Back to Current Video</button>
  `;

  const allNotesContainer = document.getElementById('all-notes-container');
  
  chrome.storage.sync.get('allNotes', function(data) {
    const allNotes = data.allNotes || {};
     if (Object.keys(allNotes).length === 0) {
      allNotesContainer.innerHTML = '<p>No notes found.</p>';
    } else {
    
    Object.entries(allNotes).forEach(([videoId, videoNotes]) => {
      const videoNotesElement = document.createElement('div');
      videoNotesElement.className = 'video-notes';
      videoNotesElement.innerHTML = `
      <div class="video-title-container">
        <h2 class="video-title">${videoNotes.title}</h2>
        <button class="delete-video-notes" data-video-id="${videoId}">Delete</button>
      </div>
      <div class="video-notes-content"></div>
    `;

      const notesContent = videoNotesElement.querySelector('.video-notes-content');
      if (videoNotes.notes && videoNotes.notes.length > 0) {
        videoNotes.notes.forEach(note => {
          const noteElement = createNoteElement(videoId,note.timestamp, note.content);
           // Modify the edit button click event
           const editBtn = noteElement.querySelector('.edit-note-btn');
           editBtn.addEventListener('click', () => {
             editNote(noteElement, videoId, note.timestamp, note.content, (updatedContent) => {
               // Update the note content in the UI
               noteElement.querySelector('.note-content').textContent = updatedContent;
             });
           });
          notesContent.appendChild(noteElement);
        });
      } else {
        notesContent.innerHTML = '<p>No notes for this video.</p>';
      }

      allNotesContainer.appendChild(videoNotesElement);
    });
  }
      // Add event listeners for delete buttons
      const deleteButtons = document.querySelectorAll('.delete-video-notes');
      deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
          const videoId = this.getAttribute('data-video-id');
          deleteVideoNotes(videoId);
        });
      });
  
  });

  

  document.getElementById('back-to-current-video').addEventListener('click', () => {
    restoreCurrentVideoView();
  });

    // Add event listener for Clear All Notes button
  document.getElementById('clear-all-notes').addEventListener('click', clearAllNotes);

}


function restoreCurrentVideoView() {
  const sidebarMainContent = document.getElementById('sidebar-main-content');
  if (sidebarMainContent) {
    sidebarMainContent.innerHTML = createSidebarContent();
    const videoId = getYouTubeVideoId(location.href);
    loadNotesForVideo(videoId);
    initializeSidebarEventListeners();
  } else {
    console.log('Sidebar main content not found');
  }
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
  const existingNoteInfo = noteExistsForTimestamp(timestamp);

  if (existingNoteInfo) {
    editNote(existingNoteInfo.element, getYouTubeVideoId(location.href), timestamp, existingNoteInfo.content);
    return;
  }

  const noteInput = document.createElement('div');
  noteInput.className = 'note-input';
  noteInput.innerHTML = `
    <p class="note-timestamp">${timestamp}</p>
    <textarea class="note-content-input" rows="3"></textarea>
    <button class="save-note-btn">Add Note</button>
  `;

  const notesContainer = document.getElementById('notes-container');
  notesContainer.appendChild(noteInput);

  const saveBtn = noteInput.querySelector('.save-note-btn');
  const textarea = noteInput.querySelector('.note-content-input');

  saveBtn.addEventListener('click', () => {
    const noteContent = textarea.value.trim();
    if (noteContent) {
      const videoId = getYouTubeVideoId(location.href);
      const noteElement = createNoteElement(videoId, timestamp, noteContent);
      notesContainer.insertBefore(noteElement, noteInput);
      noteInput.remove();
      document.getElementById('add-note-btn').style.display = 'block';
      saveCurrentNotes();
    }
  });

  textarea.focus();
  document.getElementById('add-note-btn').style.display = 'none';
}

function updateSidebarForCurrentVideo(retryCount = 0) {
  const videoId = getYouTubeVideoId(location.href);
  const videoTitle = getYouTubeVideoTitle();
  
  if (!videoTitle && retryCount < 5) {
    setTimeout(() => updateSidebarForCurrentVideo(retryCount + 1), 200);
    return;
  }
  
  // Update sidebar content
  const sidebarMainContent = document.getElementById('sidebar-main-content');

  if (!sidebarMainContent) {
    console.log('Sidebar not found, attempting to create it');
    addSidebar();
    setTimeout(() => updateSidebarForCurrentVideo(retryCount + 1), 200);
    return;
  }
  sidebarMainContent.innerHTML = createSidebarContent(videoTitle);

  // Load notes for the current video
  loadNotesForVideo(videoId);

  // Reinitialize event listeners
  initializeSidebarEventListeners();
}

function saveCurrentNotes() {
  const videoId = getYouTubeVideoId(location.href);
  const videoTitle = getYouTubeVideoTitle();
  const notes = Array.from(document.querySelectorAll('.note')).map(note => ({
    timestamp: note.querySelector('.note-timestamp .timestamp-link').textContent,
    content: note.querySelector('.note-content').textContent
  }));

  chrome.storage.sync.get('allNotes', function(data) {
    let allNotes = data.allNotes || {};
    allNotes[videoId] = { title: videoTitle, notes: notes };
    chrome.storage.sync.set({ allNotes: allNotes }, function() {
      console.log('Notes saved for video:', videoId);
    });
  });
}

function loadNotesForVideo(videoId) {
  chrome.storage.sync.get('allNotes', function(data) {
    const allNotes = data.allNotes || {};
    const videoNotes = allNotes[videoId];
    
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = ''; // Clear existing notes
    
    if (videoNotes && videoNotes.notes) {
      // Sort notes by timestamp
      videoNotes.notes.sort((a, b) => {
        return convertTimestampToSeconds(a.timestamp) - convertTimestampToSeconds(b.timestamp);
      });

      videoNotes.notes.forEach(note => {
        const noteElement = createNoteElement(videoId, note.timestamp, note.content);
        notesContainer.appendChild(noteElement);
      });
    }
    console.log('Loaded notes for video:', videoId);
  });
}

function addSidebar() {

  if (document.getElementById('yt-notes-sidebar-container')) {
    console.log('Sidebar already exists');
    return;
  }

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
    } else {
      console.log('Sidebar or toggle button not found');
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

  // Initialize sidebar content for the current video
  updateSidebarForCurrentVideo();

  // Set up MutationObserver to detect URL changes
  let lastUrl = location.href; 
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(updateSidebarForCurrentVideo, 500); // 500ms delay
    }
  }).observe(document, {subtree: true, childList: true});

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