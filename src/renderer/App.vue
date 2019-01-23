<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: 'api_demo'
    ,
    created () {
// fails and will log a warning.
      //this.$validator.locale = 'zh_CN'

// works and will regenerate the error messages.
      //this.$i18n.locale = 'zh_CN'
    }
  }
</script>

<style>
    /* CSS */
</style>
