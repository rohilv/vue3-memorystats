import MemoryStats from './memory-stats.mjs'

const POSITIONS = {
  'top-right': { top: '0', right: '0' },
  'top-left': { top: '0', left: '0' },
  'bottom-right': { bottom: '0', right: '0' },
  'bottom-left': { bottom: '0', left: '0' }
}

export default {
  install: (app, options = {}) => {
    const { enabled = true, position = 'top-right' } = options

    // Kept for backwards compatibility; safe to call without a DOM
    app.config.globalProperties.$updateMemmoryStats = (rAFloop) => {
      if (typeof requestAnimationFrame === 'function') requestAnimationFrame(rAFloop)
    }

    // Nothing to render on the server (SSR) or when disabled
    if (!enabled || typeof window === 'undefined' || typeof document === 'undefined') return

    if (!POSITIONS[position]) {
      console.warn(
        `[vue3-memorystats] Unknown position "${position}", using "top-right". ` +
          `Expected one of: ${Object.keys(POSITIONS).join(', ')}.`
      )
    }

    const mEl = document.createElement('div')
    mEl.style.position = 'fixed'
    Object.assign(mEl.style, POSITIONS[position] || POSITIONS['top-right'])
    mEl.style.opacity = '0.95'
    mEl.style.zIndex = '1000'

    const stats = new MemoryStats()
    mEl.appendChild(stats.domElement)

    let frame
    const rAFloop = () => {
      stats.update()
      frame = requestAnimationFrame(rAFloop)
    }
    frame = requestAnimationFrame(rAFloop)
    document.body.appendChild(mEl)

    // Stop the loop and remove the overlay when the app is unmounted
    const unmount = app.unmount
    app.unmount = function (...args) {
      cancelAnimationFrame(frame)
      mEl.remove()
      return unmount.apply(this, args)
    }
  }
}
