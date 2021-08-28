window.addEventListener("load", waitForBookContent, false);

function waitForBookContent() {
  let bookTimer = setInterval(checkForBookContentInDOM, 50);

  function checkForBookContentInDOM() {
    if (document.querySelector("iframe")) {
      clearInterval(bookTimer);
      setTimeout(main, 5000);
    } else {
      console.log("not yet");
    }
  }
}

function main() {
  let doc = new jspdf.jsPDF("p", "pt", "A4");
  doc.html($("iframe").contents().find("html").find(".textLayer")[0], {
    callback: function (doc) {
      doc.save("Ebook.pdf");
    },
  });
}
