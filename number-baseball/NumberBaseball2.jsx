// const React = require('react');
// const { useState, useRef, Component } = React;
import React, { Component } from 'react';
// const Try = require('./Try');
import Try from './Try';
// webpack.config.js 에서는 노드가 실행하는거라서 import 사용하면 에러난다

const getNumber = () => {
    let randomNumber = Math.floor(Math.random() * 10).toString();
    let randomNumber2 = Math.floor(Math.random() * 10).toString();
    let randomNumber3 = Math.floor(Math.random() * 10).toString();
    let randomNumber4 = Math.floor(Math.random() * 10).toString();
    return [randomNumber, randomNumber2, randomNumber3, randomNumber4]
}

class NumberBaseball2 extends Component {
    state = {
        strike: '0',
        ball: '0',
        answer: getNumber(),
        value: '',
        result: '',
        tries: [],
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    // 일반 함수에서 this.state 받아오려면 constructor 생성 후 this를 bind 해야함
    // this.onChange = this.onChange.bind(this);
    onClick = (e) => {
        e.preventDefault();
        console.log('answer ' + this.state.answer);
        console.log('answer ' + this.state.answer.join(''));
        console.log('value ' + this.state.value);
        console.log('tries ' + this.state.tries);
        if (this.state.answer.join('') === this.state.value) {
            this.setState({
                result: '홈런~!!!',
                tries: [...this.state.tries, {try: this.state.value, result: '홈런'}],
                // tries: this.state.tries.push(this.state.value),
            })
            console.log(this.state.tries);
        }
    }

    texts = [
        {alphabet: 'a', number: '1'},
        {alphabet: 'b', number: '2'},
        {alphabet: 'c', number: '3'},
        {alphabet: 'd', number: '4'},
        {alphabet: 'e', number: '5'},
    ]

    render() {
        return (
            <>
                <p>{this.state.strike}스트라이크 {this.state.ball}볼입니다.</p>
                <form>
                    <input type="number" maxLength="4" value={this.state.value} onChange={this.onChange} />
                    <button type="submit" onClick={this.onClick}>입력</button>
                </form>
                <strong>{this.state.result}</strong>
                <p>시도: {this.state.tries.length}번</p>
                <ul>
                    {
                    // [
                        // a, b, c, d, e -> e
                        // ['a', '1'], ['b', '2'], ['c', '3'], ['d', '4'], ['e', '5'] -> e[0] - e[1]
                        // {alphabet: 'a', number: '1'},
                        // {alphabet: 'b', number: '2'},
                        // {alphabet: 'c', number: '3'},
                        // {alphabet: 'd', number: '4'},
                        // {alphabet: 'e', number: '5'},
                        // key 값에는 고유한 값을 넣어야 한다. 인덱스 값은 넣으면 안 되나 추가만 되고 삭제되지 않는 요소일 경우 사용 가능
                    // ].map((e) => <li key={e.alphabet}>{e.alphabet} - {e.number}</li>)} 화살표 함수는 리턴 값을 가질 때 return과 중괄호를 생략할 수 있다.
                    // ].map((e, i)=>{
                    //     return (
                    //         <li key={e.alphabet}>{e.alphabet} - {e.number} = {i}번째</li>
                    //     )
                    // })}
                    this.texts.map((e, i)=>{
                        return (
                            <Try key={e.alphabet} value={e} index={i} />
                        )
                    })}
                </ul>
            </>
        )
    }
}
// value={value} onChange={onChange} 는 쌍으로 쓰여야 하고
// 위 대신 이거 하나로 대체 가능 defaultValue={value}

// module.exports = NumberBaseball2;
export default NumberBaseball2;
// ㄴ default 로 export 한 것들은 중괄호 없이 import NumberBaseball
// export const hi = 'hi';
// export { hello } = 'hello';
// ㄴ default 로 안 한 것들은 import { hello } or import { hello, hi }