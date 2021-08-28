console.log("Start messenger.js");
chrome.runtime.sendMessage({ message: "ready" }, (res) => {
  console.log(res.message);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background |", JSON.stringify(message.payload));
});
