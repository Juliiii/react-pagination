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
            total: 121
        }
    }

    pageChange (newIndex) {
        this.setState({
            current: newIndex
        });
    }


    render () {
        const props = {
            ...this.state,
            pageChange: this.pageChange.bind(this)
        }


        return (
            <div>
                <Pagination {...props} />
            </div>
        );
    }
}



export default App;