import $ from 'jquery'
import '../../assets/css/index.css'
// import './assets/css/index.less'
import '../common.js'
console.log(ENV)

function dec(target) {
  target.isTest = true
}

@dec
class Person {
  constructor(name) {
    this.name = name
  }
}

const person = new Person('Jack')
console.log(Person.isTest)

$('#content').text('hellow world')

setTimeout(() => {
  import('../dynamic-data.js').then(res => {
    console.log(res.default.message)
  })
}, 2000)

import moment from 'moment'
import 'moment/locale/zh-cn' // 手动引入中文语言包
moment.locale('zh-cn')
const r = moment().endOf('day').fromNow()
console.log(r)
