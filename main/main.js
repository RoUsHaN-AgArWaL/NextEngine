const electron = require('electron')
const { app } = electron


// START AI

const { globalShortcut } = require('electron')



// music server
const express = require("express")
const path = require("path")

let musicServerPort = null

function startMusicServer() {

  const appServer = express()

  const musicFolder = path.join(app.getAppPath(), "pages/music")

  appServer.use(express.static(musicFolder))

  const server = appServer.listen(0, () => {

    musicServerPort = server.address().port

    console.log("Music server running on port:", musicServerPort)

  })

}
//music end

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+Shift+P', () => {
    windows.getCurrent().webContents.send('open-command-bar')
  })
})

//end AI

// ✅ MUST BE HERE (TOP, EARLY)
app.setAppUserModelId('NextEngine')
app.setName('NextEngine')
const fs = require('fs')


// ===== EXTENSION ENGINE START =====

global.extensions = [];

function loadExtensions() {

  const extensionsPath = require("path").resolve(process.cwd(), "extensions");

  console.log("==== EXTENSION DEBUG ====");
  console.log("process.cwd():", process.cwd());
  console.log("extensionsPath:", extensionsPath);

  if (!require("fs").existsSync(extensionsPath)) {
    console.log("❌ Extensions folder NOT found");
    return;
  }

  const folders = require("fs").readdirSync(extensionsPath);

  console.log("Folders found:", folders);

  folders.forEach(folder => {

    const manifestPath = require("path").join(
      extensionsPath,
      folder,
      "manifest.json"
    );

    console.log("Checking:", manifestPath);

    if (require("fs").existsSync(manifestPath)) {

      const manifest = JSON.parse(
        require("fs").readFileSync(manifestPath, "utf-8")
      );

      global.extensions.push({
        id: folder,
        manifest,
        folderPath: require("path").join(extensionsPath, folder)
      });

      console.log("✅ Loaded extension:", manifest.name);
    } else {
      console.log("❌ manifest.json missing in:", folder);
    }

  });

  console.log("Total loaded:", global.extensions.length);
}

function startBackgroundScripts() {

  global.extensions.forEach(ext => {

    const bg = ext.manifest.background
    if (!bg) return

    let bgFile = null

    // Manifest V2
    if (typeof bg === "string") {
      bgFile = bg
    }

    // Manifest V2 scripts array
    if (bg.scripts && bg.scripts.length) {
      bgFile = bg.scripts[0]
    }

    // Manifest V3 service worker
    if (bg.service_worker) {
      bgFile = bg.service_worker
    }

    if (!bgFile) return

    const bgPath = path.join(ext.folderPath, bgFile)

    try {
      require(bgPath)
      console.log("Started background:", ext.manifest.name)
    } catch (err) {
      console.error("Failed background:", bgPath, err)
    }

  })

}

function injectContentScripts(webContents) {
  webContents.on("did-finish-load", async () => {

    const url = webContents.getURL();

    global.extensions.forEach(ext => {
      const scripts = ext.manifest.content_scripts || [];

      scripts.forEach(script => {

        const matches = script.matches || [];

        const shouldInject = matches.some(pattern => {
          if (pattern === "*://*/*") return true;
          return url.includes(pattern.replace("*", ""));
        });

        if (!shouldInject) return;

        script.js.forEach(file => {
          const scriptPath = require("path").join(ext.folderPath, file);
          const code = require("fs").readFileSync(scriptPath, "utf8");
          webContents.executeJavaScript(code);
        });

      });

    });

  });
}

// ===== EXTENSION ENGINE END =====

const {
  protocol, // Module to control protocol handling
  BrowserWindow, // Module to create native browser window.
  webContents,
  session,
  ipcMain: ipc,
  Menu, MenuItem,
  crashReporter,
  dialog,
  nativeTheme,
  shell,
  net
} = electron

// app.setName('NextEngine')


crashReporter.start({
  submitURL: 'https://minbrowser.org/',
  uploadToServer: false,
  compress: true
})

if (process.argv.some(arg => arg === '-v' || arg === '--version')) {
  console.log('Next Engine: ' + app.getVersion())
  console.log('Chromium: ' + process.versions.chrome)
  process.exit()
}

