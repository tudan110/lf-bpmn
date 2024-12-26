<template>
  <div id="app">
    <LfBpmn
        :custom-components="customComponents"
        :show-base-components="true"
        :show-task-components="true"
        :show-custom-components="true"
        :show-atomic-power-components="false"
        @click="onClick"
    />
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
  },
  methods: {
    onClick(node) {
      console.log(node)
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
