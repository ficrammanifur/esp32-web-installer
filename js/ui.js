function logMessage(msg) {
  const log = document.getElementById("log");
  log.innerHTML += msg + "<br>";
  log.scrollTop = log.scrollHeight;
}

function setStatus(msg) {
  document.getElementById("status").innerText = "Status: " + msg;
}

function setProgress(percent) {
  document.getElementById("progressBar").style.width = percent + "%";
}

export { logMessage, setStatus, setProgress };
