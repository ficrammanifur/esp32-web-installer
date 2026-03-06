import { logMessage, setStatus, setProgress } from "./ui.js";

let espTool;
let port;

async function closePortIfOpen() {
  if (port) {
    try {
      await port.close();
      logMessage("Port closed.");
    } catch (err) {
      logMessage("Error closing port: " + err);
    }
    port = null;
  }
}

document.getElementById("connectBtn").addEventListener("click", async () => {
  try {
    // Tutup port lama jika masih terbuka
    await closePortIfOpen();

    // Coba auto detect port yang sudah di-approve sebelumnya
    const ports = await navigator.serial.getPorts();
    if (ports.length > 0) {
      port = ports[0];
      await port.open({ baudRate: 115200 });
    } else {
      // Jika belum ada, minta user pilih port
      port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });
    }

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

    // Tutup port setelah selesai flashing
    await closePortIfOpen();
    setStatus("Disconnected");
  } catch (err) {
    logMessage("Error flashing: " + err);
    setStatus("Flashing failed");
  }
});
import { logMessage, setStatus, setProgress } from "./ui.js";

let espTool;
let port;

async function closePortIfOpen() {
  if (port) {
    try {
      await port.close();
      logMessage("Port closed.");
    } catch (err) {
      logMessage("Error closing port: " + err);
    }
    port = null;
  }
}

document.getElementById("connectBtn").addEventListener("click", async () => {
  try {
    // Tutup port lama jika masih terbuka
    await closePortIfOpen();

    // Coba auto detect port yang sudah di-approve sebelumnya
    const ports = await navigator.serial.getPorts();
    if (ports.length > 0) {
      port = ports[0];
      await port.open({ baudRate: 115200 });
    } else {
      // Jika belum ada, minta user pilih port
      port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });
    }

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

    // Tutup port setelah selesai flashing
    await closePortIfOpen();
    setStatus("Disconnected");
  } catch (err) {
    logMessage("Error flashing: " + err);
    setStatus("Flashing failed");
  }
});
