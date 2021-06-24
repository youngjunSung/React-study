const React = require('react');
const { Component } = React;

class WordChaning2 extends Component {
    state = {
        word: '리어어어어카',
        value: '',
        result: '',
    };
    onChange = (e) => {
        this.setState({value: e.target.value});
    };
    onClick = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length - 1] == this.state.value[0]) {
            this.setState({
                word: this.state.value,
                value: '',
                result: '정답!',
            })
            this.ggg.focus();
        } else {
            this.setState({
                value: '',
                result: '오답!',
            })
            this.ggg.focus();
        }
    }
    ggg;
    inputRef = (c) => {
        this.ggg = c;
    }
    render() {
        return (
            <>
                <p>{this.state.word}</p>
                <form>
                    <input ref={this.inputRef} type="text" value={this.state.value} onChange={this.onChange} />
                    <button type="submit" onClick={this.onClick}>입력</button>
                </form>
                <p>{this.state.result}</p>
            </>
        )
    }
}

module.exports = WordChaning2;