const React = require('react');
const { useState, useRef } = React;

const WordChaning = () => {
    const [word, setWord] = useState('리어카');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const onInputRef = useRef();

    const onChange = (e) => {
        setValue(e.target.value);
    }
    const onClick = (e) => {
        e.preventDefault();
        if (value.substring(1, 0) === word.substring(word.length, word.length -1)) {
            setResult('성공');
            setWord(value);
            setValue('');
            onInputRef.current.focus();
        } else {
            setResult('실패');
            setValue('');
            onInputRef.current.focus();
        }
    }

    return (
        <>
            <p>{word}</p>
            <form>
                <input ref={onInputRef} value={value} onChange={onChange} />
                <button type="submit" onClick={onClick}>입력</button>
            </form>
            <p>{result}</p>
        </>
    )
}

module.exports = WordChaning;