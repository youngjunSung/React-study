import React, {Component, useState, useRef, memo, useCallback} from 'react';
import {CLICK_CELL, CHANGE_TURN} from './Tictactoe'

const Td = memo(({rowIndex, cellIndex, dispatch, cellData}) => {
    // 함수 컴포넌트를 memo로 감싸서 state나 props가 변하는 경우에만 리렌더링 되도록 설정
    console.log('td render');
    const onClickTd = useCallback(() => {
        // 불필요하게 함수가 호출되는 것을 방지하기 위해 useCallback 사용
        // 단, 바뀌는 값은 [] 에 넣어서 감지할 수 있도록 해야함
        console.log(rowIndex, cellIndex, cellData);
        if (cellData) {
            return
        }
        dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
        
    }, [cellData])
    return (
        <>
            <td onClick={onClickTd}>{cellData}</td>
        </>
    )
})

export default Td;