let isInstallerRunning = false
const isDevelopmentMode = process.argv.some(arg => arg === '--development-mode')

function clamp (n, min, max) {
  return Math.max(Math.min(n, max), min)
}
if (process.platform === 'win32') {
  (async function () {
    const squirrelCommand = process.argv[1];

    // ✅ INSTALL / UPDATE — keep as-is
    if (
      squirrelCommand === '--squirrel-install' ||
      squirrelCommand === '--squirrel-updated'
    ) {
      isInstallerRunning = true;
      await registryInstaller.install();

      try {
        const childProcess = require('child_process')
        const updateExe = path.join(path.dirname(path.dirname(process.execPath)), 'Update.exe')
        childProcess.execFileSync(updateExe, ['--createShortcut', path.basename(process.execPath)], {
          windowsHide: true,
          stdio: 'ignore'
        })
      } catch (err) {
        console.warn('Squirrel shortcut creation failed:', err)
      }

      app.quit();
      return;
    }

    // ✅ UNINSTALL — CUSTOM UI
    if (squirrelCommand === '--squirrel-uninstall') {
      isInstallerRunning = true;
      app.commandLine.appendSwitch(
  "force-webrtc-ip-handling-policy",
  "disable_non_proxied_udp"
);

app.commandLine.appendSwitch(
  "disable-features",
  "InterestCohortAPI"
);

      app.whenReady().then(() => {
        openUninstallWindow(); // your premium UI
        const { app, session } = require("electron");
const { ElectronBlocker } = require("@cliqz/adblocker-electron");
const fetch = require("cross-fetch");

let blocker;

app.whenReady().then(async () => {
  try {
    blocker = await ElectronBlocker.fromPrebuiltAdsAndTracking(fetch);

    blocker.enableBlockingInSession(session.defaultSession);

    console.log("Content blocking enabled.");
  } catch (err) {
    console.error("Failed to initialize blocker:", err);
  }
});
      });

      return; // ⛔ DO NOT quit yet
    }

    // default squirrel handler
    if (require('electron-squirrel-startup')) {
      app.quit();
    }
  })();
}


if (isDevelopmentMode) {
  app.setPath('userData', app.getPath('userData') + '-development')
}

// workaround for flicker when focusing app (https://github.com/electron/electron/issues/17942)
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows', 'true')

var userDataPath = app.getPath('userData')

settings.initialize(userDataPath)

if (settings.get('userSelectedLanguage')) {
  app.commandLine.appendSwitch('lang', settings.get('userSelectedLanguage'))
}

const browserPage = 'min://app/index.html'

var mainMenu = null
var secondaryMenu = null
var isFocusMode = false
var appIsReady = false
var onboardingWindow = null
var isLaunchingBrowser = false

const isFirstInstance = app.requestSingleInstanceLock()

if (!isFirstInstance) {
  app.quit()
  return
}

var saveWindowBounds = function () {
  if (windows.getCurrent()) {
    var bounds = Object.assign(windows.getCurrent().getBounds(), {
      maximized: windows.getCurrent().isMaximized()
    })
    fs.writeFileSync(path.join(userDataPath, 'windowBounds.json'), JSON.stringify(bounds))
  }
}

function sendIPCToWindow (window, action, data) {
  if (window && window.isDestroyed()) {
    console.warn('ignoring message ' + action + ' sent to destroyed window')
    return
  }

  if (window && window.webContents && window.webContents.isLoadingMainFrame()) {
    // immediately after a did-finish-load event, isLoading can still be true,
    // so wait a bit to confirm that the page is really loading
    setTimeout(function() {
      if (window.webContents.isLoadingMainFrame()) {
        window.webContents.once('did-finish-load', function () {
          window.webContents.send(action, data || {})
        })
      } else {
        window.webContents.send(action, data || {})
      }
    }, 0)
  } else if (window) {
    window.webContents.send(action, data || {})
  } else {
    var window = createWindow()
    window.webContents.once('did-finish-load', function () {
      window.webContents.send(action, data || {})
    })
  }
}

function openTabInWindow (url) {
  sendIPCToWindow(windows.getCurrent(), 'addTab', {
    url: url
  })
}

