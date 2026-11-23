const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9333;

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function captureDevice(width, height, isMobile, outFileName) {
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--disable-gpu',
    '--hide-scrollbars'
  ]);

  try {
    let wsUrl = null;
    for (let i = 0; i < 30; i++) {
      await sleep(200);
      try {
        const res = await fetch(`http://localhost:${PORT}/json`);
        const tabs = await res.json();
        if (tabs && tabs[0] && tabs[0].webSocketDebuggerUrl) {
          wsUrl = tabs[0].webSocketDebuggerUrl;
          break;
        }
      } catch (e) {}
    }

    if (!wsUrl) throw new Error('Could not get CDP websocket URL');

    const ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        function onMsg(event) {
          const data = JSON.parse(event.data);
          if (data.id === msgId) {
            ws.removeEventListener('message', onMsg);
            resolve(data.result);
          }
        }
        ws.addEventListener('message', onMsg);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: isMobile
    });

    const fileUrl = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/') + '?view=fullscreen';
    await send('Page.navigate', { url: fileUrl });

    // Wait for fonts & rendering
    await sleep(2500);

    const res = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    const outPath = path.resolve(__dirname, '..', outFileName);
    fs.writeFileSync(outPath, buffer);
    console.log(`Successfully saved ${outFileName} (${width}x${height}, mobile: ${isMobile})`);

    ws.close();
  } finally {
    chrome.kill();
  }
}

async function main() {
  console.log('Capturing Desktop Fullscreen (1920x1080)...');
  await captureDevice(1920, 1080, false, 'fullscreen_1920x1080.png');

  console.log('Capturing Desktop (1440x900)...');
  await captureDevice(1440, 900, false, 'desktop_1440x900.png');

  console.log('Capturing Tablet (768x1024)...');
  await captureDevice(768, 1024, false, 'tablet_768x1024.png');

  console.log('Capturing Mobile (375x812)...');
  await captureDevice(375, 812, true, 'mobile_375x812.png');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
