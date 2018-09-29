var queryString = require('./query-string.js')

// 统计url
var getUrlByCode = function (code) {
  var bussinessHash = [{ // 全网统计（登录注册）
    url: 'https://gw.fdc.com.cn/site_data.js',
    codes: ['a0001', 'a0002', 'a0012','a0017']
  },
  { // 报名
    url: 'https://gw.fdc.com.cn/sign_up_data.js',
    codes: ['a0003', 'ac004', 'a0005', 'a0006', 'a0008', 'a0009', 'a0013', 'a0016']
  },
  { // 出售出租
    url: 'https://gw.fdc.com.cn/rent_old_data.js',
    codes: ['a0014', 'a0015']
  },
  { // 问答
    url: 'https://gw.fdc.com.cn/qa_data.js',
    codes: ['a0010', 'a0011']
  },
  { // 活动
    url: 'https://gw.fdc.com.cn/activity_data.js',
    codes: ['a0099']
  }
  ]
  if (!code) { // 不埋code,默认记录访问
    return bussinessHash[0].url
  }
  for (var i = 0; i < bussinessHash.length; i++) {
    var ele = bussinessHash[i]
    if (ele.codes.indexOf(code) > -1) {
      return ele.url
    }
  }
}

// 设置全局id
var createGid = function () {
  var s = []
  var hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 62), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[8] = s[13] = s[18] = s[23] = '-'
  var uuid = s.join('')
  wx.setStorageSync('fdcGid', uuid)
  return uuid
}

// 发送请求
var request = function (url, data) {
  wx.request({
    url: url,
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data)
    }
  })
}

// 页面信息
var getPageInfo = function (spm, labelString) {
  var pages = getCurrentPages()
  var currentPage = pages[pages.length - 1]
  var referer = pages.length > 1 ? pages[pages.length - 2] : ''
  var labelObj = queryString.parse(labelString)
  // 获取页面公用信息
  return {
    spm: spm,
    globalUserId: wx.getStorageSync('fdcGid') || createGid(), // openId,永不过期
    userid: wx.getStorageSync('userId'),
    userType: wx.getStorageSync('userId') ? 1 : 0,
    url: currentPage.route + '?' + queryString.stringify(currentPage.options),
    referer: referer ? referer.route + '?' + queryString.stringify(referer.options) : '',
    accessMode: 'wx',
    labelId: queryString.getKeys(labelObj),
    labelName: queryString.getValues(labelObj)
  }
}

var data = {}

/**
 * 浏览
 * @param {*} spm | 业务码
 * @param {*} labelString | 标签字符串id=value...
 */
exports.browse = function (spm, labelString) {
  data = getPageInfo(spm, labelString)
  console.log(data, 'browse')
  request(getUrlByCode(), data)
}
/**
 * 交互
 * @param {*} code | 交互码
 * @param {*} useid | 选填，登录成功设置用户id
 */
exports.interaction = function (code, userid) {
  userid && (data.userid = userid)
  var params = JSON.parse(JSON.stringify(data))
  params.spm = params.spm + ':' + code
  console.log(params, 'interaction')
  request(getUrlByCode(code), params)
}
