const { ipcRenderer } = require('electron')

function openURL (url) {
  ipcRenderer.send('open-url-from-commandbar', url)
}

const commands = [


    // youtube search fix
  {
  match: (text) => text.toLowerCase().startsWith('youtube') ||
                   text.toLowerCase().startsWith('open youtube') ||
                   text.toLowerCase().startsWith('play youtube'),

  run: (text) => {
    const query = text
      .toLowerCase()
      .replace('open youtube', '')
      .replace('play youtube', '')
      .replace('youtube', '')
      .trim()

    if (query) {
      openURL('https://www.youtube.com/results?search_query=' + encodeURIComponent(query))
    } else {
      openURL('https://www.youtube.com')
    }

    return true
  }
},
// / end youtube 
   {
    match: (text) => text === 'music' || text === 'open music' || text === 'min://music',
    run: () => {
      ipcRenderer.send('open-music')
      return true
    }
  },
  {
    match: (text) => text === 'open gmail',
    run: () => {
      openURL('https://mail.google.com')
      return true
    }
  },
  {
    match: (text) => text.startsWith('open '),
    run: (text) => {
      const query = text.replace('open ', '').trim()
      openURL('https://' + query +'.com')
      return true
    }
  }
]

function runCommand (text) {
  text = text.toLowerCase().trim()

  for (const cmd of commands) {
    if (cmd.match(text)) {
      return cmd.run(text)
    }
  }
  return false
}

module.exports = {
  runCommand
}
