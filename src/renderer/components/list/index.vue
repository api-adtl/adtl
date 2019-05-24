<template>
    <div style="overflow-y: auto">
        <div :style="style2" style="margin-left: 3px;">
            <div>
                <Collapse>
                    <Panel :name="groupobj.e_name" v-for="groupobj in listdata.group">
                        {{groupobj.name}} <span class="group_type">{{groupobj.type}}</span>   
                        
                        
                        <p slot="content">
                            <list_index :add="add" :dd="groupobj"
                                        :dir="groupobj.e_name|dirr(dir)" 
                                        :zhantie="zhantie"
                                        v-on:fuzhi="fuzhi" 
                                        :f5="f5"
                                        @add_content="add_content">
                            </list_index>
                        </p>
                    </Panel>

                </Collapse>
                <div>
                  <div  v-for="apiobj in listdata.api" >
                    <div  :class="apicalss" >
                        <div @click.left="goto(apiobj)" @click.right="youjian(apiobj)"  >
                          <Poptip trigger="click"  content="点击打开，右击复制,再点取消复制">
                            <div>
                             
                              <div class="fl">
                                 {{apiobj.name}}
                              </div> 
                              <div class="fl" >
                                <span class="request_type">
                                  {{apiobj.request_type}}
                                </span>
                              </div>

                            </div>
                          </Poptip>
                          
                        </div>
                      
                    </div>
                  </div>
                </div>
                

            </div>
            <div style="margin-bottom: 1px" v-if="add">
                <Button @click="add_group" size="small" type="primary">+分组</Button>

                <Button @click="open_in_folder" size="small" type="primary">OIF</Button>
            </div>


            <div v-if="dir!='.' && add">

                <Button v-if="dd.type  != 'test'" 
                @click="add_api" size="small" type="primary">+API</Button>
                <Button v-if="dd.type  == 'test'" 
                @click="add_test" size="small" type="info">+TEST</Button>

                <Button v-if="dd.type  != 'test'" 
                 @click="group_info"  size="small" type="primary">当前分组参数</Button>
                <Button @click="edit_group" size="small" type="primary">编辑分组</Button>
                <Button @click="del_group" size="small" type="primary">删除分组</Button>
                <Button v-if="zhantie" @click="zhantie2" size="small" type="primary">粘贴</Button>
            </div>
        </div>


    </div>

</template>

<script>
  import lists from '@/logic/lists'
  // import tool from '@/libs/tool'
  import list_index from './index'
  import path from 'path'
  import {shell} from 'electron'
  export default {
    name: 'list_index',
    data () {
      return {
        listdata: {
          group: {},
          api: {}
        }
      }
    },
    props: [
      'dir',
      'add',
      'dd',
      'f5',
      'zhantie'
    ],
    watch: {
      f5 () {
        console.log('f5')
        this.init()
      }
    },
    //dir
    filters: {
      dirr (value, dir) {
        return path.posix.join(dir, value)
      },
      apito (value) {
        console.log('79', value)
        if (value.request_type == 'ws') {
          return {name: 'api_ws', query: {number: value.number}}
        } else {
          return {name: 'api', query: {number: value.number}}
        }

      }
    },
    computed: {
      style2 () {
        return {
          // 'border-color':tool.getRandomColor()
        }
      },
      apicalss(){
        if(this.dd.type == 'test'){
          return 'api-li-test';
        }
        if(this.dd.type == 'ws'){
          return 'api-li-ws';
        }

        return 'api-li';
      }
    },
    components: {list_index},
    methods: {
      apito(value)
      {
        console.log('79', value)
        if (value.request_type == 'ws') {
          return {name: 'api_ws', query: {number: value.number}}
        } else {
          return {name: 'api', query: {number: value.number}}
        }
      },
      goto(api){
        this.$router.push(this.apito(api));
        console.log(api);
      },
      youjian(api){
        this.$ls.set('fuzhi',api);
        this.fuzhi();
      },
      fuzhi(){
        this.$emit('fuzhi');
      },
      zhantie2(){
        console.log("粘贴1");

        this.$emit('add_content', {
          name: 'fuzhi_api',
          query: {
            dir: this.dir
          }
        })
        this.$emit('fuzhi');
      },
      open_in_folder () {
        this.$Message.loading('正在使用文件管理器打开...')
        setTimeout(() => {
          shell.showItemInFolder(path.join(this.$store.state.now_open, this.dir))
        }, 1000)

      },
      empty (valuee) {
        console.log('ll', valuee)
        return this.$lodash.isEmpty(valuee)
      },
      group_info () {
        this.$router.push({
          name: 'group_info', query: {
            dir: this.dd.dir,
            e_name: this.dd.e_name
          }
        })
      },
      edit_group () {
        if (this.dir != '.' && this.listdata.dir != '.') {
          this.$router.push({
            name: 'edit_group', query: {
              dir: this.dd.dir,
              e_name: this.dd.e_name
            }
          })
        }

      },
      del_group () {
        console.log('shanchu', this.dd)
        this.$Modal.confirm({
          title: '删除警告!',
          content: '<p>您确定要删除这个分组么?名字:' + this.dir,
          onOk: () => {
            let listo = new lists(this.dd.dir)
            listo.read(() => {
              listo.remove_group(this.dd.e_name, () => {
                this.$Message.info('删除完成!')
                this.$router.push('/open')
              })
            })

          },
          onCancel: () => {
            this.$Message.info('出尔反尔!')
          }
        })

      },
      add_group () {
        console.log('增加分组')
        this.$emit('add_content', {
          name: 'add_group',
          query: {
            dir: this.dir
          }
        })
      },
      add_content (content) {
        this.$emit('add_content', content)
      },
      add_api () {
        console.log('增加API')
        this.$emit('add_content', {
          name: 'add_api',
          query: {
            dir: this.dir
          }
        })
      },
      add_test(){
        this.$emit('add_content', {
          name: 'add_test',
          query: {
            dir: this.dir
          }
        })
      },
      init () {
        let listo = new lists(this.dir)
        listo.read((data) => {
          this.listdata = this.$lodash.cloneDeep(data)
          this.$lodash.forIn(this.listdata.api, (b, key) => {

            this.$store.commit('add_api', b)
            this.listdata.api[key].number = this.$store.getters.apinum

          })

          this.$lodash.forIn(this.listdata.group, (b, key) => {

            this.$store.commit('add_group', this.$lodash.clone(b))
            this.listdata.group[key].number = this.$store.getters.apinum

          })
        })
      }
    },
    created () {
      this.init()
      
    }
  }
</script>

<style>
  
  .type {
      font-size: 1.1em;
      font-weight: bold;
      color: brown;
  }

  .ivu-cell-extra {
      font-size: 1.1em;
      font-weight: bold;
      color: brown;
  }
</style>
