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

<style>
body {
  background-color: lightgrey !important;
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
.mstats {
  position: absolute;
}
.topRight {
  top: 0;
  right: 0;
}
.topLeft {
  top: 0;
  left: 0;
}
.bottomLeft {
  bottom: 0;
  left: 0;
}
.bottomRight {
  bottom: 0;
  right: 0;
}
</style>
