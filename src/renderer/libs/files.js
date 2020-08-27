const fs = require('fs')
import path from 'path'

export default {
  rmdirSync (path1) {
    let files = []
    console.debug(path1,fs.existsSync(path1))
    if (fs.existsSync(path1)) {
      files = fs.readdirSync(path1);
      files.forEach((file) => {
        let curPath = path.join(path1,file)
        if (fs.statSync(curPath).isDirectory()) {
          this.rmdirSync(curPath) //递归删除文件夹
        } else {
          fs.unlinkSync(curPath) //删除文件
        }
      })
      fs.rmdirSync(path1)
    }else{
      throw "文件不存在"+path1;
    }


  },
  rmdir (path1) {
    let files = []
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path)
      files.forEach((file) => {
        let curPath = path.join(path1,file)
        if (fs.statSync(curPath).isDirectory()) {
          this.delDir(curPath) //递归删除文件夹
        } else {
          fs.unlinkSync(curPath) //删除文件
        }
      })
      fs.rmdirSync(path1)
    }

  },
  /**
   * 复制文件夹
   * @param {*} path 
   * @param {*} topath 
   */
  copydirSync(path1,topath)
  {
    console.log(path1,topath)
    if(!fs.existsSync(topath)){
      fs.mkdirSync(topath,{recursive: true});
    }
   let  files = fs.readdirSync(path1)
    files.forEach((file) => {
      let curPath = path.join(path1,file);
      if (fs.statSync(curPath).isDirectory()) {
        this.copydirSync(curPath,path.join(topath,file)) //递归复制文件夹
      } else {
        fs.copyFileSync(curPath,path.join(topath,file)) //复制文件
      }
    })
    // fs.copyFileSync(src, dest);
  }

}
