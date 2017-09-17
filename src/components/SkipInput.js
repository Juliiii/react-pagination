import React, { Component } from 'react';

class SkipInput extends Component {

    onKeyDown = ({keyCode, target: {value}}) => {
        const _keyCode = keyCode;
        const _value = value;
        this.props.onKeyDown(_keyCode, _value, this.input);
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