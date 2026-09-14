const electron = require('electron')
const { app } = electron

// ✅ MUST BE HERE (TOP, EARLY)
app.setAppUserModelId('NextEngine')
app.setName('NextEngine')

const fs = require('fs')
const path = require('path')

const {
  protocol,
  BrowserWindow,
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

app.setAppUserModelId('NextEngine')
app.setName('NextEngine')

crashReporter.start({
  submitURL: 'https://minbrowser.org/',
  uploadToServer: false,
  compress: true
})

/* ============================
   VERSION CHECK
============================ */
if (process.argv.some(arg => arg === '-v' || arg === '--version')) {
  console.log('Next Engine: ' + app.getVersion())
  console.log('Chromium: ' + process.versions.chrome)
  process.exit()
}

/* ============================
   GLOBAL FLAGS
============================ */
let isInstallerRunning = false
const isDevelopmentMode = process.argv.some(arg => arg === '--development-mode')

function clamp (n, min, max) {
  return Math.max(Math.min(n, max), min)
}

/* ============================
   🚨 SQUIRREL HANDLER (MUST BE TOP)

============================ */

// 🔧 TEMP STUB — prevents crash if registryInstaller is missing
/* ============================
   🚨 SQUIRREL HANDLER (TOP)
============================ */
const registryInstaller = {
  install: async () => {},
  uninstall: async () => {}
}

if (process.platform === 'win32') {
  const squirrelCommand = process.argv[1]

  // ✅ INSTALL / UPDATE
  if (
    squirrelCommand === '--squirrel-install' ||
    squirrelCommand === '--squirrel-updated'
  ) {
    isInstallerRunning = true
    registryInstaller.install()
    app.quit()
    process.exit(0)
  }

  // ✅ UNINSTALL — CUSTOM UI ONLY
  if (squirrelCommand === '--squirrel-uninstall') {
    isInstallerRunning = true

    app.once('ready', () => {
      openUninstallWindow()
    })

    return // ⛔ stop main.js execution here
  }
}


/* ============================
   DEVELOPMENT MODE
============================ */
if (isDevelopmentMode) {
  app.setPath('userData', app.getPath('userData') + '-development')
}

app.commandLine.appendSwitch(
  'disable-backgrounding-occluded-windows',
  'true'
)

/* ============================
   USER DATA
============================ */
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

/* ============================
   SINGLE INSTANCE
============================ */
const isFirstInstance = app.requestSingleInstanceLock()
if (!isFirstInstance) {
  app.quit()
  return
}

/* ============================
   WINDOW STATE
============================ */
function saveWindowBounds () {
  if (!windows.getCurrent()) return

  const bounds = Object.assign(
    windows.getCurrent().getBounds(),
    { maximized: windows.getCurrent().isMaximized() }
  )

  fs.writeFileSync(
    path.join(userDataPath, 'windowBounds.json'),
    JSON.stringify(bounds)
  )
}

/* ============================
   SAFE IPC SENDER
============================ */
function sendIPCToWindow (window, action, data) {
  if (isInstallerRunning) return
  if (!window || window.isDestroyed()) return
  window.webContents.send(action, data || {})
}

function openTabInWindow (url) {
  if (isInstallerRunning) return
  sendIPCToWindow(windows.getCurrent(), 'addTab', { url })
}

/* ============================
   ARGUMENT HANDLER
============================ */
function handleCommandLineArguments (argv) {
  if (!argv || isInstallerRunning) return

  argv.forEach(function (arg, idx) {
    if (!arg || arg.toLowerCase() === __dirname.toLowerCase()) return

    if (arg.includes('://')) {
      openTabInWindow(arg)
    } else if (idx > 0 && argv[idx - 1] === '-s') {
      openTabInWindow(arg)
    } else if (/\.(m?ht(ml)?|pdf)$/.test(arg) && fs.existsSync(arg)) {
      openTabInWindow('file://' + path.resolve(arg))
    }
  })
}

/* ============================
   MAIN WINDOW
============================ */
function createWindow (customArgs = {}) {
  let bounds

  try {
    bounds = JSON.parse(
      fs.readFileSync(
        path.join(userDataPath, 'windowBounds.json'),
        'utf-8'
      )
    )
  } catch {}

  if (!bounds) {
    const size = electron.screen.getPrimaryDisplay().workAreaSize
    bounds = {
      x: 0, y: 0,
      width: size.width,
      height: size.height,
      maximized: true
    }
  }

  return createWindowWithBounds(bounds, customArgs)
}

function createWindowWithBounds (bounds, customArgs) {
  const newWin = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    minWidth: process.platform === 'win32' ? 400 : 320,
    minHeight: 350,
    titleBarStyle: settings.get('useSeparateTitlebar') ? 'default' : 'hidden',
    icon: __dirname + '/icons/icon256.png',
    frame: settings.get('useSeparateTitlebar'),
    alwaysOnTop: settings.get('windowAlwaysOnTop'),
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true,
      additionalArguments: [
        '--user-data-path=' + userDataPath,
        '--app-version=' + app.getVersion(),
        '--app-name=' + app.getName(),
        ...(isDevelopmentMode ? ['--development-mode'] : [])
      ]
    }
  })

  if (process.platform !== 'darwin') {
    newWin.setMenuBarVisibility(false)
  }

  newWin.loadURL(browserPage)

  newWin.on('close', saveWindowBounds)
  windows.addWindow(newWin)
  return newWin
}

/* ============================
   APP READY
============================ */
app.on('ready', function () {
  if (isInstallerRunning) return

  settings.set('restartNow', false)
  appIsReady = true

  registerBundleProtocol(session.defaultSession)
  const newWin = createWindow()

  newWin.webContents.on('did-finish-load', () => {
    handleCommandLineArguments(process.argv)
  })

  mainMenu = buildAppMenu()
  Menu.setApplicationMenu(mainMenu)
  createDockMenu()
})

/* ============================
   PLACES SERVICE (BLOCKED ON UNINSTALL)
============================ */
let placesWindow = null
app.once('ready', function () {
  if (isInstallerRunning) return

  placesWindow = new BrowserWindow({
    width: 300,
    height: 300,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  placesWindow.loadURL(
    'file://' + __dirname + '/js/places/placesService.html'
  )
})

ipc.on('places-connect', function (e) {
  if (!placesWindow) return
  placesWindow.webContents.postMessage('places-connect', null, e.ports)
})

/* ============================
   UNINSTALL WINDOW
============================ */
let uninstallWindow = null

function openUninstallWindow () {
  if (uninstallWindow && !uninstallWindow.isDestroyed()) {
    uninstallWindow.focus()
    return
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
  })

  uninstallWindow.loadFile('uninstall.html')

  uninstallWindow.on('closed', () => {
    uninstallWindow = null
  })
}

ipc.on('close-uninstall-window', () => {
  if (uninstallWindow && !uninstallWindow.isDestroyed()) {
    uninstallWindow.close()
  }
})

ipc.on('uninstall-complete', () => {
  if (uninstallWindow && !uninstallWindow.isDestroyed()) {
    uninstallWindow.close()
  }

  setTimeout(() => {
    app.quit()
  }, 300)
})
