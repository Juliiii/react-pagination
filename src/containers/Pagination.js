import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import PaginationItems from '../components/PaginationItems';

export default class Pagination extends Component {
    static defaultProps = {
        pageSize: 10,
        current: -1,
        total: 60,
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
            hoverIndex: -1,
            pagesLength: 0
        }
    }

    componentWillMount () {
        this._getPages();
    }

    _getPages () {
        const { total, pageSize } = this.props;
        const length = Math.ceil(total / pageSize);
        this.setState({
            pagesLength: length
        });
        if (length < 6) {
            this.setState({
                pages: new Array(length).fill(0).map((item, i) => i + 1)
            })
        } else {
            this.setState({
                pages: [...(new Array(4).fill(0).map((item, i) => i + 1)), '...', length]
            })
        }

        this.props.current >= 5 && this._getPages();
    }

    _pageChange () {

    }


    onClick (e) {
        const Text = e.target.innerText;
        switch (Text) {
            case '上一页':
                this.props.pageChange(this.props.current - 1); break;
            case '下一页':
                this.props.pageChange(this.props.current + 1); break;
            default:
                this.props.pageChange(parseInt(Text, 10)); break;
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

        const pre = <li className={preClasses} 
                    onMouseOver={this.onMouseOver.bind(this)}
                    onMouseLeave={this.onMouseLeave.bind(this)}
                    onClick={this.onClick.bind(this)}>上一页</li>;
        const next = <li className={nextClasses} 
                    onMouseOver={this.onMouseOver.bind(this)}
                    onMouseLeave={this.onMouseLeave.bind(this)}
                    onClick={this.onClick.bind(this)}>下一页</li>;

        return (
            <ul className="list">
                { this.props.current === 1 ? null : pre}
                { this.state.pages.map((page, index) => 
                    <PaginationItems page={page} 
                                    key={index}
                                    hoverIndex={this.state.hoverIndex}
                                    currentIndex={this.props.current}
                                    onClick={this.onClick.bind(this)} 
                                    onMouseOver={this.onMouseOver.bind(this)}
                                    onMouseLeave={this.onMouseLeave.bind(this)}/>) }
                { this.props.current === this.state.pagesLength ? null : next }
            </ul>
        );
    }
}