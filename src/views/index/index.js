import '../../assets/css/index.css'
// import './assets/css/index.less'
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
