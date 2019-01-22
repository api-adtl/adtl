<template>
    <div>
        这是列表
        <br>
        <Button type="primary" @click="add_group">+分组</Button>
        <Button type="primary" @click="add_api">+API</Button>

    </div>

</template>

<script>

  export default {
    name: 'list',
    components: {},
    methods: {
      add_group () {
        console.log('增加分组');
        this.$emit('add_content', 'add_group');
      },
      add_api () {
        console.log('增加API')
        this.$emit('add_content', 'add_api');
      }
    },
    created () {

    }
  }
</script>

<style>

</style>
