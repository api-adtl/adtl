<template>
  <div>
    <h3>
      headert头信息
    </h3>
    <envlist v-model="form" @save="save">

    </envlist>


    <div>
      <div v-for="(input,key) in form2" :key="key">
        {{ input.name }} :
        <Input style="width: 300px" v-model="input.value" />
        <span>
            {{ input.description }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/logic/api'

import envlist from "../env/envlist";
export default {
  name: 'get',

  data() {
    return {
      form: [],
      form2: [],
    }
  },
  props: [
    //数据传参
    'dd',
    'edit'
  ],
  components:{envlist},
  methods: {
    //方法列表
    //方法列表
    init() {
      this.apiobj = new api(this.dd)
      this.apiobj.read('header', this.$lodash.cloneDeep(this.form), (data) => {
        console.log('header', data)
        this.form = data
        this.form2 = this.$lodash.cloneDeep(this.form)

      })
    },
    save() {
      console.log('save4header')
      let newdata = []
      for (let val of this.form) {
        if (val.name != '') {
          newdata.push(val)
        }
      }
      this.form = newdata
      this.$emit('input', newdata);
      this.$emit('save', newdata);
      this.form2 = this.$lodash.cloneDeep(this.form)
      this.apiobj.save('header', newdata, () => {
        console.log('保存成功')
      })
    },
    add_one() {
      this.form.push({
        name: '',
        value: '',
        description: ''
      })
    }
  },
  watch: {
    //监听列表

    dd() {
      this.init()
    },
    form2(now2) {
      console.log('from2', now2)
      let va = {}
      for (let vv of now2) {
        va[vv.name] = vv.value
      }
      //this.value = va
      this.$emit('input', va)
    }

  },
  created() {
    //创建完成后
    this.init()
  },
}
</script>

<style>

</style>
