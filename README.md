##Introduction
----
经常混迹B站，大二上期末的时候做web2.0课程设计大作业时，需要用到分页组件。当时写了一个Angular的版本，最近在学习React, 故将其写成一个react组件。
##Usage
----
####Install
```
npm i -S react-bilibilistyle-pagination
```

####Load
```
import Pagination from 'react-bilibilistyle-pagination'
import 'react-bilibilistyle-pagination/dist/main.css';
```
##Props
----
参数 | 说明 | 类型 | 必要性 |默认值
------------ | ------------ | ------------ | ------------ | ----------|
current | 当前页数 | number | 必要 | 1 |
total | 数据总数 | number | 必要 | 100 |
pageSize | 每页条数 | number | 不必要 | 10 |
pageSizes | 指定每页可以显示多少条 | array(都是数字) | 不必要 | [10, 20, 30, 40] |
showQuickJumper | 是否可以快速跳到某页 | bool | 不必要 | true |
showSizeChanger | 是否可以指定每页显示多少条 | bool | 不必要 | true |
pageChange | 页码改变的回调，参数为新的页数 | func | 必要 | - |
pageSizeChange | 每页页数改变时的回调，接收当前页数和新的每条页数作为参数 | func | 不必要 | - |