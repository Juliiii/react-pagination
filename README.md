## Introduction
---
经常混迹B站，大二上期末的时候做web2.0课程设计大作业时，需要用到分页组件。当时模仿B站的分页写了一个Angular的版本，最近在学习React, 故将其写成一个react组件。
## Usage
---
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
---
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

## Example
---
```
import React, { Component } from 'react';
import Pagination from 'react-bilibilistyle-pagination';
import 'react-bilibilistyle-pagination/dist/main.css';

class App extends Component {
    constructor () {
        super();
        this.state = {
            current: 2,
            total: 100
        }
    }

    pageChange (current, newPageSize) {
        this.setState({
            current
        });
    }

    pageSizeChange (current, newPageSize) {
        this.setState({
            current,
            pageSize: newPageSize
        });
    }

    render () {
        const props = {
            ...this.state,
            pageChange: this.pageChange.bind(this),
            pageSizeChange: this.pageSizeChange.bind(this)
        }


        return (
            <div className="xxx">
                <Pagination {...props}/>
            </div>
        );
    }
}



export default App;
```

## 效果截图
---
######  最简单
![最简单](https://raw.githubusercontent.com/wiki/Juliiii/react-pagination/4.png)
######  只可以goto到某页
![次](https://raw.githubusercontent.com/wiki/Juliiii/react-pagination/3.png)
###### 只可以修改每页条数
![次](https://raw.githubusercontent.com/wiki/Juliiii/react-pagination/2.png)
###### 完整
![最完整](https://raw.githubusercontent.com/wiki/Juliiii/react-pagination/1.png)

## 注意事项
---
由于current和pageSize改变时，触发回调函数，会获取新的current或pageSize, 这个时候调用的组件要修改这两个变量，然后通过props传入这个组件中，才能正常显示。
