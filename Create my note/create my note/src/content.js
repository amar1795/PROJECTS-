// content.js
console.log('YouTube Notes content script loaded');

function createSidebarContent() {
  return `
    <div id="sidebar-main-content">
      <h1>Sidebar Test Content</h1>
      <p>If you can see this, the sidebar is working!</p>
      <h2>Notes</h2>
      <p>Here are some notes!</p>
      <h1>Hello</h1>
    </div>
    <div id="sidebar-right-column">
      <button id="hide-sidebar-button">Hide Sidebar</button>
    </div>
  `;
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
  }

  toggleButton.addEventListener('click', toggleSidebar);

  // Hide sidebar button
  const hideSidebarButton = document.getElementById('hide-sidebar-button');
  hideSidebarButton.addEventListener('click', toggleSidebar);

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
    }
  }
});

// Run the function after a short delay to ensure the DOM is ready
setTimeout(addSidebar, 1000);