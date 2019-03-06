const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

const loadPage = (mainWindow) => {
  mainWindow.loadURL(`file://${path.resolve(__dirname, './dist/index.html')}`);
}

app.commandLine.appendSwitch('--ignore-certificate-errors');

app.on('window-all-closed', () => {
  app.quit();
});

app.on('browser-window-focus', (_, mainWindow) => {
  globalShortcut.register('F5', () => {
    loadPage(mainWindow);
  });
  globalShortcut.register('F11', () => {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  });
  globalShortcut.register('ESC', () => {
    if (mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(false);
    }
  });
  globalShortcut.register('CommandOrControl+R', () => {
    loadPage(mainWindow);
  });
})

app.on('browser-window-blur', () => {
  globalShortcut.unregister('F5');
  globalShortcut.unregister('F11');
  globalShortcut.unregister('ESC');
  globalShortcut.unregister('CommandOrControl+R');
});

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
  });

  // mainWindow.webContents.openDevTools();
  loadPage(mainWindow);
});
