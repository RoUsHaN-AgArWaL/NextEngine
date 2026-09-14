var regedit = require('regedit')
var installPath = process.execPath

var APP_ID = 'NextEngine'

var keysToCreate = [
  `HKCU\\Software\\Classes\\${APP_ID}`,
  `HKCU\\Software\\Classes\\${APP_ID}\\Application`,
  `HKCU\\Software\\Classes\\${APP_ID}\\DefaultIcon`,
  `HKCU\\Software\\Classes\\${APP_ID}\\shell\\open\\command`,
  `HKCU\\Software\\Clients\\StartMenuInternet\\${APP_ID}\\Capabilities\\FileAssociations`,
  `HKCU\\Software\\Clients\\StartMenuInternet\\${APP_ID}\\Capabilities\\StartMenu`,
  `HKCU\\Software\\Clients\\StartMenuInternet\\${APP_ID}\\Capabilities\\URLAssociations`,
  `HKCU\\Software\\Clients\\StartMenuInternet\\${APP_ID}\\DefaultIcon`,
  `HKCU\\Software\\Clients\\StartMenuInternet\\${APP_ID}\\InstallInfo`,
  `HKCU\\Software\\Clients\\StartMenuInternet\\${APP_ID}\\shell\\open\\command`
]

var registryConfig = {

  'HKCU\\Software\\RegisteredApplications': {
    [APP_ID]: {
      value: `Software\\Clients\\StartMenuInternet\\${APP_ID}\\Capabilities`,
      type: 'REG_SZ'
    }
  },

  [`HKCU\\Software\\Classes\\${APP_ID}`]: {
    default: {
      value: 'NextEngine Browser Document',
      type: 'REG_DEFAULT'
    }
  },

  [`HKCU\\Software\\Classes\\${APP_ID}\\Application`]: {
    ApplicationIcon: {
      value: installPath + ',0',
      type: 'REG_SZ'
    },
    ApplicationName: {
      value: 'NextEngine',
      type: 'REG_SZ'
    },
    AppUserModelId: {
      value: 'NextEngine',
      type: 'REG_SZ'
    }
  },

  [`HKCU\\Software\\Classes\\${APP_ID}\\DefaultIcon`]: {
    default: {
      value: installPath + ',0',
      type: 'REG_DEFAULT'
    }
  },

  [`HKCU\\Software\\Classes\\${APP_ID}\\shell\\open\\command`]: {
    default: {
      value: `"${installPath}" "%1"`,
      type: 'REG_DEFAULT'
    }
  },

  [`HKCU\\Software\\Clients\\StartMenuInternet\\${APP_ID}\\Capabilities\\FileAssociations`]: {
    '.htm': { value: APP_ID, type: 'REG_SZ' },
    '.html': { value: APP_ID, type: 'REG_SZ' }
  },

  [`HKCU\\Software\\Clients\\StartMenuInternet\\${APP_ID}\\Capabilities\\StartMenu`]: {
    StartMenuInternet: {
      value: APP_ID,
      type: 'REG_SZ'
    }
  },

  [`HKCU\\Software\\Clients\\StartMenuInternet\\${APP_ID}\\Capabilities\\URLAssociations`]: {
    http: { value: APP_ID, type: 'REG_SZ' },
    https: { value: APP_ID, type: 'REG_SZ' }
  },

  [`HKCU\\Software\\Clients\\StartMenuInternet\\${APP_ID}\\DefaultIcon`]: {
    default: {
      value: installPath + ',0',
      type: 'REG_DEFAULT'
    }
  },

  [`HKCU\\Software\\Clients\\StartMenuInternet\\${APP_ID}\\InstallInfo`]: {
    IconsVisible: {
      value: 1,
      type: 'REG_DWORD'
    }
  },

  [`HKCU\\Software\\Clients\\StartMenuInternet\\${APP_ID}\\shell\\open\\command`]: {
    default: {
      value: installPath,
      type: 'REG_DEFAULT'
    }
  }
}

var registryInstaller = {
  install () {
    return new Promise((resolve, reject) => {
      regedit.createKey(keysToCreate, err => {
        if (err) return reject(err)
        regedit.putValue(registryConfig, err =>
          err ? reject(err) : resolve()
        )
      })
    })
  },

  uninstall () {
    return new Promise((resolve, reject) => {
      regedit.deleteKey(keysToCreate, err =>
        err ? reject(err) : resolve()
      )
    })
  }
}

// var regedit = require('regedit')
// var installPath = process.execPath

