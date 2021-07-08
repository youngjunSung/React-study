import React, {Component} from 'react';
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

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(), // 당첨 숫자들
        winBalls: [], // 당첨 숫자들이 들어가는 배열
        bonus: null, // 보너스 볼
        redo: false,
    }

    timeOuts = [];

    runTimeOuts = () => {
        const {winNumbers, winBalls} = this.state;
        for (let i = 0; i < winNumbers.length - 1; i++) {
            this.timeOuts[i] = setTimeout(() => {
               this.setState((prevState) => {
                   return {
                       winBalls: [...prevState.winBalls, winNumbers[i]]
                   }
               }) 
            }, (i + 1) * 100);
            this.timeOuts[6] = setTimeout(() => {
               this.setState({
                   bonus: winNumbers[6],
                   redo: true,
               }) 
            }, 700);
        }
    }

    componentDidMount() {
        console.log(getWinNumbers());
        this.runTimeOuts();
    }

    componentWillUnmount() {
        this.timeOuts.forEach((v) => {
            clearTimeout(v)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.winBalls.length === 0) {
            this.runTimeOuts();
        }
    }

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(), // 당첨 숫자들
            winBalls: [], // 당첨 숫자들이 들어가는 배열
            bonus: null, // 보너스 볼
            redo: false,
        })
        this.timeOuts = [];
    }

    render() {
        const {winBalls, bonus, redo} = this.state;
        return (
            <>
              <p>당첨숫자</p>  
              <div id="결과창">
                  {winBalls.map((v) => <Ball key={v} number={v} />)}
              </div>
              <p>보너스</p>
              {bonus && <Ball number={bonus} />}
              {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
            </>
        )
    }
}

export default Lotto;