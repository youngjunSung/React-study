// const React = require('react');
// const { useState, useRef } = React;
import React, { useState, useRef } from 'react';
import Try from './Try';
// webpack.config.js 에서는 노드가 실행하는거라서 import 사용하면 에러난다

const getNumber = () => {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const arr = [];
    for (let i = 0; i <4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1).toString();
        arr.push(chosen);
    }
    return arr;
}

const NumberBaseball = (e) => {
    const [strike, setStrike] = useState('0');
    const [ball, setBall] = useState('0');
    const [answer, getAnswer] = useState(getNumber());
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const [tries, setTries] = useState([]);
    const inputRef = useRef();

    const onChange = (e) => {
        setValue(e.target.value);
    }
    const onClick = (e) => {
        e.preventDefault();
        console.log(answer);
        if (answer.join('') === value) {
            setResult('홈런~!!');
            setTries((prevState) => {
                return (
                    [...prevState.tries, {try: value, result: '홈런'}]
                )
            })
        } else if (tries.length >= 9) {
            setResult('도전 실패~');
            alert('정답은 ' + answer + ' 였습니다. 확인을 누르면 게임이 다시 시작됩니다.')
        } else {
            let strike = 0;
            let ball = 0;
            for (let i = 0; i < 4; i++) {
                if (value[i] === answer.join('')[i]) {
                    strike++;
                    setStrike(strike);
                } else if (answer.includes(value[i])) {
                    ball++;
                    setBall(ball);
                }
            }
            setValue('');
            setTries([...tries, {try: value, result: strike + '스트라이크 ' + ball + '볼'}])
            inputRef.current.focus();
        }
    }

    return (
        <>
                <p>{strike}스트라이크 {ball}볼입니다.</p>
                <form>
                    <input ref={inputRef} type="number" maxLength="4" value={value} onChange={onChange} />
                    <button type="submit" onClick={onClick}>입력</button>
                </form>
                <strong>{result}</strong>
                <p>시도: {tries.length}번</p>
                <ul>
                    {
                    tries.map((e, i)=>{
                        return (
                            <Try key={i} tryInfo={e} index={i} />
                        )
                    })}
                </ul>
            </>
    )
}
// value={value} onChange={onChange} 는 쌍으로 쓰여야 하고
// 위 대신 이거 하나로 대체 가능 defaultValue={value}

// module.exports = NumberBaseball;
export default NumberBaseball;
// ㄴ default 로 export 한 것들은 중괄호 없이 import NumberBaseball
// export const hi = 'hi';
// export { hello } = 'hello';
// ㄴ default 로 안 한 것들은 import { hello } or import { hello, hi }