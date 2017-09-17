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
            defaultCurrent: 3,
            total: 1515
        }
    }

    pageChange (current, newPageSize) {
        console.log(current, newPageSize);
    }

    pageSizeChange (current, newPageSize) {
        console.log(current, newPageSize);
        this.setState({
            current
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