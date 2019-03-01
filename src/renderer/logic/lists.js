import fs from 'fs'
import path from 'path'
import jsonFormat from 'json-format'
import store from '@/store'
import _ from 'lodash'
import files from '@/libs/files'

class lists {
  constructor (dir) {
    this.dir = dir
    this.obj_data = {
      group: {},
      api: {},
      biaoshi: [],
      dir: this.dir
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
      console.log('create', err)
      if (err) {
        //不存在的文件夹
        // 创建文件夹
        fs.mkdir(path.join(store.getters.now_open.toString(), this.dir), {recursive: true}, this.read2(callback))
      } else {
        callback()
      }
    })
  }

  savefile (data, callback) {
    this.obj_data = data
    this.create(callback)
  }

  read2 (callback) {
    console.log('read2', this.path)
    fs.readFile(this.path, {
      encoding: 'utf8'
    }, (err, data1) => {
      if (err) {
        throw err
      }
      this.obj_data = JSON.parse(data1)
      let biaoshi = []
      console.log('path', this.obj_data.api)

      _.forIn(this.obj_data.api, (b) => {
        biaoshi.push(b.e_name)


      })

      _.forIn(this.obj_data.group, (b) => {
        biaoshi.push(b.e_name)

      })

      this.obj_data.biaoshi = _.uniq(biaoshi)
      console.log('这是列表的内容:', this.obj_data)
      callback(this.obj_data)
    })
  }

  add_group (data, callback) {
    console.log('data', data)
    this.obj_data.group[data.e_name] = _.clone(data)
    this.create(callback)

  }

  add_api (data, callback) {
    this.obj_data.api[data.e_name] = _.clone(data)
    this.create(callback)

  }

  /**
   * 删除分组
   * @param e_name
   * @param callback
   */
  remove_group (e_name, callback) {
    //删除分组
    //修改列表文件
    this.remove1(e_name, 'group', callback)
  }

  /**
   * 删除API
   * @param e_name
   * @param callback
   */
  remove_api (e_name, callback) {
    //修改列表文件
    this.remove1(e_name, 'api', callback)
  }

  /**
   * 删除操作
   * @param e_name
   * @param type
   * @param callback
   */
  remove1 (e_name, type, callback) {
    //修改列表文件
    _.unset(this.obj_data, [type, e_name])
    let index = path.join(store.getters.now_open.toString(), this.dir, e_name)
    console.log('remove', this.obj_data, index)

    //修改
    this.create(() => {
      files.rmdirSync(index)
      callback()

    })
  }

}

export default lists
