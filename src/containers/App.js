import React, { Component } from 'react';
import Pagination from "../components/Pagination";

/*const App =  () => {
    return (
        <div>
            <Pagination />
        </div>
    )
};*/

class App extends Component {
    constructor () {
        super();
        this.state = {
            current: 2,
            total: 1515
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
            <div>
                <Pagination {...props} />
            </div>
        );
    }
}



export default App;