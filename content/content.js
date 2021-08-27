chrome.tabs.query(
  {
    currentWindow: true,
    active: true,
  },
  function (tabs) {
    chrome.debugger.attach(
      {
        tabId: tabs[0].id,
      },
      "1.3",
      onAttach.bind(null, tabs[0].id)
    );
  }
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
    return;
  }

  if (message == "Network.responseReceived") {
    //response return
    chrome.debugger.sendCommand(
      {
        tabId: debuggeeId.tabId,
      },
      "Network.getResponseBody",
      {
        requestId: params.requestId,
      },
      function (response) {
        console.log("response :>> ", response);
      }
    );
  }
}
