import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요',
        result: [],
    }

    timeOut;

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
            }, Math.ceil(Math.random() * 1000) + 2000)
        } else if (state === 'ready') {
            this.setState({
                state: 'waiting',
                message: 'waiting-넘 빠름, 초록되면 클릭하기!'
            })
            clearTimeout(this.timeOut);
        } else if (state === 'now') {
            this.setState({
                state: 'waiting',
                message: 'waiting-클릭해서 시작하세요'
            })
        }
    }
    renderAverage = () => {
        const {result} = this.state;
        return (
            result.length === 0 
            ? null
            : <p>평균 시간: {result.reduce((a, c)=> a + c) / result.lenght}ms</p>
        )
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