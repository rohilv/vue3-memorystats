<template>
  <main>
    <h1>vue3-memorystats demo</h1>
    <p>
      The graph in the top-right corner shows this page's JS heap. Allocate some memory and watch it
      climb; release it and wait for garbage collection (a red bar) to watch it drop.
    </p>

    <div class="actions">
      <button @click="allocate">Allocate ~8 MB</button>
      <button @click="release" :disabled="!chunks.length">Release all</button>
    </div>
    <p class="status">Holding {{ chunks.length }} chunk(s), about {{ chunks.length * 8 }} MB.</p>

    <p v-if="!supported" class="warn">
      This browser does not expose <code>performance.memory</code> (Firefox, Safari and every iOS
      browser don't), so the graph will read n/a. Use a Chromium-based browser on desktop or Android.
    </p>
    <p v-else-if="stuck" class="warn">
      The heap reading did not change after allocating. Your browser is probably rounding the value.
      Restart it with <code>--enable-precise-memory-info</code> (see the
      <a href="https://github.com/rohilv/vue3-memorystats#troubleshooting">README</a>).
    </p>

    <p class="note">
      Needs a Chromium-based browser (Chrome, Edge, Brave, Opera). For precise numbers, start it with
      <code>--enable-precise-memory-info</code>; see the
      <a href="https://github.com/rohilv/vue3-memorystats#readme">README</a>.
    </p>
  </main>
</template>

<script>
const heap = () => (performance.memory ? performance.memory.usedJSHeapSize : 0)

export default {
  data() {
    return {
      chunks: [],
      supported: typeof performance !== 'undefined' && !!performance.memory,
      stuck: false
    }
  },
  methods: {
    allocate() {
      const before = heap()
      // ~1M doubles is about 8 MB of JS heap
      this.chunks.push(new Array(1_000_000).fill(0).map(Math.random))
      // If the reading barely moves after ~8 MB, the browser is rounding it
      setTimeout(() => {
        this.stuck = heap() - before < 4 * 1024 * 1024
      }, 700)
    },
    release() {
      this.chunks = []
      this.stuck = false
    }
  }
}
</script>

<style scoped>
main {
  max-width: 40rem;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: var(--color-text);
}
.actions {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}
button {
  padding: 0.5rem 1rem;
  font: inherit;
  cursor: pointer;
}
button:disabled {
  cursor: not-allowed;
}
.note {
  font-size: 0.9rem;
  opacity: 0.8;
}
.warn {
  padding: 0.75rem 1rem;
  border-left: 4px solid #e0a800;
  background: rgba(224, 168, 0, 0.15);
}
a {
  color: #0b5fff;
}
@media (prefers-color-scheme: dark) {
  a {
    color: #6cb2ff;
  }
}
</style>