function handleCommandLineArguments (argv) {
  // the "ready" event must occur before this function can be used
  if (argv) {
    argv.forEach(function (arg, idx) {
      if (arg && arg.toLowerCase() !== __dirname.toLowerCase()) {
        // URL
        if (arg.indexOf('://') !== -1) {
          sendIPCToWindow(windows.getCurrent(), 'addTab', {
            url: arg
          })
        } else if (idx > 0 && argv[idx - 1] === '-s') {
          // search
          sendIPCToWindow(windows.getCurrent(), 'addTab', {
            url: arg
          })
        } else if (/\.(m?ht(ml)?|pdf)$/.test(arg) && fs.existsSync(arg)) {
          // local files (.html, .mht, mhtml, .pdf)
          sendIPCToWindow(windows.getCurrent(), 'addTab', {
            url: 'file://' + path.resolve(arg)
          })
        }
      }
    })
  }
}

function createWindow (customArgs = {}) {
  var bounds;

  try {
    var data = fs.readFileSync(path.join(userDataPath, 'windowBounds.json'), 'utf-8')
    bounds = JSON.parse(data)
  } catch (e) {}

  if (!bounds) { // there was an error, probably because the file doesn't exist
    var size = electron.screen.getPrimaryDisplay().workAreaSize
    bounds = {
      x: 0,
      y: 0,
      width: size.width,
      height: size.height,
      maximized: true
    }
  }

  // make the bounds fit inside a currently-active screen
  // (since the screen NextEnginewas previously open on could have been removed)
  // see: https://github.com/minbrowser/min/issues/904
  var containingRect = electron.screen.getDisplayMatching(bounds).workArea

  bounds = {
    x: clamp(bounds.x, containingRect.x, (containingRect.x + containingRect.width) - bounds.width),
    y: clamp(bounds.y, containingRect.y, (containingRect.y + containingRect.height) - bounds.height),
    width: clamp(bounds.width, 0, containingRect.width),
    height: clamp(bounds.height, 0, containingRect.height),
    maximized: bounds.maximized
  }

  return createWindowWithBounds(bounds, customArgs)
}