// var keysToCreate = [
//   'HKCU\\Software\\Classes\\Min',
//   'HKCU\\Software\\Classes\\Min\\Application',
//   'HKCU\\Software\\Classes\\Min\\DefaulIcon',
//   'HKCU\\Software\\Classes\\Min\\shell\\open\\command',
//   'HKCU\\Software\\Clients\\StartMenuInternet\\Min\\Capabilities\\FileAssociations',
//   'HKCU\\Software\\Clients\\StartMenuInternet\\Min\\Capabilities\\StartMenu',
//   'HKCU\\Software\\Clients\\StartMenuInternet\\Min\\Capabilities\\URLAssociations',
//   'HKCU\\Software\\Clients\\StartMenuInternet\\Min\\DefaultIcon',
//   'HKCU\\Software\\Clients\\StartMenuInternet\\Min\\InstallInfo',
//   'HKCU\\Software\\Clients\\StartMenuInternet\\Min\\shell\\open\\command'
// ]

// var registryConfig = {
//   'HKCU\\Software\\RegisteredApplications': {
//     Min: {
//       value: 'Software\\Clients\\StartMenuInternet\\Min\\Capabilities',
//       type: 'REG_SZ'
//     }
//   },

//   'HKCU\\Software\\Classes\\Min': {
//     default: {
//       value: 'NextEngine Browser Document',
//       type: 'REG_DEFAULT'
//     }
//   },

//   'HKCU\\Software\\Classes\\Min\\Application': {
//     ApplicationIcon: {
//       value: installPath + ',0',
//       type: 'REG_SZ'
//     },
//     ApplicationName: {
//       value: 'NextEngine',
//       type: 'REG_SZ'
//     },
//     AppUserModelId: {
//       value: 'NextEngine',
//       type: 'REG_SZ'
//     }
//   },

//   'HKCU\\Software\\Classes\\Min\\DefaulIcon': {
//     ApplicationIcon: {
//       value: installPath + ',0',
//       type: 'REG_SZ'
//     }
//   },

//   'HKCU\\Software\\Classes\\Min\\shell\\open\\command': {
//     default: {
//       value: '"' + installPath + '" "%1"',
//       type: 'REG_DEFAULT'
//     }
//   },

//   'HKCU\\Software\\Classes\\.htm\\OpenWithProgIds': {
//     Min: { value: 'Empty', type: 'REG_SZ' }
//   },

//   'HKCU\\Software\\Classes\\.html\\OpenWithProgIds': {
//     Min: { value: 'Empty', type: 'REG_SZ' }
//   },

//   'HKCU\\Software\\Clients\\StartMenuInternet\\Min\\Capabilities\\FileAssociations': {
//     '.htm': { value: 'NextEngine', type: 'REG_SZ' },
//     '.html': { value: 'NextEngine', type: 'REG_SZ' }
//   },

//   'HKCU\\Software\\Clients\\StartMenuInternet\\Min\\Capabilities\\StartMenu': {
//     StartMenuInternet: {
//       value: 'NextEngine',
//       type: 'REG_SZ'
//     }
//   },

//   'HKCU\\Software\\Clients\\StartMenuInternet\\Min\\Capabilities\\URLAssociations': {
//     http: { value: 'NextEngine', type: 'REG_SZ' },
//     https: { value: 'NextEngine', type: 'REG_SZ' }
//   },

//   'HKCU\\Software\\Clients\\StartMenuInternet\\Min\\DefaultIcon': {
//     default: {
//       value: installPath + ',0',
//       type: 'REG_DEFAULT'
//     }
//   },

//   'HKCU\\Software\\Clients\\StartMenuInternet\\Min\\InstallInfo': {
//     IconsVisible: {
//       value: 1,
//       type: 'REG_DWORD'
//     }
//   },

//   'HKCU\\Software\\Clients\\StartMenuInternet\\Min\\shell\\open\\command': {
//     default: {
//       value: installPath,
//       type: 'REG_DEFAULT'
//     }
//   }
// }

// module.exports = registryInstaller = {
//   install () {
//     return new Promise((resolve, reject) => {
//       regedit.createKey(keysToCreate, err => {
//         if (err) return reject(err)
//         regedit.putValue(registryConfig, err =>
//           err ? reject(err) : resolve()
//         )
//       })
//     })
//   },

//   uninstall () {
//     return new Promise((resolve, reject) => {
//       regedit.deleteKey(keysToCreate, err =>
//         err ? reject(err) : resolve()
//       )
//     })
//   }
// }
