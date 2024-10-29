<template>
  <RouterView/>
</template>

<script>
import HomePage from './views/Home.vue'

export default {
  name: 'App',
  components: {
    HomePage,
  }
}
</script>

<style>
body {
  font-family: Calibri,serif;
}
</style>
