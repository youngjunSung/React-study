import React, {useRef, useContext} from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';

const Tr = () => {
    const {tableData} = useContext(TableContext);
    return (
        <tr>
            {Array(tableData[0].length).fill().map((td, i) => <Td />)}
        </tr>
    )
}

export default Tr;