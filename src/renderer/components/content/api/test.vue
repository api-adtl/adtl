<template>
    <div>
        测试组件
        {{api}}<br>
        {{group}}<br>
        {{send}}
        <Button @click="test" size="small" type="primary">进行测试</Button>

    </div>
</template>
<script>
  import test from '@/logic/test'

  export default {
    name: 'test',
    data () {
      return {
        testob: {}
      }
    },


    props: [
      //数据传参
      'api',
      'group',
      'send'
    ],
    computed: {
      //计算属性
    },
    components: {
      //注册组件
    },
    methods: {
      //方法列表
      test () {
        //进行测试
        console.log('send', this.send)
        this.testob.send(this.send)
      },
      init () {
        this.testob = new test(this.api, this.group)

      }
    },
    watch: {
      //监听列表
    },

    created () {
      //创建完成后
      this.init()
    }
  }
</script>

<style>

</style>
