import React, {Component, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

const getWinNumbers = () => {
    console.log('getWinNum');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0,6).sort((p, c) => p -c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), [winBalls]);
    // useMemo가 getWinNumbers 리턴 값을 기억해서 리렌더링 시 함수가 반복실행 되지 않음
    // [] 에 넣은 값이 바뀌기 전까지는 값을 기억한다.
    const [winBalls, setWinBalls] = useState([]);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    // 조건문에 hooks 넣지 말기
    // useEffect 안에 setState 넣지 말기

    const timeOuts = useRef([]);

    const runTimeOuts = () => {
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeOuts.current[i] = setTimeout(() => {
               setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]])
            }, (i + 1) * 100);
            timeOuts.current[6] = setTimeout(() => {
               setBonus(winNumbers[6]);
               setRedo(true);
            }, 700);
        }
    }

    // useCallback 함수를 기억해놓는다. (자식 컴포넌트에 props로 함수를 넘길 떄 useCallback 필수)
    const onClickRedo = useCallback(() => {
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeOuts.current = [];
    }, [winNumbers]) // useCallback 안에서 사용되는 state는 배열 안에 넣어야 한다.
    // useEffect 에서 배열의 담긴 값이 변경되어야 useEffect가 실행되듯
    // useCallback 에서도 배열에 담긴 값이 변경되어야 useCallback 이 실행된다.

    useEffect(() => { // componentDidMount -> [] 빈배열일 때
        runTimeOuts();
        return () => { // componentWillUnmount 역할
            timeOuts.current.forEach((v) => {
                clearTimeout(v)
            })
        }
    }, [winNumbers]) // componentDidUpdate -> [] 배열의 요소가 변하할 때 (componentDidMount 포함)
    // useEffect 여러개 사용 가능

    // DidUpdate만 하고 싶을 때
    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            // DidUpdate 할 내용
        }
    }, []); // DidUpdate 할 떄 바뀌는 값 넣기

    return (
            <>
              <p>당첨숫자</p>  
              <div id="결과창">
                  {winBalls.map((v) => <Ball key={v} number={v} />)}
              </div>
              <p>보너스</p>
              {bonus && <Ball number={bonus} />}
              {redo && <button onClick={onClickRedo}>한 번 더!</button>}
            </>
    )
}

export default Lotto;