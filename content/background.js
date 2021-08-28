chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "ready") {
    sendResponse({ message: "background.js ready" });
    chrome.tabs.query(
      {
        url: "https://platform.virdocs.com/*",
      },
      (tabs) => {
        main(tabs[0]);
      }
    );
  }
});

function main(tab) {
  let currentTab = tab;
}
