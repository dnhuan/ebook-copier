window.addEventListener("load", waitForBookContent, false);

function waitForBookContent() {
  let bookTimer = setInterval(checkForBookContentInDOM, 50);

  function checkForBookContentInDOM() {
    if (
      $("iframe").contents().find("img").length !== 0 &&
      $("iframe").contents().find("img")[0].currentSrc.match(/.+jpg/)
    ) {
      clearInterval(bookTimer);
      main();
      logState();
    }
  }
}

function logState() {
  console.log(
    '$("iframe").content().find("html").find("img") :>> ',
    $("iframe").contents().find("html").find("img")
  );
}

function main() {
  // get url of xhtml
  let data = $("iframe").contents().find("html")[0].outerHTML;

  // filename
  let filename = $("iframe")
    .contents()
    .find("html")
    .find("img")[0]
    .alt.match(/\s(\S+)$/)[1]
    .trim();
  let blob = new Blob([data], {
    type: "application/xhtml+xml;charset=utf-8",
  });
  saveAs(blob, `${filename}.xhtml`);
  setTimeout(() => {
    $(".spine-entry-nav-container-next")[0].click();
    let lastSrc = $("iframe").contents().find("html").find("img")[0].currentSrc;
    let newPageTimer = setInterval(checkForNewPageInDOM, 50);
    function checkForNewPageInDOM() {
      let thisSrc = $("iframe")
        .contents()
        .find("html")
        .find("img")[0].currentSrc;
      if (thisSrc !== lastSrc) {
        clearInterval(newPageTimer);
        console.log("clear :>> ");
        // waitForBookContent();
      }
      lastSrc = thisSrc;
    }
  }, 500);
}
