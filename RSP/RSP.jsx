import React, { Component } from 'react'

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

class RSP extends Component {
    state = {
        result: 'text',
        imgCoord: '0',
        score: 0,
    }

    interval;

    changeHand = () => {
        const {imgCoord} = this.state;
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위,
            })
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보,
            })
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위,
            })
        }
    }

    componentDidMount() { // 컴포넌트 첫 렌더링 후 상태
        this.interval = setInterval(this.changeHand, 100);
    }

    componentDidUpdate() { // 리렌더링 후

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // 고차 함수 : (choice) => () =>
    onClickBtn = (choice) => () => {
        const {imgCoord} = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
                result: '비김',
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이김',
                    score: prevState.score + 1,
                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    result: '짐',
                    score: prevState.score - 1,
                }
            })
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 1000);
    }

    render() {
        const {result, imgCoord, score} = this.state;
        return (
            <>
                <div id="computer" style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
                <div>
                    <button onClick={this.onClickBtn('바위')}>바위</button>
                    <button onClick={this.onClickBtn('가위')}>가위</button>
                    <button onClick={this.onClickBtn('보')}>보</button>
                </div>
                <p>{result}</p>
                <p>{score}점</p>
            </>
        )
    }
}

export default RSP;