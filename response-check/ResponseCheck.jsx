import React, { useState } from 'react';
// const React = require('react');
// const { useState, useRef } = React;

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('waiting-클릭해서 시작하세요');
    const [result, setResult] = useState([1,3]);

    const timeOut = setTimeout(() => {
        setState('now');
        setMessage('now-지금 클릭!');
        console.log('123');
    }, Math.ceil(Math.random() * 1000) + 2000)

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('ready-초록색이 되면 클릭하세요')
            setTimeout(() => {
                setState('now');
                setMessage('now-지금 클릭!');
                console.log('123');
            }, Math.ceil(Math.random() * 1000) + 2000)
        } else if (state === 'ready') {
            setState('waiting');
            setMessage('waiting-넘 빠름, 초록되면 클릭하기!')
            clearTimeout(timeOut);
        } else if (state === 'now') {
            setState('waiting');
            setMessage('waiting-클릭해서 시작하세요')
        }
    }

    const renderAverage = () => {
        return (
            result.length === 0 
            ? null
            : <p>평균 시간: {result.reduce((a, c)=> a + c) / result.lenght}ms</p>
            // jsx 에서 태그 없음을 null, false, undefined 로 나타낸다
        )
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