<template>
    <div>
        分组信息{{dir}}  || {{e_name}}
        <form name="addgroup">
            <div>
                名字：
                <Input v-model="form.domain" name="domain" v-validate="validation.domain"
                       placeholder="域名" style="width: 300px"/>
                <span>{{ errors.first('domain') }}</span>
            </div>
            <br>

            <div>
                标识：
                <Input name="port" placeholder="端口" style="width: 300px"
                       v-model="form.port" v-validate="validation.port"/>
                <span>{{ errors.first('port') }}</span>
            </div>
            <br>

            <div>
                接口类型：
                <RadioGroup v-model="form.persistence" v-validate="validation.persistence">
                    <Radio label="1"></Radio>
                    <Radio label="0"></Radio>
                </RadioGroup>

            </div>
            <br>
            <Button type="primary" @click="save">保存</Button>

        </form>
    </div>
</template>

<script>

  import group from '@/logic/group'
  import lodash from 'lodash'

  export default {
    name: 'add_group',
    data () {
      return {
        groupob: {},
        groupinfo: {},
        form: {
          persistence:'0',
          port:80,
          domain:'a.com'

        },
        validation: {

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

        this.groupob.save('info',this.form,(data)=>{
            console.log("save_ok",data);
            this.$Message.success("保存成功!");
        });

      },
      init () {
        console.log("init",this.dir,this.e_name);
        this.groupob = new group(this.dir+'/'+this.e_name)
        this.groupob.read('info',this.form,(data) => {
          this.form = this.$lodash.clone(data)
          console.log('106',this.form,this.e_name)
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
