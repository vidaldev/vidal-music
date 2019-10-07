<template>
  <div id='app'>
    <pmHeader></pmHeader>
    <router-view></router-view>
    <pmFooter></pmFooter>
  </div>
</template>

<script>
import pmFooter from '@/components/layout/Footer.vue'
import pmHeader from '@/components/layout/Header.vue'

export default {
  name: 'app',
  components: { pmFooter, pmHeader }
}
</script>

<style lang="scss">
  @import './scss/main.scss';
  .is-active {
    border: 3px #23d160 solid
  }

</style>
