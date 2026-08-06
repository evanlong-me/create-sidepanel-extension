export {}

console.log('Background script loaded!', { id: chrome.runtime.id })

// Handle extension icon click to open sidepanel
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    await chrome.sidePanel.open({ tabId: tab.id })
  }
})

// Set up sidepanel options on install
chrome.runtime.onInstalled.addListener(async () => {
  await chrome.sidePanel.setOptions({
    path: 'sidepanel.html',
    enabled: true
  })

  await chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true
  })
})
