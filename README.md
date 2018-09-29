<br/>

## Installation

Installation is done using the [`yarn add` command](http://192.168.1.141:4873/#/detail/wx-statistics):

```sh
yarn add wx-statistics
```

## API

### .browse(*spm*,*[labelString]*)

#### spm

Type: `string`<br>
Description: `根据业务线，参照业务码表格选择业务码`

```js
import statistics from 'wx-statistics'

onShow() {
  statistics.browse('fdc00:0000')
}
```
#### labelString

Type: `string`<br>
Description: `亿媒体详情标签信息`

```js
import statistics from 'wx-statistics'

onShow() {
  statistics.browse('fdc07:7000','17=武汉规划')
}
```

### .interaction(*code*,*[userId]*)

#### code

Type: `string`<br>
Description: `根据交互，参照业务码表格选择交互码,交互与浏览公用页面信息`

```js
import statistics from 'wx-statistics'

methods:{
  submitForm() {
    statistics.interaction('a0003')
  }
}     
```
#### userId

Type: `string`<br>
Description: `登录成功设置userId,需传递userId`

```js
import statistics from 'wx-statistics'

methods:{
  submitForm() {
    statistics.interaction('a0002','5a33614db578b663f756cb58')
  }
}     
```

## 业务码表格

| 业务线   | 业务码     | 交互                                   | 交互码 |
| -------- | ---------- | -------------------------------------- | ------ |
| 亿房首页 | fdc00:0000 | 注册                                   | a0001  |
| 用户中心 | fdcuc:uc00 | 登录                                   | a0002  |
| 论坛     | fdcbs:bs00 | 看房团                                 | a0003  |
| 新房     | fdc01:1000 | 预约订房                               | ac004  |
| 二手房   | fdc02:2000 | 楼盘订阅                               | a0005  |
| 租房     | fdc03:3000 | 胖哥陪购                               | a0006  |
| 装修     | fdc04:4000 | 透明工地                               | a0007  |
| 商铺     | fdc05:5000 | 报价审核                               | a0008  |
| 写字楼   | fdc06:6000 | 验房                                   | a0009  |
| 亿媒体   | fdc07:7000 | 小亿问答                               | a0010  |
| 居洋洋   | fdc08:8000 | 在线监理                               | a0011  |
| 装卫士   | fdc09:9000 | 楼盘测评                               | a0012  |
| 亿合团   | fdc10:1000 | 预约服务、免费量房、免费验房、免费设计 | a0013  |
|          |            | 出租                                   | a0014  |
|          |            | 出售                                   | a0015  |
|          |            | 论坛报名                               | a0016  |
|          |            | 团购下单                               | a0017  |

* 好房测评 + 帮你选房 == 楼盘测评
