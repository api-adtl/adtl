<template>
    <div>
        <div>
            {{dd}}
        </div>

        <br>

        <div>
            <Menu @on-select="select1" active-name="readme" mode="horizontal" theme="light">
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

                <MenuItem name="form">
                    <Icon type="ios-construct"/>
                    form
                </MenuItem>

                <MenuItem name="header">
                    <Icon type="ios-construct"/>
                    header
                </MenuItem>
            </Menu>

            <div v-show="select.readme">
                <div>
                    <Button @click="()=>{this.edit.readme=!this.edit.readme}" icon="ios-search"
                            shape="circle"
                            type="primary">编辑
                    </Button>
                    <readme :dd="dd" :edit="edit.readme"></readme>

                </div>

            </div>
            <div v-show="select.jiben">
                基本信息
                <Button @click="()=>{this.edit.jiben=!this.edit.jiben}" icon="ios-search"
                        shape="circle"
                        type="primary">编辑
                </Button>
                <basic :dd="dd" :edit="edit.jiben"></basic>


            </div>

            <div v-show="select.get">
                GET信息
            </div>
            <div v-show="select.form">
                表单信息
            </div>
            <div v-show="select.header">
                表单信息
            </div>


        </div>


    </div>
</template>

<script>
  import readme from './api/readme'
  import basic from './api/basic'
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
        select: {
          readme: true,
          jiben: false,
          get: false,
          form: false,
          header: false
        },
        edit: {
          readme: false,
          jiben: false,
          get: false,
          form: false,
          header: false
        }
      }
    },
    //无状态组件
    functional: false,

    extends: {
      // 扩展
    },

    props: [
      'number'
    ],

    components: {
      //注册组件
      readme,
      basic
    },
    watch: {
      number (new1) {
        this.dd = this.$store.state.api_list[new1]
      }
    },
    methods: {
      //方法列表
      select1 (name) {
        console.log('select1')
        this.select.readme = false
        this.select.jiben = false
        this.select.get = false
        this.select.form = false
        this.select.header = false
        this.select[name] = true
      }
    },

    created () {
      //创建完成后
    }
  }
</script>

<style>

</style>
