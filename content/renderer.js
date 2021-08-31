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
  let img = new Image();
  img.src = $("iframe").contents().find("html").find("img")[0].currentSrc;
  img.onload = () => {
    // create a canvas object
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // copy image contents to canvas
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // get data from canvas object
    let data = canvas.toDataURL("image/png");

    // filename
    let filename = $("iframe")
      .contents()
      .find("html")
      .find("img")[0]
      .alt.match(/\s(\w+)$/)[1];
    chrome.runtime.sendMessage(
      { message: "download", url: data, filename: filename },
      (res) => {
        console.log(res.message);
        $(".spine-entry-nav-container-next")[0].click();
        let lastSrc = img.src;
        let newPageTimer = setInterval(checkForNewPageInDOM, 50);
        function checkForNewPageInDOM() {
          let thisSrc = $("iframe")
            .contents()
            .find("html")
            .find("img")[0].currentSrc;
          if (thisSrc !== lastSrc) {
            clearInterval(newPageTimer);
            waitForBookContent();
          }
          lastSrc = thisSrc;
        }
      }
    );
  };
}
