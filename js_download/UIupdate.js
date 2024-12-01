/**
 * UI functions.
 */

//resume the download
function downloadresumed() {
  document.getElementById("action").innerHTML = "Download resumed";
  document.getElementById("pause").disabled = false;
  document.getElementById("resume").disabled = true;
}
//show or hide the details field
function showhidedetails() {
  if (document.getElementById("mode").value == "Detailed Mode") {
    document.getElementById("detailsarea").style.display = "block";
    document.getElementById("mode").value = "Simple Mode";
  } else {
    document.getElementById("detailsarea").style.display = "none";
    document.getElementById("mode").value = "Detailed Mode";
  }
}
//write to details field
function detailsarea(name, url, type, status, error, errorstatus) {
  if (error == undefined) {
    document.getElementById("detailsarea").innerHTML +=
      "&#13;&#10; Attempting to download file: " + name;
    document.getElementById("detailsarea").innerHTML +=
      "&#13;&#10; File retrieved from url: " + url;
    document.getElementById("detailsarea").innerHTML +=
      "&#13;&#10; Type of response: " + type;
    document.getElementById("detailsarea").innerHTML +=
      "&#13;&#10; Status code: " + status;
    document.getElementById("detailsarea").scrollTop =
      document.getElementById("detailsarea").scrollHeight;
  } else {
    document.getElementById("detailsarea").innerHTML +=
      "&#13;&#10; An Error occured: " + error;
    document.getElementById("detailsarea").innerHTML +=
      "&#13;&#10; Status text: " + errorstatus + "with code " + status;
    document.getElementById("detailsarea").scrollTop =
      document.getElementById("detailsarea").scrollHeight;
  }
}
//pause the download
function downloadpaused() {
  document.getElementById("action").innerHTML = "Download paused";
  document.getElementById("pause").disabled = true;
  document.getElementById("resume").disabled = false;
}
function downloadstopped() {
  document.getElementById("action").innerHTML = "Download was stopped by user";
  $(".hide").css("display", "none");
  document.getElementById("detailsarea").value = "";
}
function startdownload(length) {
  $(".hide").css("display", "block");
  document.getElementById("progressbar").max = length;
}
function updateprogressbar(line, length, size) {
  document.getElementById("filesize").innerHTML = size + " Kbytes size of file";
  document.getElementById("filecount").innerHTML =
    "downloading " + line + " files out of " + length;
  document.getElementById("progressbar").value = line;
}
