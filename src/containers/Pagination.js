import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import PaginationItems from '../components/PaginationItems';

export default class Pagination extends Component {
    constructor () {
        super();
        this.state = {
            pages: [1,2,3,4,5]
        }
    }

    onClick (e) {
        console.log(e.target.innerText);
    }

    render () {
        return (
            <ul className="list">
                <li className="list-items">上一页</li>
                {this.state.pages.map((page, index) => <PaginationItems page={page} key={index} onClick={this.onClick.bind(this)} />)}
                <li className="list-items">下一页</li>
            </ul>
        );
    }
}