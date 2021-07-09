import React, {useRef, useReducer, createContext, useMemo} from 'react';
import Table from './Table';
import Form from './Form'

export const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
});

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 오픈된 것들
}

const initialState = {
    tableData: [],
}

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i
    });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    };
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell; 
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
};

export const START_GAME = 'START_GAME'

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME: {
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine)
            }
        }
        default:
            return state
    }

}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // state 값 캐싱해놓아서 context API 최적화
    const value = useMemo(() => { 
        return {tableData: state.tableData, dispatch}
    }, [state.tableData])
    // 중괄호는 return 있어야 값이 반환됨

    // const value2 = useMemo(() => ( 
    //     {tableData: state.tableData, dispatch}
    // ), [state.tableData])
    // 소괄호는 return 생략 가능

    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </TableContext.Provider>
    )
}

export default MineSearch;