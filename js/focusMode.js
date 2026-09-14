// var isFocusMode = false

// ipc.on('enterFocusMode', function () {
//   isFocusMode = true
//   document.body.classList.add('is-focus-mode')
// })

// ipc.on("enterFocusMode", () => {

//   extensions.sendMessage("focusmode",{
//      type:"focus-enable"
//   })

// })

// ipc.on("exitFocusMode", () => {

//   extensions.sendMessage("focusmode",{
//      type:"focus-disable"
//   })

// })

// ipc.on('exitFocusMode', function () {
//   isFocusMode = false
//   document.body.classList.remove('is-focus-mode')
// })

// module.exports = {
//   enabled: function () {
//     return isFocusMode
//   },
//   warn: function () {
//     ipc.invoke('showFocusModeDialog2')
//   }
// }
var isFocusMode = false

ipc.on('enterFocusMode', function () {
  isFocusMode = true
  document.body.classList.add('is-focus-mode')
})

ipc.on('exitFocusMode', function () {
  isFocusMode = false
  document.body.classList.remove('is-focus-mode')
})

module.exports = {
  enabled: function () {
    return isFocusMode
  },
  warn: function () {
    ipc.invoke('showFocusModeDialog2')
  }
}