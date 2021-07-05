import React, { Component, useState, useRef, useEffect } from 'react'

// 클래스 라이프사이클 : constructor -> render -> ref -> componentDidmount
// setState/props 변경 시 : shoudComponentUpdate(true) -> render -> componentDidupdate
// 부모가 자식 없앨 때 : componentWillUnmount -> 소멸

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

const scores = {
    바위: 1,
    가위: 0,
    보: -1,
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find((v) => {
        return v[1] === imgCoord;
    })[0];
}

const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setimgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    useEffect(() => { // componentDidMount, componentDidUpdate 역할
        interval.current = setInterval(changeHand, 100);
        return () => { // componentWillUnmount 역할
            clearInterval(interval.current);
        }
    }, [imgCoord])

    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
            setimgCoord(rspCoords.가위)
        } else if (imgCoord === rspCoords.가위) {
            setimgCoord(rspCoords.보)
        } else if (imgCoord === rspCoords.보) {
            setimgCoord(rspCoords.바위)
        }
    }

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비김')
        } else if ([-1, 2].includes(diff)) {
            setResult('이김');
            setScore((prevScore)=>{ prevScore + 1 })
        } else {
            setResult('짐');
            setScore((prevScore)=>{ prevScore - 1 })
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 1000);
    }

    return (
        <>
            <div id="computer" style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
            <div>
                <button onClick={onClickBtn('바위')}>바위</button>
                <button onClick={onClickBtn('가위')}>가위</button>
                <button onClick={onClickBtn('보')}>보</button>
            </div>
            <p>{result}</p>
            <p>{score}점</p>
        </>
    )
}

export default RSP;