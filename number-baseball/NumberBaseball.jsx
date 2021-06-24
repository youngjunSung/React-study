const React = require('react');
const { useState, useRef } = React;
// import React, { Component } from 'react';
// webpack.config.js 에서는 노드가 실행하는거라서 import 사용하면 에러난다

// const getNumber = () => {
//     let randomNumber = Math.floor(Math.random() * 10)
//     return randomNumber
// }

const NumberBaseball = (e) => {
    const [strike, setStrike] = useState('0');
    const [ball, setBall] = useState('0');
    const [answer, setAnswer] = getNumber();
    const [value, setValue] = useState('');
    const [tries, setTries] = useState([]);

    const onChange = (e) => {
        setValue(e.target.value);
    }
    const onClick = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <p>{strike}스트라이크 {ball}볼입니다.</p>
            <form>
                <input type="number" maxLength="4" value={value} onChange={onChange} />
                <button type="submit" onClick={onClick}>입력</button>
            </form>
            <p>시도: {tries.length}번</p>
            <ul>
                {['like', 'like', 'like'].map(()=>{
                    return (
                        <li>like</li>
                    )
                })}
                <li>like</li>
            </ul>
        </>
    )
}
// value={value} onChange={onChange} 는 쌍으로 쓰여야 하고
// 위 대신 이거 하나로 대체 가능 defaultValue={value}

module.exports = NumberBaseball;
// export default NumberBaseball;
// ㄴ default 로 export 한 것들은 중괄호 없이 import NumberBaseball
// export const hi = 'hi';
// export { hello } = 'hello';
// ㄴ default 로 안 한 것들은 import { hello } or import { hello, hi }