function createWindowWithBounds (bounds, customArgs) {
  const newWin = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    minWidth: (process.platform === 'win32' ? 400 : 320), // controls take up more horizontal space on Windows
    minHeight: 350,
    titleBarStyle: settings.get('useSeparateTitlebar') ? 'default' : 'hidden',
    trafficLightPosition: { x: 12, y: 10 },
    icon: __dirname + '/icons/icon256.png',
    frame: settings.get('useSeparateTitlebar'),
    alwaysOnTop: settings.get('windowAlwaysOnTop'),
    backgroundColor: '#fff', // the value of this is ignored, but setting it seems to work around https://github.com/electron/electron/issues/10559
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true, // used by ProcessSpawner
      additionalArguments: [
        '--user-data-path=' + userDataPath,
        '--app-version=' + app.getVersion(),
        '--app-name=' + app.getName(),
        ...((isDevelopmentMode ? ['--development-mode'] : [])),
        '--window-id=' + windows.nextId,
        ...((windows.getAll().length === 0 ? ['--initial-window'] : [])),
        ...(windows.hasEverCreatedWindow ? [] : ['--launch-window']),
        ...(customArgs.initialTask ? ['--initial-task=' + customArgs.initialTask] : [])
      ]
    }
  })

  // windows and linux always use a menu button in the upper-left corner instead
  // if frame: false is set, this won't have any effect, but it does apply on Linux if "use separate titlebar" is enabled
  if (process.platform !== 'darwin') {
    newWin.setMenuBarVisibility(false)
  }

  // and load the index.html of the app.
  newWin.loadURL(browserPage)
  injectContentScripts(newWin.webContents);

  if (bounds.maximized) {
    newWin.maximize()

    newWin.webContents.once('did-finish-load', function () {
      sendIPCToWindow(newWin, 'maximize')
    })
  }

  newWin.on('close', function () {
    // save the window size for the next launch of the app
    saveWindowBounds()
  })

  newWin.on('focus', function () {
    if (!windows.getState(newWin).isMinimized) {
      sendIPCToWindow(newWin, 'windowFocus')
    }
  })

  newWin.on('minimize', function () {
    sendIPCToWindow(newWin, 'minimize')
    windows.getState(newWin).isMinimized = true
  })

  newWin.on('restore', function () {
    windows.getState(newWin).isMinimized = false
  })

  newWin.on('maximize', function () {
    sendIPCToWindow(newWin, 'maximize')
  })

  newWin.on('unmaximize', function () {
    sendIPCToWindow(newWin, 'unmaximize')
  })
  
  newWin.on('focus', function () {
    sendIPCToWindow(newWin, 'focus')
  })

  newWin.on('blur', function () {
    // if the devtools for this window are focused, this check will be false, and we keep the focused class on the window
    if (BrowserWindow.getFocusedWindow() !== newWin) {
      sendIPCToWindow(newWin, 'blur')
    }
  })

  newWin.on('enter-full-screen', function () {
    sendIPCToWindow(newWin, 'enter-full-screen')
  })

  newWin.on('leave-full-screen', function () {
    sendIPCToWindow(newWin, 'leave-full-screen')
    // https://github.com/minbrowser/min/issues/1093
    newWin.setMenuBarVisibility(false)
  })

  newWin.on('enter-html-full-screen', function () {
    sendIPCToWindow(newWin, 'enter-html-full-screen')
  })

  newWin.on('leave-html-full-screen', function () {
    sendIPCToWindow(newWin, 'leave-html-full-screen')
    // https://github.com/minbrowser/min/issues/952
    newWin.setMenuBarVisibility(false)
  })

  /*
  Handles events from mouse buttons
  Unsupported on macOS, and on Linux, there is a default handler already,
  so registering a handler causes events to happen twice.
  See: https://github.com/electron/electron/issues/18322
  */
  if (process.platform === 'win32') {
    newWin.on('app-command', function (e, command) {
      if (command === 'browser-backward') {
        sendIPCToWindow(newWin, 'goBack')
      } else if (command === 'browser-forward') {
        sendIPCToWindow(newWin, 'goForward')
      }
    })
  }

  // prevent remote pages from being loaded using drag-and-drop, since they would have node access
  newWin.webContents.on('will-navigate', function (e, url) {

  // allow music window pages
  // if (url.includes("/pages/music")) {
  //   return
  // }

  if (url !== browserPage) {
    e.preventDefault()
  }

})

  newWin.setTouchBar(buildTouchBar())

  windows.addWindow(newWin)

  return newWin
}

function isNextEngineDefaultBrowser () {
  try {
    if (process.platform === 'win32') {
      return app.getApplicationNameForProtocol('http').toLowerCase() === app.getName().toLowerCase()
    }

    return app.isDefaultProtocolClient('http') && app.isDefaultProtocolClient('https')
  } catch (err) {
    return false
  }
}

