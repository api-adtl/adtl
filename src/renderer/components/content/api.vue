<template>
    <div style="overflow: auto;height: 600px;">
        <div>
            API信息:
            {{dd1}}
            <Button @click="deletee" size="small" type="primary">删除API</Button>
            <br>
            分组信息 : {{group}} <br>
            SEND : {{send}} <br>
            grnerated: {{grnerated}}


        </div>

        <br>

        <div>
            <Menu @on-select="select1" active-name="readme" mode="horizontal" theme="light">
                <MenuItem name="readme" style="padding: 0 10px;">
                    <Icon type="ios-paper"/>
                    readme
                </MenuItem>
                <MenuItem name="jiben" style="padding: 0 10px;">
                    <Icon type="ios-settings"/>
                    基本信息
                </MenuItem>
                <MenuItem name="get" style="padding: 0 10px;">
                    <Icon type="ios-construct"/>
                    get
                </MenuItem>

                <MenuItem name="form" style="padding: 0 10px;">

                    <Icon type="ios-apps"/>
                    form
                </MenuItem>

                <MenuItem name="header" style="padding: 0 10px;">
                    <Icon type="md-attach"/>
                    header
                </MenuItem>

                <MenuItem name="test" style="padding: 0 10px;">
                    <Icon type="ios-alarm"/>
                    test
                </MenuItem>

                <MenuItem name="generated" style="padding: 0 10px;">
                    <Icon type="ios-alarm"/>
                    generated
                </MenuItem>


            </Menu>

            <div v-show="select.readme">
                <div>
                    <Button @click="()=>{this.edit.readme=!this.edit.readme}" icon="ios-search"
                            shape="circle"
                            type="primary">编辑
                    </Button>
                    <readme :dd="dd1" :edit="edit.readme" v-model="is_init"></readme>

                </div>

            </div>
            <div v-if="is_init" v-show="select.jiben">
                基本信息
                <Button @click="()=>{this.edit.jiben=!this.edit.jiben}" icon="ios-search"
                        shape="circle"
                        type="primary">编辑
                </Button>
                <basic :dd="dd1" :edit="edit.jiben"></basic>


            </div>

            <div v-if="is_init" v-show="select.get">
                <Button @click="()=>{this.edit.get=!this.edit.get}" icon="ios-search"
                        shape="circle"
                        type="primary">编辑
                </Button>
                <api_get :dd="dd1" :edit="edit.get" v-model="send.get"></api_get>

            </div>
            <div v-if="is_init" v-show="select.form">
                <Button @click="()=>{this.edit.form=!this.edit.form}" icon="ios-search"
                        shape="circle"
                        type="primary">编辑
                </Button>
                <api_form :dd="dd1" :edit="edit.form" v-model="send.form">
                </api_form>
            </div>
            <div v-if="is_init" v-show="select.header">
                <Button @click="()=>{this.edit.header=!this.edit.header}" icon="ios-search"
                        shape="circle"
                        type="primary">编辑
                </Button>
                <api_header :dd="dd1" :edit="edit.header" v-model="send.headers">
                </api_header>
            </div>

            <div v-if="is_init" v-show="select.test">
                <api_test :api="dd1" :grnerated="grnerated"
                          :group="group"
                          :send="send"></api_test>
            </div>

            <div v-if="is_init" v-show="select.generated">
                <Button @click="()=>{this.edit.generated=!this.edit.generated}" icon="ios-search"
                        shape="circle"
                        type="primary">编辑
                </Button>
                <generated :api="dd1"
                           :edit="edit.generated"
                           :group="group"
                           :send="send"

                           v-model="grnerated"></generated>
            </div>


        </div>


    </div>
</template>

<script>
  import readme from './api/readme'
  import basic from './api/basic'
  import api_get from './api/get'
  import api_form from './api/form'
  import api_header from './api/header'
  import api_test from './api/test'
  import lists from '../../logic/lists'
  import group from '@/logic/group'
  import generated from './api/generated'

  export default {
    name: 'api',
    //混合
    mixins: [],
    delimiters: [
      //改变纯文本插入分隔符
    ],
    data () {
      return {
        group: {},
        is_init: false,
        dd1: this.$store.state.api_list[this.number],
        send: {
          get: {},
          form: {},
          headers: {}
        },
        select: {
          readme: true,
          jiben: false,
          get: false,
          form: false,
          header: false,
          test: false,
          generated: false
        },
        grnerated: {},
        edit: {
          readme: false,
          jiben: false,
          get: false,
          form: false,
          header: false,
          test: false,
          generated: false
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
      basic,
      api_get,
      api_form,
      api_header,
      api_test,
      generated
    },
    watch: {
      number () {
        this.init()
      }
    },
    methods: {
      deletee () {
        console.log('删除')
        let listb = new lists(this.dd1.dir)
        listb.read((data) => {
          console.log('data', data)
          listb.remove_api(this.dd1.e_name, () => {
            this.$Message.success('删除成功!')
            this.$router.push('/open/')
          })
        })

      },
      //方法列表
      select1 (name) {
        console.log('select1')
        this.select.readme = false
        this.select.jiben = false
        this.select.get = false
        this.select.form = false
        this.select.header = false
        this.select.test = false
        this.select.generated = false
        this.select[name] = true
      },
      //初始化
      init () {
        this.dd1 = this.$store.state.api_list[this.number]
        this.read_api()
        let groupb = new group(this.dd1.dir)
        groupb.read('info', {}, (data) => {
          if (this.$lodash.isEmpty(data)) {
            groupb.readp('info', {}, (data) => {
              console.log('read group', data)
              this.group = data
            })

          } else {
            this.group = data
          }
        })
      },
      read_api () {
        console.log('read_api', this.dd1.dir)
        let listo = new lists(this.dd1.dir)
        listo.read((data) => {
          console.log('read_api ok:', data)
          this.dd1 = data.api[this.dd1.e_name]
        })
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
