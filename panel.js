chrome.devtools.network.onRequestFinished.addListener((request) => {
  request.getContent((body) => {
    if (request.request && request.request.url) {
      console.log("body :>> ", body);

      const regex = /^https.+?(?=\.)\.virdocs.com.+?(?=xhtml)xhtml/;
      if (request.request.url.match(regex)) {
        console.log("body :>> ", body);
        //   chrome.runtime.sendMessage({
        //       response: body
        //   });
      }
    }
  });
});
