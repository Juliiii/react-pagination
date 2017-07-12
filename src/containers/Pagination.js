import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import PaginationItems from '../components/PaginationItems';

export default class Pagination extends Component {
    constructor () {
        super();
        this.state = {
            pages: [1,2,3,4,'...', 5],
            hoverIndex: -1,
            currentIndex: -1
        }
    }

    onClick (e) {
        console.log(e);
        this.setState({
            currentIndex: parseInt(e.target.innerText, 10)
        })
    }

    onMouseOver (e) {
        this.setState({
            hoverIndex: parseInt(e.target.innerText, 10)
        });
    }

    onMouseLeave (e) {
        this.setState({
            hoverIndex: -1
        });
    }

    render () {
        return (
            <ul className="list">
                <li className="list-items">上一页</li>
                {this.state.pages.map((page, index) => 
                    <PaginationItems page={page} 
                                    key={index}
                                    hoverIndex={this.state.hoverIndex}
                                    currentIndex={this.state.currentIndex}
                                    onClick={this.onClick.bind(this)} 
                                    onMouseOver={this.onMouseOver.bind(this)}
                                    onMouseLeave={this.onMouseLeave.bind(this)}/>)}
                <li className="list-items">下一页</li>
            </ul>
        );
    }
}