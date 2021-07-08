const React = require('react');
const { useState, useRef } = React;

const Gugudan = () => {
    // 변수 자리에 객체/배열 쓰는 구조 분해 할당 문법 = const [first, setFirst]
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        if (value == first * second) {
            setFirst(Math.ceil(Math.random() * 9))
            setSecond(Math.ceil(Math.random() * 9))
            setValue('')
            setResult((prevResult) => {
                return (
                   value + ' <- 정답!'
                )
            })
            inputRef.current.focus();
        } else {
            setValue('')
            setResult(value + ' 오답!')
            inputRef.current.focus();
        }
    }
    const onChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <React.Fragment>
            <p>{first} X {second} = ?</p>
            <form onSubmit={onSubmit}>
                <input ref={inputRef} type="number" value={value} onChange={onChange} />
                <button type="submit" className="btn" htmlFor="abc">확인</button>
            </form>
            <p>{result}</p>
        </React.Fragment>
    )
}

module.exports = Gugudan;