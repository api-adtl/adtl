import fs from 'fs'
import path from 'path'
import jsonFormat from 'json-format'
import store from '@/store'
import _ from 'lodash'

class lists {
  constructor (dir) {
    this.dir = dir
    this.obj_data = {
      group: {},
      api: {},
      biaoshi: []
    }
    this.all = {}

    this.path = path.join(store.getters.now_open.toString(), this.dir, 'list.json')
  }

  read (callback) {

    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        this.create(callback)
      } else {
        this.read2(callback)
      }

    })
  }

  create (callback) {
    fs.writeFile(this.path, jsonFormat(this.obj_data), {
      encoding: 'utf8',
      flag: 'w+'
    }, (err) => {

      if (err) {
        //不存在的文件夹
        // 创建文件夹
        fs.mkdir(path.join(store.getters.now_open.toString(), this.dir), {recursive: true}, this.read2(callback))
      }
    })
  }

  read2 (callback) {

    fs.readFile(this.path, {
      encoding: 'utf8'
    }, (err, data1) => {
      if (err) {
        throw err
      }
      this.obj_data = JSON.parse(data1)
      let biaoshi = []
      console.log('path', this.obj_data.api)

      _.forIn(this.obj_data.api, (b, key) => {
        biaoshi.push(b.e_name)
        store.commit('add_api', b)
        this.obj_data.api[key].number = store.state.api_num

      })
      _.forIn(this.obj_data.group, (b, key) => {
        biaoshi.push(b.e_name)
        store.commit('add_group', b)
        this.obj_data.group[key].number = store.state.api_num

      })

      this.obj_data.biaoshi = _.uniq(biaoshi)
      console.log('这是列表的内容:', this.obj_data)
      callback(this.obj_data)
    })
  }

  add_group (data, callback) {
    this.obj_data.group[data.e_name] = data
    this.create(callback)

  }

  add_api (data, callback) {
    this.obj_data.api[data.e_name] = data
    this.create(callback)

  }

}

export default lists
