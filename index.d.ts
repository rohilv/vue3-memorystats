import type { App } from 'vue'

export interface MemoryStatsOptions {
  /** Set to false to skip rendering the overlay, e.g. `enabled: import.meta.env.DEV`. Default: true */
  enabled?: boolean
  /** Corner of the viewport to place the overlay in. Default: 'top-right' */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

declare const vMemoryStats: {
  install(app: App, options?: MemoryStatsOptions): void
}

export default vMemoryStats

declare module 'vue' {
  interface ComponentCustomProperties {
    $updateMemmoryStats: (callback: FrameRequestCallback) => void
  }
}
