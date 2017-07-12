import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PaginationItems extends Component {
    static defaultProps = {
        hoverIndex: 1
    }



    static propTypes = {
        page: PropTypes.oneOfType(
            [PropTypes.number.isRequired, PropTypes.string.isRequired]
        ),
        hoverIndex: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired
        // onMouseOver: PropTypes.func.isRequired
    }

    onClick (e) {
        if (this.props.page !== '...' && this.props.onClick) {
            this.props.onClick(e);
        }
    }

    onMouseOver (e) {
        console.log(e.target.innerText);
    }

    onMouseLeave (e) {

    }

    render () {
        const page = this.props.page;
        return (
            <li className= {page !== '...' ? 'list-items' : 'ellipsis'} 
                onClick={this.onClick.bind(this)} 
                onMouseOver={this.onMouseOver.bind(this)}
                onMouseLeave={() => console.log(1)}>{page}</li>
        );
    }
};
