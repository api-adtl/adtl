<template>
    <div>
        <br><br><br>
        <form name="jijk">
            <div>
                项目名字：
                <Input v-model="obj_data.name" placeholder="Enter name" style="width: auto"/>

            </div>
            <br>
            <div>
                项目描述：

                <Input v-model="obj_data.description" type="textarea" :rows="4" placeholder="Enter something..."/>
            </div>
            <br>
            <Button type="success" @click="success">保存</Button>
            <Button type="success">
                <router-link to="/open">项目首页</router-link>
            </Button>


        </form>
    </div>
</template>

<script>
  import fs from 'fs'
  import jsonFormat from 'json-format'

  export default {
    name: 'create',
    data () {
      return {
        obj_data: {
          name: '项目名字',
          description: '项目描述'
        }
      }
    },
    props: ['index'],
    components: {},
    methods: {
      success () {
        console.log(this.index);
        fs.writeFile(this.index, jsonFormat(this.obj_data), {
          encoding: 'utf8',
          flag: 'w+'
        }, (err) => {
          if (err) throw err
          //console.log('文件已保存');
          this.$Message.warning('保存成功!')
          this.$router.go(-1)

        })
      },
      read () {
        fs.readFile(this.index, {
          encoding: 'utf8'
        }, (err, data) => {
          if (err) {
            throw err
          }
          console.log('这是配置文件的内容:', data)
          this.obj_data = JSON.parse(data)
        })
      },
    },
    mounted () {
      console.log('当前索引文件:', this.index)
      fs.access(this.index, fs.constants.F_OK, (err) => {
        if (err) {
          console.log('不存在')

        } else {
          console.log('存在')
          this.read()

        }

      })
    }
  }
</script>

<style>

</style>
