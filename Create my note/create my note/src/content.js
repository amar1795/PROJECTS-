// content.js
console.log('YouTube Notes content script loaded');

function createSidebarContent() {
  return `
    <div id="sidebar-content">
      <h1>Sidebar Test Content</h1>
      <p>If you can see this, the sidebar is working!</p>
      <h2>Notes</h2>
      <p>Here are some notes!</p>
      <h1>Hello</h1>
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
  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('visible');
  });

  console.log('Sidebar elements added');
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleSidebar") {
    const sidebar = document.getElementById('yt-notes-sidebar-container');
    if (sidebar) {
      sidebar.classList.toggle('visible');
    }
  }
});

// Run the function after a short delay to ensure the DOM is ready
setTimeout(addSidebar, 1000);