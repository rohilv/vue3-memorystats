import MemoryStats from './memory-stats.mjs'
export default {
  install: (app) => {
    const mEl = document.createElement('div')
    mEl.style.position = 'fixed'
    mEl.style.top = '0'
    mEl.style.right = '0'
    mEl.style.opacity = '0.95'
    mEl.style.zIndex = '1000'

    const stats = new MemoryStats()

    let rAFloop = () => {
      mEl.appendChild(stats.domElement)
      stats.update()
      requestAnimationFrame(rAFloop)
    }
    requestAnimationFrame(rAFloop)

    app.config.globalProperties.$updateMemmoryStats = (rAFloop) => {
      requestAnimationFrame(rAFloop)
    }
    document.body.appendChild(mEl)
  }
}
