<template>
    <div style="overflow-y: auto">
        <div >
            <Collapse>
                <Panel :name="groupobj.e_name" v-for="groupobj in listdata.group">
                    {{groupobj.name}} <span class="type">{{groupobj.type}}</span>
                    <p slot="content">
                        <list_index @add_content="add_content" :add="add" :dd="groupobj" :dir="groupobj.e_name|dirr(dir)"></list_index>
                    </p>
                </Panel>

            </Collapse>
            <CellGroup>
                <Cell :extra="apiobj.request_type" :title="apiobj.name"
                      :to="apiobj.number|apito" style="border: #ccc solid 1px;margin-top: 2px"
                      v-for="apiobj in listdata.api"/>
            </CellGroup>

        </div>

        <div style="margin-bottom: 1px" v-if="add">
            <Button @click="add_group" size="small" type="primary">+分组</Button>

            <Button @click="add_api" size="small" type="primary">+API</Button>
        </div>

        <div v-if="dir!='.' && add" >
            <Button @click="group_info" size="small" type="primary">当前分组信息</Button>
            <Button @click="edit_group" size="small" type="primary">编辑分组</Button>
            <Button @click="del_group" size="small" type="primary">删除分组</Button>
        </div>

    </div>

</template>

<script>
  import lists from '@/logic/lists'
  import list_index from './index'
  import path from 'path'

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
      'f5'
    ],
    watch: {
      f5 () {
        console.log('f5');
        this.init()
      }
    },
    //dir
    filters: {
      dirr (value, dir) {
        return path.join(dir, value)
      },
      apito (value) {
        return {name: 'api', query: {number: value}}
      }
    },
    components: {list_index},
    methods: {
      empty(valuee){
        console.log('ll',valuee);
        return this.$lodash.isEmpty(valuee);
      },
      group_info(){
        this.$router.push({name: 'group_info', query: {
            dir: this.dd.dir,
            e_name:this.dd.e_name
          }})
      },
      edit_group () {
        if (this.dir != '.' && this.listdata.dir != '.') {
          this.$router.push({name: 'edit_group', query: {
            dir: this.dd.dir,
              e_name:this.dd.e_name
          }})
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
              listo.remove(this.dd.e_name,()=>{
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
      add_content(content){
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
      init () {
        let listo = new lists(this.dir)
        listo.read((data) => {
          this.listdata = data
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
