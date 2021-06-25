import React, { Component } from 'react';

class Try extends Component {
    render() {
        return (
            <li>
                {this.props.value.alphabet} - {this.props.value.number} = {this.props.index.i}번째!!
                <p>임시 텍스트 문장111</p>
                <p>임시 텍스트 문장</p>
                <p>임시 텍스트 문장</p>
                <button>임시 버튼</button>
            </li>
        )
    }
}

export default Try;