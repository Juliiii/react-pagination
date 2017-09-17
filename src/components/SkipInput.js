import React, { Component } from 'react';

class SkipInput extends Component {

    onKeyDown = ({keyCode, target: {value}}) => {
        const _keyCode = keyCode;
        const _value = value;
        if (_keyCode === 13) {
            this.props.onKeyDown(_value);
        }
    }


    render () {
        return (
            <div className="input-wrapper">
                共{this.props.pagesLength}页/{this.props.total}个,
                跳至<input type="text" className="input" onKeyDown={this.onKeyDown} ref={(input) => this.input = input}/>页
            </div>
        );
    }
}

export default SkipInput;