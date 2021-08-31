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
  } else if (request.message === "uri") {
    sendResponse({ message: "image opened" });

    chrome.tabs.create({ url: request.url });
  } else if (request.message === "download") {
    sendResponse({ message: `image ${request.filename}.png downloaded` });

    chrome.downloads.download({
      url: request.url,
      filename: request.filename + ".xhtml",
    });
  }
});

function main(tab) {
  let currentTab = tab;
}
