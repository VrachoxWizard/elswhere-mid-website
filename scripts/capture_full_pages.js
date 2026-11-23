const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9336;

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function captureFullPage(pageName) {
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
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    const fileUrl = 'file:///' + path.resolve(__dirname, '..', pageName).replace(/\\/g, '/');
    await send('Page.navigate', { url: fileUrl });
    await sleep(2000);

    const layout = await send('Page.getLayoutMetrics');
    const fullHeight = Math.min(Math.ceil(layout.contentSize.height), 3500);

    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: fullHeight,
      deviceScaleFactor: 1,
      mobile: false
    });
    await sleep(500);

    const res = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    const buffer = Buffer.from(res.data, 'base64');
    const outName = `${pageName.replace('.html', '')}_full.png`;
    const outPath = path.resolve(__dirname, '..', outName);
    fs.writeFileSync(outPath, buffer);
    console.log(`Saved ${outName} (${fullHeight}px height)`);

    ws.close();
  } finally {
    chrome.kill();
  }
}

async function main() {
  const pages = ['journeys.html', 'experiences.html', 'journal.html'];
  for (const page of pages) {
    console.log(`Capturing full page ${page}...`);
    await captureFullPage(page);
  }
  console.log('All full pages captured.');
}

main().catch(console.error);
