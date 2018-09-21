var getPageInfo = function (spm) {
  return {
    a: 1
  }
}
var data = getPageInfo()
console.log(data.a, '111')
data.a = 2
console.log(data.a, '222')
console.log(getPageInfo().a, '333')
getPageInfo().a = 2
console.log(getPageInfo().a, '444')
