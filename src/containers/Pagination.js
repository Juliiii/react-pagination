import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import PaginationItems from '../components/PaginationItems';

export default class Pagination extends Component {
    static defaultProps = {
        pageSize: 10,
        current: -1,
        total: 101,
        pageChange: (index) => console.log(index)
    }



    static propTypes = {
        pageChange: PropTypes.func.isRequired,
        pageSizeChange: PropTypes.func,
        current: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        pageSize: PropTypes.number
    }




    constructor () {
        super();
        this.state = {
            hoverIndex: -1
        }
    }

    componentWillMount () {
        this._getPages();
    }

    _getPages () {
        const { total, pageSize } = this.props;
        const length = Math.floor(total / pageSize) + 1;
        let arr = [];
        if (length < 6) {
            this.setState({
                pages: new Array(length).fill(0).map((item, i) => i + 1)
            })
        } else {
            this.setState({
                pages: [...(new Array(4).fill(0).map((item, i) => i + 1)), '...', length]
            })
        }
    }

    _pageChange (current) {

    }


    onClick (e) {
        // this.props.pageChange && this.props.pageChange(e);
        const Text = e.target.innerText;
        switch (Text) {
            case '上一页':
                this.props.pageChange(this.props)
        }

    }

    onMouseOver (e) {
        let hoverIndex = e.target.innerText;
        if (hoverIndex !== '上一页' &&  hoverIndex !== '下一页') {
            hoverIndex = parseInt(e.target.innerText, 10);
        }
        this.setState({
            hoverIndex: hoverIndex
        });
    }

    onMouseLeave (e) {
        this.setState({
            hoverIndex: -1
        });
    }

    render () {
        const preClasses = cx({
            'list-items': true,
            'list-items-1': this.state.hoverIndex === '上一页'
        });
        const nextClasses = cx({
            'list-items': true,
            'list-items-1': this.state.hoverIndex === '下一页'
        });
        return (
            <ul className="list">
                <li className={preClasses} 
                    onMouseOver={this.onMouseOver.bind(this)}
                    onMouseLeave={this.onMouseLeave.bind(this)}>上一页</li>
                {this.state.pages.map((page, index) => 
                    <PaginationItems page={page} 
                                    key={index}
                                    hoverIndex={this.state.hoverIndex}
                                    currentIndex={this.props.current}
                                    onClick={this.onClick.bind(this)} 
                                    onMouseOver={this.onMouseOver.bind(this)}
                                    onMouseLeave={this.onMouseLeave.bind(this)}/>)}
                <li className={nextClasses} 
                    onMouseOver={this.onMouseOver.bind(this)}
                    onMouseLeave={this.onMouseLeave.bind(this)}>下一页</li>
            </ul>
        );
    }
}