function openOnboardingWindow () {
  if (onboardingWindow && !onboardingWindow.isDestroyed()) {
    onboardingWindow.focus()
    return
  }

  onboardingWindow = new BrowserWindow({
    width: 1040,
    height: 720,
    minWidth: 860,
    minHeight: 620,
    resizable: false,
    maximizable: false,
    backgroundColor: '#f7f8fc',
    frame: false,
    show: false,
    icon: path.join(__dirname, 'icons/icon256.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  onboardingWindow.loadFile(path.join(app.getAppPath(), 'onboarding.html'))
  onboardingWindow.once('ready-to-show', () => onboardingWindow.show())
  onboardingWindow.on('closed', () => {
    onboardingWindow = null
    if (!isLaunchingBrowser) {
      app.quit()
    }
  })
}

function openMainBrowserWindow () {
  const newWin = createWindow()

  newWin.webContents.on('did-finish-load', function () {
    // if a URL was passed as a command line argument (probably because NextEngineis set as the default browser on Linux), open it.
    handleCommandLineArguments(process.argv)

    // there is a URL from an "open-url" event (on Mac)
    if (global.URLToOpen) {
      // if there is a previously set URL to open (probably from opening a link on macOS), open it
      sendIPCToWindow(newWin, 'addTab', {
        url: global.URLToOpen
      })
      global.URLToOpen = null
    }
  })

  mainMenu = buildAppMenu()
  Menu.setApplicationMenu(mainMenu)
  createDockMenu()
}

ipc.on('onboarding-get-default-status', function (event) {
  event.returnValue = isNextEngineDefaultBrowser()
})

ipc.on('onboarding-make-default', function (event) {
  try {
    app.setAsDefaultProtocolClient('http')
    app.setAsDefaultProtocolClient('https')
  } catch (err) {
    console.warn('Could not register NextEngine as a default protocol client:', err)
  }

  if (process.platform === 'win32') {
    shell.openExternal('ms-settings:defaultapps')
  }

  event.reply('onboarding-default-opened', isNextEngineDefaultBrowser())
})

ipc.on('onboarding-complete', function () {
  settings.set('onboardingCompleted', true)
  isLaunchingBrowser = true

  if (onboardingWindow && !onboardingWindow.isDestroyed()) {
    onboardingWindow.close()
  }

  openMainBrowserWindow()
})

ipc.on('close-onboarding', function () {
  if (onboardingWindow && !onboardingWindow.isDestroyed()) {
    onboardingWindow.close()
  }
})


// function openMusicWindow() {

//   const path = require("path")
//   const { app } = require("electron")

//   const musicWin = new BrowserWindow({
//     width: 1800,
//     height: 800,
//     title: "Music",
//     autoHideMenuBar: true,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false,
//       webSecurity: false,
//       allowRunningInsecureContent: true
//     }
//   })
//   musicWin.loadURL("https://listenfree.in/search")
// }

function openMusicWindow() {

  const musicWin = new BrowserWindow({
    width: 1800,
    height: 800,
    title: "Music",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      allowRunningInsecureContent: true
    }
  })

  musicWin.loadURL(`http://localhost:${musicServerPort}`)

}

ipc.on("open-music", () => {
  openMusicWindow()
})


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
  startMusicServer()
   loadExtensions();
  startBackgroundScripts();
  settings.set('restartNow', false)
  appIsReady = true

  /* the installer launches the app to install registry items and shortcuts,
  but if that's happening, we shouldn't display anything */
  if (isInstallerRunning) {
    return
  }

  registerBundleProtocol(session.defaultSession)

  // const newWin = createWindow()

  // newWin.webContents.on('did-finish-load', function () {
  //   // if a URL was passed as a command line argument (probably because NextEngineis set as the default browser on Linux), open it.
  //   handleCommandLineArguments(process.argv)

  //   // there is a URL from an "open-url" event (on Mac)
  //   if (global.URLToOpen) {
  //     // if there is a previously set URL to open (probably from opening a link on macOS), open it
  //     sendIPCToWindow(newWin, 'addTab', {
  //       url: global.URLToOpen
  //     })
  //     global.URLToOpen = null
  //   }
  // })

  // mainMenu = buildAppMenu()
  // Menu.setApplicationMenu(mainMenu)
  // createDockMenu()

  if (settings.get('onboardingCompleted')) {
    openMainBrowserWindow()
  } else {
    openOnboardingWindow()
  }
})

app.on('open-url', function (e, url) {
  if (appIsReady) {
    sendIPCToWindow(windows.getCurrent(), 'addTab', {
      url: url
    })
  } else {
    global.URLToOpen = url // this will be handled later in the createWindow callback
  }
})

// handoff support for macOS
app.on('continue-activity', function(e, type, userInfo, details) {
  if (type === 'NSUserActivityTypeBrowsingWeb' && details.webpageURL) {
    e.preventDefault()
    sendIPCToWindow(windows.getCurrent(), 'addTab', {
      url: details.webpageURL
    })
  }
})

app.on('second-instance', function (e, argv, workingDir) {
  if (onboardingWindow && !onboardingWindow.isDestroyed()) {
    onboardingWindow.focus()
    return
  }

  if (windows.getCurrent()) {
    if (windows.getCurrent().isMinimized()) {
      windows.getCurrent().restore()
    }
    windows.getCurrent().focus()
    // add a tab with the new URL
    handleCommandLineArguments(argv)
  }
})

/**
 * Emitted when the application is activated, which usually happens when clicks on the applications's dock icon
 * https://github.com/electron/electron/blob/master/docs/api/app.md#event-activate-os-x
 *
 * Opens a new tab when all tabs are closed, and NextEngineis still open by clicking on the application dock icon
 */
