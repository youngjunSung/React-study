import React from 'react';

const Try = ({tryInfo, index}) => {
    return (
        <li>
            {tryInfo.try} {tryInfo.result} , {index + 1}번째!!
        </li>
    )
}
// const Try = (props) => {
//     return (
//         <li>
//             {props.tryInfo.try} {props.tryInfo.result} , {props.index + 1}번째!!
//         </li>
//     )
// }
// class Try extends Component {
//     render() {
//         return (
//             <li>
//                 {this.props.tryInfo.try} {this.props.tryInfo.result} , {this.props.index + 1}번째!!
//             </li>
//         )
//     }
// }

export default Try;