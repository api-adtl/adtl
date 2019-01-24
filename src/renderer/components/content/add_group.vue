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
                <Input v-model="form.e_name" placeholder="请输入分组标识(不可修改)" style="width: 300px"/>
                <span>{{ errors.first('e_name') }}</span>
            </div>
            <br>

            <div>
                接口类型：
                <RadioGroup v-model="form.type">
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
  import {Validator} from 'vee-validate'
  import lists from '@/logic/lists'

  Validator.localize('zh_CN', {
    attributes: {
      name: '名字',   //设置表单属性对应的中文名
      e_name: '标识',
      type: '类型',

    }
  })
  export default {
    name: 'add_group',
    data () {
      return {
        form: {
          name: '默认名字',
          e_name: 'biaoshi',
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
          },
          type: {
            required: true
          }
        }
      }
    },
    components: {},
    methods: {
      save () {
        // 先进行验证
        this.$validator.validate().then((result) => {
          console.log(result)
          if (result) {
            // 验证通过
            this.save_file()
          }
        })
      },
      save_file () {
        let listo = new lists(this.form.dir)
        listo.read(() => {

          listo.add_group(this.form, () => {

          })
        })

      }
    },
    created () {

    }
  }
</script>

<style>

</style>
