<template>
    <div>
        修改环境变量 - 0
    </div>
</template>

<script>

  import envv from '../../logic/envv'

import lodash from 'lodash'

  export default {
    name: 'edit_env',
    data () {
      return {
        listo: {},
        env_list: {},
        form: {
          name: '默认名字',
          e_name: 'fenzu',
          type: 'http',
          dir: '.'
        },
        validation: {
          name: {
            required: true,
            min: 2,
            max: 20
          },
          ename: {
            required: true,
            alpha_num: true,
            min: 5,
            max: 20,
            e_name: true
          },
          type: {
            required: true
          }
        },
        attributes: {
          name: '名字1',   //设置表单属性对应的中文名
          ename: '标识',
          type: '类型'
        }
      }
    },
    props:[
      'dir',
      'e_name'
    ],
    components: {},
    methods: {
      save () {
        // 先进行验证
        this.$validator.validate().then((result) => {
          console.log('验证结果:', result, this.$validator.errors.all())
          if (result) {
            // 验证通过
            this.save_file()
          }
        })
      },
      save_file () {

        this.listo.add_group(this.$lodash.clone(this.form), () => {
          this.$Message.success("保存成功");
          this.$router.push('/open')
        })

      },
      init () {
        console.log("init",this.dir,this.e_name);
        this.listo = new envv()
        this.listo.read((data) => {
          this.env_list = data
          console.log('106',this.env_list)
        })
      }
    },
    created () {
      this.init()
      this.$validator.localize('zh_CN', {
        attributes: this.attributes
      })
      this.$validator.extend('e_name', {
        getMessage (field) {
          return field + '字段不能为这个值(保留字/重复的标识)!'
        },
        validate: (value) => {

          let no = [
            '0',
            'list',
            'api',
            'lists',
            'group'
          ]
          no = lodash.concat(no, this.lists.biaoshi)
          if (lodash.indexOf(no, value) > -1) {
            return false
          }
          return true
        }
      })
    }
  }
</script>

<style>

</style>
