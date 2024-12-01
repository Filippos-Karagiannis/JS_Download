var fileHandle = 0;
const options = {
  types: [
    {
      description: "Text Files",
      accept: {
        "text/plain": [".txt"],
      },
    },
  ],
};
async function editor() {
  [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const contents = await file.text();
  document.getElementById("editarea").value = contents;
}
async function save() {
  if (fileHandle == 0) {
    alert("Please edit a file first");
    return;
  }
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  contents = document.getElementById("editarea").value;
  await writable.write(contents);
  // Close the file and write the contents to disk.
  await writable.close();
}
async function saveAs() {
  fileHandle = await window.showSaveFilePicker(options);
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  contents = document.getElementById("editarea").value;
  await writable.write(contents);
  // Close the file and write the contents to disk.
  await writable.close();
}
