<template>
  <div id="app">
    <LfBpmn
        :custom-components="customComponents"/>
  </div>
</template>

<script>
import SendTask from './customComponents/SendTask'

export default {
  name: 'App',
  components: {},
  data() {
    return {
      customComponents: [SendTask],
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
