import { logMessage, setStatus, setProgress } from "./ui.js";

let espTool;
let port;

document.getElementById("connectBtn").addEventListener("click", async () => {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });
    setStatus("Connected");
    logMessage("Serial port opened.");
    document.getElementById("installBtn").disabled = false;

    espTool = new EspLoader(port, { baudrate: 115200 });
    await espTool.initialize();
    logMessage("ESP32 initialized.");
  } catch (err) {
    logMessage("Error connecting: " + err);
    setStatus("Connection failed");
  }
});

document.getElementById("installBtn").addEventListener("click", async () => {
  try {
    setStatus("Flashing...");
    logMessage("Starting firmware installation...");

    const response = await fetch("firmware/esp32_led_wifi.bin");
    const firmware = new Uint8Array(await response.arrayBuffer());

    await espTool.flashData(firmware, (bytesWritten, totalBytes) => {
      const percent = Math.round((bytesWritten / totalBytes) * 100);
      setProgress(percent);
      logMessage(`Flashing: ${percent}%`);
    });

    setStatus("Firmware installed successfully");
    logMessage("Installation complete!");
  } catch (err) {
    logMessage("Error flashing: " + err);
    setStatus("Flashing failed");
  }
});
