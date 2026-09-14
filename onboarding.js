const { ipcRenderer } = require('electron')

const slides = Array.from(document.querySelectorAll('.slide'))
const progress = document.getElementById('progress')
const next = document.getElementById('next')
const back = document.getElementById('back')
const eyebrow = document.getElementById('eyebrow')
const stepStatus = document.getElementById('step-status')
const defaultStatus = document.getElementById('default-status')
const makeDefault = document.getElementById('make-default')
const skipDefault = document.getElementById('skip-default')
const typingCommand = document.querySelector('.typing-command')
let currentSlide = 0
let experienceTypingTimer = null

const eyebrowLabels = ['A quieter way forward', 'Made for the modern web', 'BUILT FOR YOU', 'Your browser, your choice', 'Ready when you are']

slides.forEach((slide, index) => {
  const dot = document.createElement('button')
  dot.setAttribute('aria-label', `Go to step ${index + 1}`)
  dot.addEventListener('click', () => showSlide(index))
  progress.appendChild(dot)
})

function showSlide (index) {
  currentSlide = index
  slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === currentSlide))
  Array.from(progress.children).forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === currentSlide))
  back.classList.toggle('visible', currentSlide > 0)
  stepStatus.classList.toggle('visible', currentSlide === 2)
  next.innerHTML = currentSlide === slides.length - 1 ? 'Start Browsing <span>&rarr;</span>' : 'Next <span>&rarr;</span>'
  eyebrow.textContent = eyebrowLabels[currentSlide]

  if (currentSlide === 2) {
    startExperienceTyping()
  } else {
    stopExperienceTyping()
  }

  if (currentSlide === 3) {
    const isDefault = ipcRenderer.sendSync('onboarding-get-default-status')
    updateDefaultStatus(isDefault)
  }
}

function startExperienceTyping () {
  stopExperienceTyping()
  const commands = ['!', '!y', '!yt']
  let commandIndex = 0
  let characterIndex = 0

  experienceTypingTimer = setInterval(() => {
    const command = commands[commandIndex]
    typingCommand.textContent = command.slice(0, characterIndex + 1)
    characterIndex += 1
    if (characterIndex >= command.length) {
      characterIndex = 0
      commandIndex = (commandIndex + 1) % commands.length
    }
  }, 420)
}

function stopExperienceTyping () {
  if (experienceTypingTimer) {
    clearInterval(experienceTypingTimer)
    experienceTypingTimer = null
  }
  typingCommand.textContent = '!yt'
}

function updateDefaultStatus (isDefault) {
  defaultStatus.classList.toggle('is-default', isDefault)
  if (isDefault) {
    defaultStatus.textContent = 'NextEngine is already your default browser.'
    makeDefault.hidden = true
  } else {
    defaultStatus.textContent = 'NextEngine is not your default browser yet.'
    makeDefault.hidden = false
  }
}

function finish () {
  ipcRenderer.send('onboarding-complete')
}

next.addEventListener('click', () => {
  if (currentSlide === slides.length - 1) {
    finish()
  } else {
    showSlide(currentSlide + 1)
  }
})
back.addEventListener('click', () => showSlide(Math.max(0, currentSlide - 1)))
skipDefault.addEventListener('click', () => showSlide(currentSlide + 1))
makeDefault.addEventListener('click', () => {
  makeDefault.disabled = true
  makeDefault.textContent = 'Opening Settings...'
  ipcRenderer.send('onboarding-make-default')
})
document.getElementById('close').addEventListener('click', () => ipcRenderer.send('close-onboarding'))
ipcRenderer.on('onboarding-default-opened', (_event, isDefault) => {
  makeDefault.disabled = false
  makeDefault.innerHTML = isDefault ? 'Done <span>&check;</span>' : 'Make Default <span>&rarr;</span>'
  updateDefaultStatus(isDefault)
})

showSlide(0)
