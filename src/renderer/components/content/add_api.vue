<template>
    <div>
        <h3>
            增加API
        </h3>

        <br>
        <br>
        <div>
            名字：
            <Input name="name" placeholder="请输入分组名字" style="width: 300px"
                   v-model="form.name" v-validate="validation.name"/>
            <span>{{ errors.first('name') }}</span>
        </div>
        <br>

        <div>
            标识：
            <Input placeholder="请输入分组标识(不可修改)" style="width: 300px" v-model="form.e_name"/>
            <span>{{ errors.first('e_name') }}</span>
        </div>
        <br>

        <div>
            请求类型：
            <RadioGroup v-model="form.request_type">
                <Radio label="get"></Radio>
                <Radio label="post"></Radio>
                <Radio label="put"></Radio>
                <Radio label="patch"></Radio>
                <Radio label="delete"></Radio>
                <Radio label="view"></Radio>
                <Radio label="image"></Radio>
            </RadioGroup>
        </div>
        <br>
        <Button @click="save" type="primary">保存</Button>

    </div>
</template>

<script>

  import {Validator} from 'vee-validate'
  import lists from '@/logic/lists'
  import e_name from '@/validation/e_name'

  Validator.localize('zh_CN', {
    attributes: {
      name: '名字',   //设置表单属性对应的中文名
      e_name: '标识',
      type: '类型',

    }
  })
  Validator.extend('e_name', e_name)
  export default {
    name: 'kong',
    data () {
      return {
        form: {
          request_type: 'post',
          name: '默认名字',
          e_name: 'biaoshi',
          dir: '.',
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
          },

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

          listo.add_api(this.form, () => {

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
