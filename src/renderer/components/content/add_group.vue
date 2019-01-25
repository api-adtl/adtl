<template>
    <div>
        增加分组
        <form name="addgroup">
            <div>
                名字：
                <Input v-model="form.name" name="name" v-validate="validation.name"
                       placeholder="请输入分组名字" style="width: 300px"/>
                <span>{{ errors.first('name') }}</span>
            </div>
            <br>

            <div>
                标识：
                <Input name="e_name" placeholder="请输入分组标识(不可修改)" style="width: 300px"
                       v-model="form.e_name" v-validate="validation.e_name"/>
                <span>{{ errors.first('e_name') }}</span>
            </div>
            <br>

            <div>
                接口类型：
                <RadioGroup v-model="form.type" v-validate="validation.e_name">
                    <Radio label="http"></Radio>
                    <Radio label="ws"></Radio>
                </RadioGroup>

            </div>
            <br>
            <Button type="primary" @click="save">保存</Button>

        </form>
    </div>
</template>

<script>

  import lists from '@/logic/lists'
  import lodash from 'lodash'

  export default {
    name: 'add_group',
    data () {
      return {
        listo: {},
        lists: {},
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
          e_name: {
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
          e_name: '标识',
          type: '类型'
        }
      }
    },
    components: {},
    methods: {
      save () {
        // 先进行验证

        this.$validator.validate().then((result) => {
          console.log('验证结果:', result)
          if (result) {
            // 验证通过
            this.save_file()
          }
        })
      },
      save_file () {

        this.listo.add_group(this.form, () => {

        })

      },
      init () {
        this.listo = new lists(this.form.dir)
        this.listo.read((data) => {
          this.lists = data
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
            'list',
            'api',
            'lists',
            'group'
          ]
          no = lodash.concat(no, this.lists.biaoshi)
          if (lodash.indexOf(no, value)) {
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
