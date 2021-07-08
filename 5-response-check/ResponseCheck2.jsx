import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요',
        result: [],
    }

    timeOut;
    startTime;
    endTime;

    onClickScreen = () => {
        const {state, message, result} = this.state;
        if (state === 'waiting') {
            this.setState({
                state: 'ready',
                message: 'ready-초록색이 되면 클릭하세요'
            })
            this.timeOut = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: 'now-지금 클릭!'
                })
                this.startTime = new Date();
            }, Math.ceil(Math.random() * 1000) + 2000)
        } else if (state === 'ready') {
            this.setState({
                state: 'waiting',
                message: 'waiting-넘 빠름, 초록되면 클릭하기!'
            })
            clearTimeout(this.timeOut);
        } else if (state === 'now') {
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: 'waiting-클릭해서 시작하세요',
                    result: [...prevState.result, this.endTime - this.startTime],
                }
            })
        }
    }
    renderAverage = () => {
        const {result} = this.state;
        return (
            result.length === 0 
            ? null
            : <>
                <p>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</p>
                <button onClick={this.reset}>리셋</button>
            </>
        )
    }
    reset = () => {
        this.setState({
            result: []
        })
    }

    render() {
        const {state, message} = this.state;
        return ( 
            <>
                <div id="screen" className={state} onClick={this.onClickScreen}>
                    {message}
                </div>
                {this.renderAverage()}
            </>
        )
    }
}

export default ResponseCheck;