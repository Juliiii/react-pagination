import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class PaginationItems extends Component {
    static defaultProps = {
        hoverIndex: -1
    }



    static propTypes = {
        page: PropTypes.oneOfType(
            [PropTypes.number.isRequired, PropTypes.string.isRequired]
        ),
        hoverIndex: PropTypes.number.isRequired,
        currentIndex: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired,
        onMouseOver: PropTypes.func.isRequired,
        onMouseLeave: PropTypes.func.isRequired
    }

    onClick (e) {
        if (this.props.page !== '...' && this.props.onClick) {
            this.props.onClick(e);
        }
    }

    onMouseOver (e) {
        if (this.props.onMouseOver) {
            this.props.onMouseOver(e);
        }
    }

    onMouseLeave (e) {
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
                onClick={this.onClick.bind(this)} 
                onMouseOver={this.onMouseOver.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}>{page}</li>
        );
    }
};
