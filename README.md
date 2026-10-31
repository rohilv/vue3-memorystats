# vue3-memorystats

[![npm version](https://img.shields.io/npm/v/vue3-memorystats.svg)](https://www.npmjs.com/package/vue3-memorystats)
[![CI](https://github.com/rohilv/vue3-memorystats/actions/workflows/ci.yml/badge.svg)](https://github.com/rohilv/vue3-memorystats/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/vue3-memorystats.svg)](LICENSE)

**vue3-memorystats** adds a live memory usage graph to your Vue 3 app with one line: `app.use(vMemoryStats)`.
It is a Vue 3 plugin based on [Paul Irish's memory-stats](https://github.com/paulirish/memory-stats.js).

**[Live demo](https://rohilv.github.io/vue3-memorystats/)**

It works in Chromium-based browsers (Chrome, Edge, Brave, Opera), which provide `performance.memory`, but not in Firefox or Safari. For precise numbers, start the browser with `--enable-precise-memory-info` (see below).

![Memory Stats](src/assets/memory.gif)

## Installation

```
npm install vue3-memorystats
```

## Usage

```
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import vMemoryStats from 'vue3-memorystats'

const app = createApp(App)
app.use(vMemoryStats)
app.mount('#app')
```

### Options

```
app.use(vMemoryStats, {
  enabled: import.meta.env.DEV, // default: true. Set to false to render nothing, e.g. in production
  position: 'bottom-left' // 'top-right' (default), 'top-left', 'bottom-right', 'bottom-left'
})
```

- The overlay is removed and its update loop stopped when you call `app.unmount()`.
- Safe to install during server-side rendering (Nuxt, etc.): it does nothing without a DOM.
- TypeScript types are included.

## Start your browser with --enable-precise-memory-info

The examples below use Chrome. For another Chromium-based browser (such as Edge), pass the same flags to that browser's executable.

```
# Linux
google-chrome --enable-precise-memory-info --enable-memory-info

#MacOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --enable-precise-memory-info --enable-memory-info
or
open -a 'Google Chrome' --args --enable-precise-memory-info --enable-memory-info
```

## Development

```
// install dependencies
npm install
// run example locally and start server
npm run dev
```
