<template>
    <div>WS --
        API : {{api}}<br>
        group:{{group}}<br>
        send: {{send2}}{{send}} <br>
        sendstr : {{sendstr}}
        <br>
        <Button @click="jiegou" size="small" type="primary">应用结构</Button>
        <Button @click="random" size="small" type="primary">应用生成器</Button>

        <br>

        <Button @click="test" size="small" type="primary">进行测试</Button>
        <response :response="response"></response>

    </div>
</template>
<script>
  import test from '@/logic/test'
  import response from './response'
  import Mock from 'mockjs'

  export default {
    name: 'test_ws',
    data () {
      return {
        testob: {},
        response: {},
        send2: {},
        sendstr: ''
      }
    },

    props: [
      //数据传参
      'api',
      'group',
      'send',
      'grnerated'
    ],
    computed: {
      //计算属性
    },
    components: {
      //注册组件
      response
    },
    methods: {
      //方法列表
      random () {
        console.log('应用生成器!')
        let mmrule = {}
        let send = this.send2
        var Random = Mock.Random
        for (let valu of this.grnerated) {
          mmrule[valu.name] = {}
          if (this.$lodash.isEmpty(valu.format)) {
            //没有参数
            mmrule[valu.name][valu.name2] = Random[valu.unit]()
          } else {
            if (this.$lodash.isArray(valu.format)) {
              //多个参数
              mmrule[valu.name][valu.name2] = Random[valu.unit](...valu.format)
            } else {
              //一个参数
              mmrule[valu.name][valu.name2] = Random[valu.unit](valu.format)
            }
          }
        }

        this.send2 = this.$lodash.merge(send, mmrule)
        console.log('se4nd', this.send2)

      },
      jiegou () {
        console.log('进行结构应用!')
        this.sendstr = this.send.structure
        this.sendstr = this.sendstr.replace('$url', this.api.url)
        this.sendstr = this.sendstr.replace('$get', JSON.stringify(this.send2.get))
        this.sendstr = this.sendstr.replace('$form', JSON.stringify(this.send2.form))

      },
      test () {
        //进行测试
        this.test1(JSON.parse(this.sendstr))
      },
      test1 (send) {
        console.log('send', send)
        this.testob.send(send, (data) => {
          console.log('返回数据!', data)
          this.response = this.$lodash.cloneDeep(data)
        })
      },
      init () {
        this.send2 = this.$lodash.cloneDeep(this.send)
        console.log('log,init')
        this.testob = new test(this.api, this.group)
      }
    },
    watch: {
      //监听列表
      send: {
        deep: true,
        handler (noww1) {
          console.log(noww1)
          this.init()
        }

      }
    },

    created () {
      //创建完成后
      this.init()
    }
  }
</script>

<style>

</style>
