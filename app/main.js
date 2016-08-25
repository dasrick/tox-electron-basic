'use strict';

// electron stuff
var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
// var Menu = electron.Menu;
// var Tray = electron.Tray;

// misc dependencies
// var fs = require('fs');
var path = require('path');
// var os = require('os');
var windowStateKeeper = require('electron-window-state');


// basic window
var mainWindow = null;
// var trayIcon = null;

// autoUpdater
// var autoUpdater = require('auto-updater');
// var platform = os.platform() + '_' + os.arch();
// var version = app.getVersion();
// var releaseUrl = 'https://tox-electron-whatsapp-nuts.herokuapp.com/update/' + platform + '/' + version;

app.on('window-all-closed', function () {
  app.quit();
});

app.on('ready', function () {
  var mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  });
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: 'Mein Title - deng', // ToDo überschreibt den Titel aus der index.html - vllt. brauht man das noch
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 600,
    minHeight: 400,
    resizable: true,
    center: true,
    show: true,
    frame: true,
    autoHideMenuBar: true,
    //icon: 'assets/icon.png',
    titleBarStyle: 'hidden-inset'
  });

  mainWindowState.manage(mainWindow);
  mainWindow.loadURL(path.normalize('file://' + path.join(__dirname, 'index.html')));

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools({detach: true});
  }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  // mainWindow.webContents.on('did-finish-load', function () {
  //   ipcMain.on('get-release-url', function () {
  //     mainWindow.webContents.send('send-release-url', releaseUrl);
  //   });
  //   ipcMain.on('get-os-data', function () {
  //     mainWindow.webContents.send('send-os-data', getOsData());
  //   });
  //   ipcMain.on('get-node-env', function () {
  //     mainWindow.webContents.send('send-node-env', process.env.NODE_ENV);
  //   });
  // });
});