exports.parse = function (string) {
  var obj = {}
  if (typeof string !== 'string') {
    // console.log(string,'Not a string queryString.parse');
    return obj
  }
  var search = string.split('&')
  for (var i = 0; i < search.length; i++) {
    var temp = search[i].split('=')
    obj[temp[0]] = temp[1]
  }
  return obj
}
exports.stringify = function (params) {
  var search = []
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      search.push(key + '=' + params[key])
    }
  }
  return search.join('&')
}
exports.getKeys = function (object) {
  var keys = []
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      keys.push(key)
    }
  }
  return keys.join(',')
}
exports.getValues = function (object) {
  var values = []
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      values.push(object[key])
    }
  }
  return values.join(',')
}
