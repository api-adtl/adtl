<template>
    <div>
        <div>
            {{dd}}
        </div>

        <br>

        <div>
            <Menu @select="select" active-name="1" mode="horizontal" theme="primary">
                <MenuItem name="readme">
                    <Icon type="ios-paper"/>
                    readme
                </MenuItem>
                <MenuItem name="jiben">
                    <Icon type="ios-people"/>
                    基本信息
                </MenuItem>
                <MenuItem name="get">
                    <Icon type="ios-construct"/>
                    get
                </MenuItem>
            </Menu>
            <div v-show="select.readme">
                <mavon-editor
                        :subfield="false"
                        :toolbarsFlag="false"
                        style="height: 100%"
                        v-model="readme"></mavon-editor>
            </div>
            <div v-show="select.jiben">

            </div>

            <div v-show="select.get">

            </div>
            <div v-show="select.form">

            </div>


        </div>


    </div>
</template>

<script>
  import api from '@/logic/api'

  export default {
    name: 'api',
    //混合
    mixins: [],
    delimiters: [
      //改变纯文本插入分隔符
    ],
    data () {
      return {
        dd: this.$store.state.api_list[this.number],
        readme: '',
        edit: {
          subfield: false
        },
        select: {
          readme: true,
          jiben: false,
          get: false,
          form: false
        }
      }
    },
    //无状态组件
    functional: false,

    extends: {
      // 扩展
    },
    model: {
      //定制v-model,双向绑定
    },
    props: [
      'number'
    ],
    computed: {
      //计算属性
    },
    components: {
      //注册组件
    },
    methods: {
      //方法列表
      select (name) {
        this.select.readme = false
        this.select.jiben = false
        this.select.get = false
        this.select.form = false
        this.select[name] = true
      }
    },

    created () {
      //创建完成后
      let apiobj = new api(this.dd)
      apiobj.readme((data) => {
        this.readme = data
      })
    },

    directives: {
      //自定义指令
    },
    filters: {
      //过滤器
    }
  }
</script>

<style>

</style>
