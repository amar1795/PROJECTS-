window.addEventListener('message', (event) => {
    if (event.data.action === 'toggleSidebar') {
      const sidebarContainer = document.getElementById('sidebar-container');
      if (sidebarContainer) {
        sidebarContainer.classList.toggle('visible');
      }
    }
  });
  