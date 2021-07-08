import React, {PureComponent, memo} from 'react';

const Ball = memo(({number}) => {
    let background;
    if (number <= 10 ) {
        background = 'red';
    } else if (number <= 20 ) {
        background = 'orange';
    } else if (number <= 30 ) {
        background = 'green';
    } else if (number <= 40 ) {
        background = 'blue';
    } else {
        background = 'yellow';
    }
    return (
        <div className="ball" style={{background}}>{number}</div>
    )
});

// class Ball extends PureComponent {
//     render() {
//         const {number} = this.props;
//         let background;
//         if (number <= 10 ) {
//             background = 'red';
//         } else if (number <= 20 ) {
//             background = 'orange';
//         } else if (number <= 30 ) {
//             background = 'green';
//         } else if (number <= 40 ) {
//             background = 'blue';
//         } else {
//             background = 'yellow';
//         }
//         return (
//             <div className="ball" style={{background}}></div>
//         )
//     }
// }

export default Ball;