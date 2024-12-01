/**
 * Download a list of files.
 */
var dirHandle, lastline;
async function download() {
  var url = document.getElementById("url").value;
  var fname, otid, flag;
  //get list of urls
  Promise.all([fetch(url).then((x) => x.text())]).then(([sample]) => {
    var allLines = sample.split(/\r\n|\n/);
    async function url(line) {
      //read all urls
      if (line >= allLines.length || flag == 1) {
        $(".hide").css("display", "none");
        return;
      }
      if (flag == 2) {
        return;
      }
      //get directory for the begginning or resuming of download
      if (line == 0) {
        dirHandle = await window.showDirectoryPicker();
        startdownload(allLines.length);
      }
      document.getElementById("stop").addEventListener("click", function () {
        downloadstopped();
        flag = 1;
        lastline = 0;
        dirHandle = "";
      });
      document.getElementById("pause").addEventListener("click", function () {
        downloadpaused();
        flag = 2;
        lastline = line;
      });
      otid = allLines[line].replace(/\D/g, "");
      //get the title of resource to import as filename
      await $.post(
        "getTitle.php",
        { url: "https://visuallibrary.net/" + otid },
        function (data) {
          const doc = new DOMParser().parseFromString(data, "text/html");
          const title = doc.querySelectorAll("body")[0];
          return (fname = title.innerText + ".txt");
        }
      );
      // Create a FileSystemWritableFileStream to write to.
      const fileHandle = await dirHandle.getFileHandle(
        fname.replace(/[\/\:]/g, ""),
        {
          create: true,
        }
      );
      const writable = await fileHandle.createWritable();
      // Make an HTTP request for the contents.
      const response = await fetch(allLines[line]);
      //update progress bar with data
      const size = response.headers.get("Content-Length") * 0.001;
      updateprogressbar(line, allLines.length, size);
      await response.body.pipeTo(writable);
      detailsarea(
        fname,
        response.url,
        response.type,
        response.status,
        response.error,
        response.statusText
      );
      //timeout needed for other browsers functionality
      setTimeout(function () {
        url(line + 1);
      }, 1000);
    }
    //start first download or resume
    if (lastline) {
      downloadresumed();
      url(lastline);
    } else {
      url(0);
    }
  });
}
