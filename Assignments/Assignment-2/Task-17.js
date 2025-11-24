function downloadFile(filename, callback) {
  console.log(`Downloading ${filename}...`);
  callback();
}

function onDownloadComplete() {
  setTimeout(() => {
    console.log("Download complete!");
  }, 2000); // 2 second delay
}

downloadFile("assignment.pdf", onDownloadComplete);
