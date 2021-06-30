import React, { PureComponent, memo, useState } from 'react';

// const Try = memo(({tryInfo, index}) => {
//     // 부모로 받은 props는 자식에서 변경할 수 없고
//     // state로 받아서 변경할 수 있다 (tryInfo.result -> result 로 변경)
//     const [result, setResult] = useState(tryInfo.result);
//     const onClick = () => {
//         setResult('props 바꾸기')
//     }
//     return (
//         <li onClick={onClick}>
//             {tryInfo.try} {result} , {index + 1}번째!!!!
//         </li>
//     )
// })
// const Try = (props) => {
//     return (
//         <li>
//             {props.tryInfo.try} {props.tryInfo.result} , {props.index + 1}번째!!
//         </li>
//     )
// }
class Try extends PureComponent  {
    state = {
        result: this.props.tryInfo.result,
    }
    onClick = () => {
        this.setState({
            result: 'props 변경!',
        })
    }
    render() {
        return (
            <li onClick={this.onClick}>
                {this.props.tryInfo.try} {this.state.result} , {this.props.index + 1}번째~~!!
            </li>
        )
    }
}

export default Try;