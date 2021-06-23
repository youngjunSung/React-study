const React = require('react');
const { Component } = React;

class WordChaning extends Component {
    state = {
        text: 'state text',
    }

    render() {
        return (
            <h4>{this.state.text}</h4>
        )
    }
}

module.exports = WordChaning;