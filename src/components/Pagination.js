import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import PaginationItems from './PaginationItems';
import SkipInput from './SkipInput';
import PageSizeSelect from './PageSizeSelect';


export default class Pagination extends Component {
    static defaultProps = {
        pageSize:        10,
        total:           0,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizes:       [10, 20, 30, 40]
    }

    static propTypes   = {
        pageChange:      PropTypes.func.isRequired,
        pageSizeChange:  PropTypes.func,
        current:         PropTypes.number.isRequired,
        total:           PropTypes.number.isRequired,
        pageSize:        PropTypes.number,
        pageSizes:       PropTypes.arrayOf(PropTypes.number),
        showQuickJumper: PropTypes.bool,
        showSizeChanger: PropTypes.bool
    }

    constructor () {
        super();
        this.state = {
            hoverIndex: -1,
            pagesLength: 0
        }
    }

    componentWillMount () {
        this._getPages(this.props);
    }

    componentWillReceiveProps (nextProps) {
        this._getPages(nextProps);
    }

    _getPages (props) {
        const { total, pageSize, current } = props;
        const length = Math.ceil(total / pageSize);
        this.setState({
            pagesLength: length
        });
        if (current <= 7) {
            if (length <= 9) {
                this.setState({
                    pages: new Array(length).fill(0).map((item, i) => i + 1)
                })
            } else {
                this.setState({
                    pages: [...(new Array(7).fill(0).map((item, i) => i + 1)), '...', length]
                })
            }
        } else if (current > length - 7) {
            this.setState({
                pages: [1, '...', ...(new Array(7).fill(0).map((item, i) => length + i - 6))]
            });            
        } else {
            this.setState({
                pages: [1, '...', ...(new Array(5).fill(0).map((item, i) => current + i - 2)), '...', length]
            })            
        }
    }

    onPageSizesChange ({target: {value}}) {
         let { total, current } = this.props;
         value = parseInt(value, 10);
         const length = Math.ceil(total / value);
         this.setState({
             pagesLength: length
         });
         if (current > length) current = length;
         this.props.pageSizeChange(current, value);
    }

    onClick (e) {
        const Text = e.target.innerText;
        switch (Text) {
            case '上一页':
                this.props.pageChange(this.props.current - 1);
                break;
            case '下一页':
                this.props.pageChange(this.props.current + 1); 
                break;
            default:
                this.props.pageChange(parseInt(Text, 10));
                break;
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

    onKeyDown (keyCode, value, input) {
        if (keyCode === 13) {
            input.value = '';
            if (isNaN(value)) return;
            let _value = parseInt(value, 10);
            let { pagesLength } = this.state;
            const newIndex = _value > pagesLength ? pagesLength
                                                  : _value < 1 ? 1 : _value;
            this.props.pageChange(newIndex, this.props.pageSize);
        }
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
            <div className="wrapper">
                {this.props.showSizeChanger ? <PageSizeSelect 
                                            pageSizes={this.props.pageSizes} 
                                            pageSizesChange={this.onPageSizesChange.bind(this)}/>
                                            : null}
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
                {this.props.showQuickJumper ? <SkipInput pagesLength={this.state.pagesLength}
                                                         total={this.props.total}
                                                         onKeyDown={this.onKeyDown.bind(this)}/> 
                                            : null}
            </div>
        );
    }
}
