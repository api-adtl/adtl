<template>
    <div>
        这是列表
        <br>

        <div style="border: cadetblue solid 1px ;margin: 2px;padding: 2px">
            <Collapse >
                <Panel v-for="groupobj in listdata.group" :name="groupobj.e_name">
                    {{groupobj.name}} <span class="type">{{groupobj.type}}</span>
                    <p slot="content">
                        无限嵌套
                    </p>
                </Panel>

            </Collapse>
            <CellGroup>

                <Cell title="Link" extra="details" to="/components/button" />


            </CellGroup>

        </div>

            <div style="margin-bottom: 1px">
                <Button type="primary" @click="add_group">+分组</Button>
                <Button type="primary" @click="add_api">+API</Button>
            </div>



    </div>

</template>

<script>
  import lists from '@/logic/lists'

  export default {
    name: 'list',
    data () {
      return {
        listdata: {}
      }
    },
    components: {},
    methods: {
      add_group () {
        console.log('增加分组')
        this.$emit('add_content', 'add_group')
      },
      add_api () {
        console.log('增加API')
        this.$emit('add_content', 'add_api')
      }
    },
    created () {
      let listo = new lists('.')
      listo.read((data) => {
        this.listdata = data
      })
    }
  }
</script>

<style scoped>
.type{
    font-size: 1.1em;
    font-weight: bold;
    color: brown;
}
</style>
