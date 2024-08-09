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
    </div>
  `;
}

function createNoteElement(timestamp, note) {
  const noteElement = document.createElement('div');
  noteElement.className = 'note';
  noteElement.innerHTML = `
    <p class="note-timestamp"><a href="#" class="timestamp-link">${timestamp}</a></p>
    <p class="note-content">${note}</p>
  `;

  const timestampLink = noteElement.querySelector('.timestamp-link');
  timestampLink.addEventListener('click', (e) => {
    e.preventDefault();
    seekToTimestamp(timestamp);
  });

  return noteElement;
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

function addNoteInput() {
  const timestamp = formatTime(getCurrentVideoTime());
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