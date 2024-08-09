// Create the sidebar button
const sidebarButton = document.createElement('button');
sidebarButton.innerText = '☰';
sidebarButton.id = 'yt-notes-sidebar-toggle';
document.body.appendChild(sidebarButton);

// Create the sidebar
const sidebar = document.createElement('div');
sidebar.id = 'yt-notes-sidebar';
document.body.appendChild(sidebar);

// Toggle sidebar visibility
sidebarButton.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Inject your React app into the sidebar
const script = document.createElement('script');
script.src = chrome.runtime.getURL('src/sidebar.js');
document.body.appendChild(script);