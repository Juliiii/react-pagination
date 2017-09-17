import React, { Component } from 'react';
import cx from 'classnames';

export default class PaginationItems extends Component {
    static defaultProps = {
        hoverIndex: -1
    }

    onClick = (e) => {
        if (this.props.page !== '...' && this.props.onClick) {
            this.props.onClick(e);
        }
    }

    onMouseOver = (e) => {
        if (this.props.onMouseOver) {
            this.props.onMouseOver(e);
        }
    }

    onMouseLeave = (e) => {
        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(e);
        }
    }

    render () {
        const { page, hoverIndex, currentIndex } = this.props;
        const classes = cx({
            'list-items-1': hoverIndex === page || currentIndex === page,
            'list-items': page !== '...',
            'ellipsis': page === '...'
        });
        return (
            <li className= {classes} 
                onClick={this.onClick} 
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseLeave}>{page}</li>
        );
    }
};
