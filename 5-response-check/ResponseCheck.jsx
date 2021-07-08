import React, { useState, useRef } from 'react';
// const React = require('react');
// const { useState, useRef } = React;

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('waiting-클릭해서 시작하세요');
    const [result, setResult] = useState([]);
    const timeOut = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('ready-초록색이 되면 클릭하세요')
            timeOut.current = setTimeout(() => {
                setState('now');
                setMessage('now-지금 클릭!');
                startTime.current = new Date();
            }, Math.ceil(Math.random() * 1000) + 2000)
        } else if (state === 'ready') {
            setState('waiting');
            setMessage('waiting-넘 빠름, 초록되면 클릭하기!')
            clearTimeout(timeOut.current);
        } else if (state === 'now') {
            endTime.current = new Date();
            setState('waiting');
            setMessage('waiting-클릭해서 시작하세요')
            setResult((prevResult)=> {
               return [...prevResult, endTime.current - startTime.current]
            })
        }
    }

    const renderAverage = () => {
        return (
            result.length === 0 
            ? null
            : <>
                <p>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</p>
                <button onClick={reset}>리셋</button>
            </>
            // jsx 에서 태그 없음을 null, false, undefined 로 나타낸다
        )
    }
    const reset = () => {
        setResult([])
    }

    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {renderAverage()}
        </>
    )
}

export default ResponseCheck;
// module.exports = ResponseCheck;