import axios from 'axios'
import qs from 'qs'
class ajax {
  constructor (protocol, hostname, port) {
    let url2 = protocol + '://' + hostname + ':' + port
    console.log('constructor', url2)
    this.axios = axios.create({
      baseURL: url2
    })
  }

  send (type, url, senddata, callbak) {
    console.log('12', arguments)
    if (type == 'get') {
      return this.get_send(url, senddata, callbak)
    }
    if (type == 'post') {
      return this.post_send(url, senddata, callbak)
    }

  }

  get_send (url, senddata, callbak) {
    this.axios.request({
      url: url,
      params: senddata.get,
      headers: senddata.headers
    }).then(callbak).catch(callbak)
  }

  post_send (url, senddata, callbak) {
    console.log('postqingqiu', arguments)

    this.axios.post(url, qs.stringify(senddata.form), {
      params: senddata.get,
      headers: senddata.headers
    }).then(callbak).catch(callbak)
  }

}

export default ajax
