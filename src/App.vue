<template>
  <div id="app">
    <router-view />
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
import { mapActions } from 'vuex'
export default {
  mounted () {
    this.getAddress()
  },
  components: {
    FooterGuide
  },
  methods: {
    ...mapActions(['getAddress'])
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
