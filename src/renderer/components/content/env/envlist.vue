<template>
  <div>
    <form action="">
      <table border="1" style="    width: 100%;">
        <tr>
          <th>
            变量名字
          </th>
          <th>
            变量默认值
          </th>
          <th>
            提示信息
          </th>
        </tr>
        <tr v-for="(input,key) in value">
          <th class="thinput">
            <Input type="text"
                   v-model="value[key].name"
                   placeholder="变量名字" />
          </th>
          <th class="thinput">
            <Input type="text" v-model="value[key].value" placeholder="变量值" />
          </th>
          <th class="thinput">
            <Input type="text" v-model="value[key].description" placeholder="提示信息" />
          </th>
        </tr>
        <tr>
          <th colspan="3">
            <div @click="add_one">
              增加一个
            </div>
          </th>
        </tr>
      </table>
    </form>
    <Button  @click="save" type="warning" >保存</Button>
  </div>
</template>

<script>
export default {
  name: "envlist",
  props: [
    //数据传参
    'value'
  ],

  methods: {
    add_one() {
      this.value.push({
        name: '',
        value: '',
        description: ''
      })
    },
    save(){
      this.$emit('input',this.value);
      this.$emit('save',this.value);

    }
  }
}
</script>

<style scoped>
.thinput{
  padding: 5px;
}
</style>