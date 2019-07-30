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
