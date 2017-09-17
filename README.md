## Introduction
[![Build Status](https://travis-ci.org/Juliiii/react-pagination.svg?branch=master)](https://travis-ci.org/Juliiii/react-pagination)

经常混迹B站，大二上期末的时候做web2.0课程设计大作业时，需要用到分页组件。当时模仿B站的分页写了一个Angular的版本，最近在学习React, 故将其写成一个react组件。

## Usage

####  Install
```
npm i -S react-bilibilistyle-pagination
```

#### Load
```
import Pagination from 'react-bilibilistyle-pagination'
import 'react-bilibilistyle-pagination/dist/main.css';
```
## Props


参数 | 说明 | 类型 | 必要性 |默认值
------------ | ------------ | ------------ | ------------ | ----------|
defaultCurrent | 默认页数 | number | 必要 | 1 |
defaultPageSize | 默认每页可以显示条数 | number | 不必要 | 10
total | 数据总数 | number | 必要 | 100 |
pageSize | 每页条数 | number | 不必要 | 10 |
pageSizes | 指定每页可以显示多少条 | array(都是数字) | 不必要 | [10, 20, 30, 40] |
showQuickJumper | 是否可以快速跳到某页 | bool | 不必要 | true |
showSizeChanger | 是否可以指定每页显示多少条 | bool | 不必要 | true |
pageChange | 页码改变的回调，参数为新的页数 | func | 不必要 | - |
pageSizeChange | 每页页数改变时的回调，接收当前页数和新的每条页数作为参数 | func | 不必要 | - |

## Example

```
import React, { Component } from 'react';
import Pagination from 'react-bilibilistyle-pagination';
import 'react-bilibilistyle-pagination/dist/main.css';

class App extends Component {
    constructor () {
        super();
        this.state = {
            defaultCurrent: 2
        }
    }

    pageChange  = (current, newPageSize) => {
	  ...
    }

    pageSizeChange = (current, newPageSize) => {
      ...
    }

    render () {
        const props = {
            ...this.state,
            pageChange: this.pageChange,
            pageSizeChange: this.pageSizeChange
        }


        return (
            <div>
                <Pagination {...props} />
            </div>
        );
    }
}



export default App;
```

## 效果截图

######  最简单
![最简单](https://raw.githubusercontent.com/wiki/Juliiii/react-pagination/4.png)
######  只可以goto到某页
![次](https://raw.githubusercontent.com/wiki/Juliiii/react-pagination/3.png)
###### 只可以修改每页条数
![次](https://raw.githubusercontent.com/wiki/Juliiii/react-pagination/2.png)
###### 完整
![最完整](https://raw.githubusercontent.com/wiki/Juliiii/react-pagination/1.png)

