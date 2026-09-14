module.exports = [
  {
    keywords: ['open'],
    description: 'Open a website',
    action: (text) => {
      // text = full command, e.g. "open gmail"
      let target = text.replace(/^open\s+/i, '').trim()
      if (!target) return

      let url = target

      // smart shortcuts
      if (target === 'gmail') {
        url = 'https://mail.google.com'
      } else if (!target.includes('://')) {
        url = 'https://' + target
      }

      // 🔥 this event ALREADY exists in Min
      window.dispatchEvent(new CustomEvent('commandbar-open-url', {
        detail: { url }
      }))
    }
  }
]
