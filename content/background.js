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
  } else if (request.message === "pdf") {
    sendResponse({ message: "background.js pdf opened" });

    chrome.tabs.create({ url: request.url });
  }
});

function main(tab) {
  let currentTab = tab;
}
