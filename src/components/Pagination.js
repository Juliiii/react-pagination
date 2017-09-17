import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import PaginationItems from './PaginationItems';
import SkipInput from './SkipInput';
import PageSizeSelect from './PageSizeSelect';


export default class Pagination extends Component {
    static defaultProps = {
        defaultCurrent:   1,
        defaultpageSize: 10,
        pageSize:        -1,
        total:           100,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizes:       [10, 20, 30, 40],
    }

    static propTypes   = {
        pageChange:      PropTypes.func,
        pageSizeChange:  PropTypes.func,
        defaultCurrent:  PropTypes.number.isRequired,
        total:           PropTypes.number.isRequired,
        pageSize:        PropTypes.number,
        pageSizes:       PropTypes.arrayOf(PropTypes.number),
        showQuickJumper: PropTypes.bool,
        showSizeChanger: PropTypes.bool,
    }

    constructor (props) {
        super(props);
        const pageSize = props.pageSize !== -1 ? props.pageSize : props.defaultpageSize;
        this.state = {
            hoverIndex: -1,
            pagesLength: Math.ceil(props.total / pageSize),
            current: props.defaultCurrent,
            total: props.total,
            pageSize
        };
    }

    componentWillMount () {
        const { current, pagesLength } = this.state;
        this.changeUI(current, pagesLength);
    }

    componentWillReceiveProps (nextProps) {
        const { current } = this.state;
        const { total, pageSize, defaultCurrent, defaultpageSize } = this.props;
        // if total has change
        // else if pageSize has change
        // else if no pageSize but defaultpageSize has change
        // else defaultCurrent has change
        let shouldUpdate = false;
        let newTotal = total;
        let newPageSize = pageSize;
        let newCurrent = current;
        if (nextProps.total !== total) {
            newTotal = nextProps.total;
            shouldUpdate = true;
        }

        if (defaultCurrent !== nextProps.defaultCurrent) {
            newCurrent = nextProps.defaultCurrent;
            shouldUpdate = true;
        }

        if (nextProps.pageSize !== -1) {
            if (nextProps.pageSize !== pageSize) {
                newPageSize = nextProps.pageSize;
                shouldUpdate = true;
            }
        } else {
            if (pageSize === -1 && nextProps.defaultpageSize !== defaultpageSize) {
                newPageSize = nextProps.defaultpageSize;
                shouldUpdate = true;
            }
        }

        if (shouldUpdate) {
            const newPagesLength = Math.ceil(newTotal / newPageSize);
            this.setState({
                current: newCurrent,
                total: newTotal,
                pageSize: newPageSize,
                pagesLength: newPagesLength
            });

            this.changeUI(newCurrent, newPagesLength);
        }
    }

    changeUI = (current, length) => {
        // changeUI depend on the currentIndex and length
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


    onPageChange = (current, length) => {
        // when currentPage change, we should call the props.func, give the caller
        // two arg, one is currentPage, second is pageSize
        const { pageChange } = this.props;
        this.setState({
            current
        });
        this.changeUI(current, length);
        if (pageChange) pageChange(current, this.state.pageSize);
    }

    onPageSizesChange = ({target: {value}}) => {
         let { total, current } = this.state;
         const { pageSizeChange } = this.props;
         value = Number(value);
         const length = Math.ceil(total / value);
         this.setState({
             pagesLength: length,
             pageSize: value
         });
         if (current > length) current = length;
         this.changeUI(current, length);
         if (pageSizeChange) pageSizeChange(current, value);
    }

    onClick = (e) => {
        const Text = e.target.innerText;
        const { current, pagesLength } = this.state;
        switch (Text) {
            case '上一页':
                this.onPageChange(current - 1, pagesLength);
                break;
            case '下一页':
                this.onPageChange(current + 1, pagesLength); 
                break;
            default:
                this.onPageChange(Number(Text), pagesLength);
                break;
        }

    }

    onMouseOver = (e) => {
        let hoverIndex = e.target.innerText;
        if (hoverIndex !== '上一页' &&  hoverIndex !== '下一页') {
            hoverIndex = Number(e.target.innerText);
        }
        this.setState({
            hoverIndex
        });
    }

    onKeyDown = (keyCode, value, input) => {
        if (isNaN(value)) return;
        let _value = Number(value);
        let { pagesLength } = this.state;
        const newIndex = _value > pagesLength ? pagesLength
                                                : _value < 1 ? 1 : _value;
        this.onPageChange(newIndex, pagesLength);
    }

    onMouseLeave = (e) => {
        this.setState({
            hoverIndex: -1
        });
    }

    render () {
        const { hoverIndex, current, pages, total, pagesLength } = this.state;
        const { pageSizes, showQuickJumper, showSizeChanger } = this.props;
        const preClasses = cx({
            'list-items': true,
            'list-items-1': hoverIndex === '上一页'
        });
        const nextClasses = cx({
            'list-items': true,
            'list-items-1': hoverIndex === '下一页'
        });

        const pre = <li className={preClasses} 
                    onMouseOver={this.onMouseOver}
                    onMouseLeave={this.onMouseLeave}
                    onClick={this.onClick}>上一页</li>;
        const next = <li className={nextClasses} 
                    onMouseOver={this.onMouseOver}
                    onMouseLeave={this.onMouseLeave}
                    onClick={this.onClick}>下一页</li>;

        return (
            <div className="wrapper">
                {showSizeChanger ? <PageSizeSelect 
                                            pageSizes={pageSizes} 
                                            pageSizesChange={this.onPageSizesChange}/>
                                            : null}
                <ul className="list">
                    { current === 1 ? null : pre}
                    { pages.map((page, index) => 
                        <PaginationItems page={page} 
                                        key={index}
                                        hoverIndex={hoverIndex}
                                        currentIndex={current}
                                        onClick={this.onClick} 
                                        onMouseOver={this.onMouseOver}
                                        onMouseLeave={this.onMouseLeave}/>) }
                    { current === pagesLength ? null : next }
                </ul>
                {showQuickJumper ? <SkipInput pagesLength={pagesLength}
                                                         total={total}
                                                         onKeyDown={this.onKeyDown}/> 
                                            : null}
            </div>
        );
    }
}
