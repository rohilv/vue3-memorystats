<template>
  <div>
    <h1>Garbage Values</h1>
    <ul>
      <li v-for="(value, index) in garbageValues" :key="index">{{ value }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      garbageValues: []
    }
  },
  mounted() {
    // Initialize with a garbage value
    this.addGarbageValue()

    // Add more garbage values every 10 seconds
    this.interval = setInterval(this.addGarbageValue, 5000)
  },
  beforeUnmount() {
    // Clear the interval when the component is destroyed
    clearInterval(this.interval)
  },
  methods: {
    addGarbageValue() {
      const garbage = Math.random().toString(36).substring(2, 15)
      this.garbageValues.push(garbage)
    }
  }
}
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 2rem;
  font-weight: normal;
  background-color: lightgrey;
}
@media (min-width: 1024px) {
  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }
}
h1 {
  color: #333;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background: #f4f4f4;
  margin: 5px 0;
  padding: 10px;
  border-radius: 4px;
  color: black;
}
</style>
