<template>
  <div>
    增加API

    <div>
      请求类型：
      <RadioGroup v-model="form.request_type">
        <Radio label="get"></Radio>
        <Radio label="post"></Radio>
        <Radio label="put"></Radio>
        <Radio label="patch"></Radio>
        <Radio label="delete"></Radio>
        <Radio label="view"></Radio>
        <Radio label="image"></Radio>
      </RadioGroup>
    </div>


  </div>
</template>

<script>


  export default {
    name: 'kong',
    components: {  },
    methods: {

    },
    created(){


    }
  }
</script>

<style>

</style>
