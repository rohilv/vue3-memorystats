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

    <p class="note">
      Needs a Chromium-based browser (Chrome, Edge, Brave, Opera). For precise numbers, start it with
      <code>--enable-precise-memory-info</code>; see the
      <a href="https://github.com/rohilv/vue3-memorystats#readme">README</a>.
    </p>
  </main>
</template>

<script>
export default {
  data() {
    return {
      chunks: []
    }
  },
  methods: {
    allocate() {
      // ~1M doubles is about 8 MB of JS heap
      this.chunks.push(new Array(1_000_000).fill(0).map(Math.random))
    },
    release() {
      this.chunks = []
    }
  }
}
</script>

<style scoped>
main {
  max-width: 40rem;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: #333;
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
  color: #555;
}
</style>
