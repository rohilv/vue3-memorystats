/* eslint-env node, es2021 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import vMemoryStats from '../src/js/vMemoryStats.js'

const makeApp = () => ({ config: { globalProperties: {} }, unmount() {} })

test('install does nothing without a DOM (SSR)', () => {
  assert.equal(typeof window, 'undefined')
  const app = makeApp()
  assert.doesNotThrow(() => vMemoryStats.install(app))
  assert.equal(typeof app.config.globalProperties.$updateMemmoryStats, 'function')
  assert.doesNotThrow(() => app.config.globalProperties.$updateMemmoryStats(() => {}))
})

test('enabled: false renders nothing', () => {
  const fail = () => {
    throw new Error('DOM should not be touched')
  }
  globalThis.window = {}
  globalThis.document = { createElement: fail, body: { appendChild: fail } }
  try {
    const app = makeApp()
    assert.doesNotThrow(() => vMemoryStats.install(app, { enabled: false }))
    assert.equal(typeof app.config.globalProperties.$updateMemmoryStats, 'function')
  } finally {
    delete globalThis.window
    delete globalThis.document
  }
})
