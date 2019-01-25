<template>
    <div style="overflow-y: auto">
        <div style="border: cadetblue solid 1px ;margin: 2px;padding:1px 1px">
            <Collapse>
                <Panel :name="groupobj.e_name" v-for="groupobj in listdata.group">
                    {{groupobj.name}} <span class="type">{{groupobj.type}}</span>
                    <p slot="content">
                        <list_index :add="add" :dd="groupobj" :dir="groupobj.e_name|dirr(dir)"></list_index>
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

        <div v-if="dir!='.'">
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
        listdata: {}
      }
    },
    props: [
      'dir',
      'add',
      'dd'
    ],
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
      edit_group () {
        if (this.dir != '.' && this.listdata.dir != '.') {
          console.log(this.dir, this.listdata)
          // this.$router.push({name: 'edit_group', query: {
          //   dir: this.dir,
          //     e_name:this.listdata
          // }})
        }

      },
      del_group () {
        console.log('shanchu', this.dd)
        this.$Modal.confirm({
          title: '删除警告!',
          content: '<p>您确定要删除这个分组么?名字:' + this.dir,
          onOk: () => {
            let listo = new lists(this.dd.dir)
            listo.remove(this.dd.e_name)
          },
          onCancel: () => {
            this.$Message.info('出尔反尔!')
          }
        })

      },
      add_group () {
        console.log('增加分组')
        this.$emit('add_content', {
          content: 'add_group',
          query: {
            dir: this.dir
          }
        })
      },
      add_api () {
        console.log('增加API')
        this.$emit('add_content', {
          content: 'add_api',
          query: {
            dir: this.dir
          }
        })
      }
    },
    created () {
      let listo = new lists(this.dir)
      listo.read((data) => {
        this.listdata = data
        this.$lodash.forIn(this.listdata.group, (group) => {
          console.log('group', group)
        })
      })
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
