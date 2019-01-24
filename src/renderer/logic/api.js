import fs from 'fs'
import path from 'path'
import jsonFormat from 'json-format'
import store from '@/store'

class api {
  constructor (data) {
    this.dir = data.dir
    this.obj_data = {}
    this.path = path.join(store.getters.now_open.toString(), this.dir, data.e_name)
  }

  read (type, callback) {
    let pathjson = path.join(this.path, type + '.json')
    fs.access(pathjson, fs.constants.F_OK, (err) => {
      if (err) {
        this.create(pathjson, jsonFormat({}), callback)
      } else {
        this.read2(pathjson, callback)
      }

    })
  }

  readme (callback) {
    let pathjson = path.join(this.path, 'readme.md')
    console.log(pathjson)
    fs.access(pathjson, fs.constants.F_OK, (err) => {
      if (err) {
        this.create(pathjson, '# readme', callback)
      } else {
        this.read2(pathjson, callback)
      }

    })
  }

  create (pathjson, data, callback) {
    console.log(arguments)
    fs.writeFile(pathjson, data, {
      encoding: 'utf8',
      flag: 'w+'
    }, (err) => {

      if (err) {
        //不存在的文件夹
        // 创建文件夹
        fs.mkdir(path.dirname(pathjson), {recursive: true},
          this.create(pathjson, data, callback))
      } else {
        this.read2(pathjson, callback)
      }
    })
  }

  read2 (pathjson, callback) {

    fs.readFile(pathjson, {
      encoding: 'utf8'
    }, (err, data1) => {
      if (err) {
        throw err
      }

      callback(data1)
    })
  }

}

export default api