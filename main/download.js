const { randomUUID } = require('crypto')
const currrentDownloadItems = {}
const downloadHistoryPath = path.join(app.getPath('userData'), 'downloads.json')
let downloadHistory = {}

try {
  downloadHistory = JSON.parse(fs.readFileSync(downloadHistoryPath, 'utf8'))
} catch (error) {
  downloadHistory = {}
}

function saveDownloadHistory () {
  fs.writeFileSync(downloadHistoryPath, JSON.stringify(downloadHistory))
}

function broadcastDownloadUpdate (info) {
  for (const view of Object.values(viewMap)) {
    if (!view.webContents.isDestroyed()) {
      view.webContents.send('download-manager-update', info)
    }
  }
}

function updateDownloadHistory (info) {
  if (!info.path) return

  const id = info.id || randomUUID()
  const previous = downloadHistory[id] || {}
  const item = {
    ...previous,
    ...info,
    id,
    timestamp: previous.timestamp || Date.now()
  }

  downloadHistory[id] = item
  saveDownloadHistory()
  broadcastDownloadUpdate(item)
}

ipc.handle('download-manager-list', function () {
  return Object.values(downloadHistory).sort((a, b) => b.timestamp - a.timestamp)
})

ipc.handle('download-manager-remove', function (e, id) {
  delete downloadHistory[id]
  saveDownloadHistory()
  broadcastDownloadUpdate({ id, removed: true })
})

ipc.handle('download-manager-clear', function () {
  downloadHistory = {}
  saveDownloadHistory()
  broadcastDownloadUpdate({ clear: true })
})

ipc.handle('download-manager-open-file', function (e, filePath) {
  if (!fs.existsSync(filePath)) return false
  return shell.openPath(filePath).then(error => !error)
})

ipc.handle('download-manager-open-folder', function (e, filePath) {
  if (!fs.existsSync(filePath)) return false
  shell.showItemInFolder(filePath)
  return true
})

ipc.on('cancelDownload', function (e, path) {
  if (currrentDownloadItems[path]) {
    currrentDownloadItems[path].cancel()
  }
})

function isAttachment (header) {
  return /^\s*attache*?ment/i.test(header)
}

function downloadHandler (event, item, webContents) {
  const sourceView = Object.values(viewMap).find(view => view.webContents.id === webContents.id)
  let sourceWindow
  if (sourceView) {
    sourceWindow = BrowserWindow.fromBrowserView(sourceView)
  }
  if (!sourceWindow) {
    sourceWindow = windows.getCurrent()
  }

  var savePathFilename
  const downloadId = randomUUID()
  const startedAt = Date.now()
  let lastReceived = 0
  let lastUpdateAt = startedAt

  function getDownloadInfo (status, received, total) {
    const now = Date.now()
    const elapsed = (now - lastUpdateAt) / 1000
    const speed = elapsed > 0 ? Math.max(0, received - lastReceived) / elapsed : 0
    lastReceived = received
    lastUpdateAt = now

    return {
      id: downloadId,
      path: item.getSavePath(),
      name: savePathFilename || item.getFilename(),
      status,
      size: { received, total },
      url: item.getURL(),
      mimeType: item.getMimeType(),
      startTime: startedAt,
      speed
    }
  }

  // send info to download manager
  const initialInfo = getDownloadInfo('progressing', 0, item.getTotalBytes())
  sendIPCToWindow(sourceWindow, 'download-info', initialInfo)
  updateDownloadHistory(initialInfo)

  item.on('updated', function (e, state) {
    if (!savePathFilename) {
      savePathFilename = path.basename(item.getSavePath())
    }

    if (item.getSavePath()) {
      currrentDownloadItems[item.getSavePath()] = item
    }

    const info = getDownloadInfo(state, item.getReceivedBytes(), item.getTotalBytes())
    sendIPCToWindow(sourceWindow, 'download-info', info)
    updateDownloadHistory(info)
  })

  item.once('done', function (e, state) {
    delete currrentDownloadItems[item.getSavePath()]
    const received = item.getReceivedBytes()
    const info = {
      ...getDownloadInfo(state, received, item.getTotalBytes()),
      completedTime: state === 'completed' ? Date.now() : undefined
    }
    sendIPCToWindow(sourceWindow, 'download-info', info)
    updateDownloadHistory(info)
  })
  return true
}

function listenForDownloadHeaders (ses) {
  ses.webRequest.onHeadersReceived(function (details, callback) {
    if (details.resourceType === 'mainFrame' && details.responseHeaders) {
      let sourceWindow
      if (details.webContents) {
        const sourceView = Object.values(viewMap).find(view => view.webContents.id === details.webContents.id)
        if (sourceView) {
          sourceWindow = BrowserWindow.fromBrowserView(sourceView)
        }
      }
      if (!sourceWindow) {
        sourceWindow = windows.getCurrent()
      }

      // workaround for https://github.com/electron/electron/issues/24334
      var typeHeader = details.responseHeaders[Object.keys(details.responseHeaders).filter(k => k.toLowerCase() === 'content-type')]
      var attachment = isAttachment(details.responseHeaders[Object.keys(details.responseHeaders).filter(k => k.toLowerCase() === 'content-disposition')])

      if (typeHeader instanceof Array && typeHeader.filter(t => t.includes('application/pdf')).length > 0 && !attachment) {
      // open in PDF viewer instead
        callback({ cancel: false })
        sendIPCToWindow(sourceWindow, 'openPDF', {
          url: details.url,
          tabId: null
        })
        return
      }

      // whether this is a file being viewed in-browser or a page
      // Needed to save files correctly: https://github.com/minbrowser/min/issues/1717
      // It doesn't make much sense to have this here, but only one onHeadersReceived instance can be created per session
      const isFileView = typeHeader instanceof Array && !typeHeader.some(t => t.includes('text/html'))

      sendIPCToWindow(sourceWindow, 'set-file-view', {
        url: details.url,
        isFileView
      })
    }

    /*
    SECURITY POLICY EXCEPTION:
    reader and PDF internal pages get universal access to web resources
    Note: we can't limit to the URL in the query string, because there could be redirects
    */
    if (details.webContents && (details.webContents.getURL().startsWith('min://app/pages/pdfViewer') || details.webContents.getURL().startsWith('min://app/reader/') || details.webContents.getURL() === 'min://app/index.html')) {
      const filteredHeaders = Object.fromEntries(
        Object.entries(details.responseHeaders).filter(([key, val]) => key.toLowerCase() !== 'access-control-allow-origin' && key.toLowerCase() !== 'access-control-allow-credentials')
      )

      callback({
        responseHeaders: {
          ...filteredHeaders,
          'Access-Control-Allow-Origin': 'min://app',
          'Access-Control-Allow-Credentials': 'true'
        }
      })
      return
    }

    callback({ cancel: false })
  })
}

app.once('ready', function () {
  session.defaultSession.on('will-download', downloadHandler)
  listenForDownloadHeaders(session.defaultSession)
})

app.on('session-created', function (session) {
  session.on('will-download', downloadHandler)
  listenForDownloadHeaders(session)
})
