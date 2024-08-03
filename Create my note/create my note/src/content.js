const injectSidebar = () => {
    const sidebarFrame = document.createElement('iframe');
    sidebarFrame.style.display = 'none';
    sidebarFrame.src = chrome.runtime.getURL('sidebar.html');
    document.body.appendChild(sidebarFrame);
  
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('sidebar.css');
    document.head.appendChild(link);
  
    const toggleButton = document.createElement('div');
    toggleButton.id = 'toggle-button';
    toggleButton.innerText = 'Notes';
    document.body.appendChild(toggleButton);
  
    toggleButton.addEventListener('click', () => {
      sidebarFrame.contentWindow.postMessage({ action: 'toggleSidebar' }, '*');
    });
  };
  
  injectSidebar();
  