window.addEventListener("load", waitForBookContent, false);

function waitForBookContent() {
  let bookTimer = setInterval(checkForBookContentInDOM, 50);

  function checkForBookContentInDOM() {
    if (document.querySelector("iframe")) {
      clearInterval(bookTimer);
      setTimeout(main, 3000);
    } else {
      console.log("not yet");
    }
  }
}

function main() {
  let doc = new jspdf.jsPDF("p", "px", [918.426, 1315.276]);
  doc.html($("iframe").contents().find("html").text(), {
    callback: function (doc) {
      let pdfuri = doc.output("datauristring");
      chrome.runtime.sendMessage({ message: "pdf", url: pdfuri }, (res) => {
        console.log(res.message);
      });
    },
    x: 0,
    y: 0,
  });
}
