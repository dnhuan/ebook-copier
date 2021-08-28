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

  console.send = function () {
    chrome.tabs.sendMessage(currentTab.id, {
      payload: [...arguments].join(" | "),
    });
  };

  chrome.debugger.attach(
    {
      tabId: currentTab.id,
    },
    "1.3",
    onAttach.bind(null, currentTab.id)
  );

  function onAttach(tabId) {
    chrome.debugger.sendCommand(
      {
        tabId: tabId,
      },
      "Network.enable"
    );

    chrome.debugger.onEvent.addListener(allEventHandler);
  }

  function allEventHandler(debuggeeId, message, params) {
    if (currentTab.id != debuggeeId.tabId) {
      console.send("Debug tab ID mismatched");
      return;
    }
    if (message == "Network.responseReceived") {
      //response return
      if (
        params.response.url.match(
          /^https.+?(?=\.)\.virdocs.com.+?(?=xhtml)xhtml/
        )
      ) {
        chrome.debugger.sendCommand(
          {
            tabId: debuggeeId.tabId,
          },
          "Network.getResponseBody",
          {
            requestId: params.requestId,
          },
          function (response) {
            if (response) {
              console.send(response.body);
            }
          }
        );
      }
    }
  }
}
