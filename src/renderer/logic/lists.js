import fs from 'fs'
import path from 'path'
import jsonFormat from 'json-format'
import store from '@/store'

class lists {
  constructor (dir) {
    this.dir = dir
    this.obj_data = {
      group: {},
      api: {}
    }
    console.log('9', dir)
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
    }, this.read2(callback))
  }

  read2 (callback) {
    fs.readFile(this.path, {
      encoding: 'utf8'
    }, (err, data) => {
      if (err) {
        throw err
      }
      this.obj_data = JSON.parse(data)
      console.log('这是列表的内容:', this.obj_data)
      callback(this.obj_data)
    })
  }

  add_group (data, callback) {
    this.obj_data.group[data.e_name] = data
    this.create(callback)

  }

}

export default lists
