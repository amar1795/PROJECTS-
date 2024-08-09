// background.js
chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("youtube.com")) {
    chrome.tabs.sendMessage(tab.id, {action: "toggleSidebar"});
  }
});