app.on('activate', function (/* e, hasVisibleWindows */) {
  if (onboardingWindow && !onboardingWindow.isDestroyed()) {
    onboardingWindow.focus()
    return
  }

  if (!windows.getCurrent() && appIsReady) { // sometimes, the event will be triggered before the app is ready, and creating new windows will fail
    createWindow()
  }
})



ipc.on('focusMainWebContents', function () {
  //TODO fix
  windows.getCurrent().webContents.focus()
})

ipc.on('showSecondaryMenu', function (event, data) {
  if (!secondaryMenu) {
    secondaryMenu = buildAppMenu({ secondary: true })
  }
  secondaryMenu.popup({
    x: data.x,
    y: data.y
  })
})

ipc.on('handoffUpdate', function(e, data) {
  if (app.setUserActivity && data.url && data.url.startsWith('http')) {
    app.setUserActivity('NSUserActivityTypeBrowsingWeb', {}, data.url)
  } else if (app.invalidateCurrentActivity) {
    app.invalidateCurrentActivity()
  }
})

ipc.on('quit', function () {
  app.quit()
})

ipc.on('tab-state-change', function(e, events) {
  windows.getAll().forEach(function(window) {
    if (window.webContents.id !== e.sender.id) {
      window.webContents.send('tab-state-change-receive', {
        sourceWindowId: windows.windowFromContents(e.sender).id,
        events
      })
    }
  })
})

ipc.on('request-tab-state', function(e) {
  const otherWindow = windows.getAll().find(w => w.webContents.id !== e.sender.id)
  if (!otherWindow) {
    throw new Error('secondary window doesn\'t exist as source for tab state')
  }
  ipc.once('return-tab-state', function(e2, data) {
    e.returnValue = data
  })
  otherWindow.webContents.send('read-tab-state')
})


//command
ipc.on('open-url-from-commandbar', (e, url) => {
  sendIPCToWindow(windows.getCurrent(), 'addTab', { url })
})

//command end
/* places service */

const placesPage = 'file://' + __dirname + '/js/places/placesService.html'

let placesWindow = null
app.once('ready', function() {
  placesWindow = new BrowserWindow({
    width: 300,
    height: 300,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  placesWindow.loadURL(placesPage)
})

ipc.on('places-connect', function (e) {
  placesWindow.webContents.postMessage('places-connect', null, e.ports)
})

let uninstallWindow = null;

function openUninstallWindow () {
  if (uninstallWindow && !uninstallWindow.isDestroyed()) {
    uninstallWindow.focus();
    return;
  }

  uninstallWindow = new BrowserWindow({
    width: 1024,
    height: 621,
    resizable: false,
    maximizable: false,
    minimizable: false,
    frame: false,
    backgroundColor: '#060607',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  uninstallWindow.loadFile('uninstall.html');

  uninstallWindow.on('closed', () => {
    uninstallWindow = null;
  });
}
ipc.on('close-uninstall-window', () => {
  if (uninstallWindow && !uninstallWindow.isDestroyed()) {
    uninstallWindow.close();
  }
});
ipc.on('uninstall-complete', () => {
  if (uninstallWindow && !uninstallWindow.isDestroyed()) {
    uninstallWindow.close();
  }

  setTimeout(() => {
    app.quit();
  }, 300);
});

// ipc.on('open-uninstall', () => {
//   openUninstallWindow()
// })



// ipc.on('open-nextengine-ai', function () {
//   const aiWindow = new BrowserWindow({
//     width: 900,
//     height: 800,
//     minWidth: 600,
//     minHeight: 700
//   })

//   aiWindow.loadFile(path.join(app.getAppPath(), 'ai', 'index.html'))

// })

ipc.on('open-ai', function () {
  sendIPCToWindow(windows.getCurrent(), 'addTab', {
    url: 'min://app/pages/ai/index.html'
  })
})



ipc.on('open-downloads', function () {
  sendIPCToWindow(windows.getCurrent(), 'addTab', {
    url: 'min://app/pages/downloads/download.html'
  })
})

// ipc.on('open-ai', function () {
//   sendIPCToWindow(windows.getCurrent(), 'addTab', {
//     url: 'min://app/ai/index.html'
//   })
// })