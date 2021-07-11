import React, {useRef, useContext} from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';

const Tr = ({rowIndex}) => {
    const {tableData} = useContext(TableContext);
    return (
        <tr>
            {Array(tableData[0].length).fill().map((td, i) => <Td rowIndex={rowIndex} cellIndex={i} />)}
        </tr>
    )
}

export default Tr;