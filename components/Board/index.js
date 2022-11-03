import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import useInterval from '../../hooks/useInterval';
import styles from './Board.module.css';

export default function Board () {
    const [ cellHeight, setCellHeight ] = useState(0);
    const [ turn, setTurn ] = useState(0);
    const [ cells, setCells ] = useState([]);
    const [ gameOver, setGameOver ] = useState({ gameOver: false });

    const cellRef = useRef(null);

    useInterval(() => {
        if(!cellRef.current) return false;
        setCellHeight(cellRef.current.offsetWidth);
        return true;
    });

    useEffect(() => {
        buildBoard();
    }, []);

    useEffect(() => {
        for(let i = 0; i < 3; i++) {
            let winnerMark = rowWin(i) || columnWin(i) || diagonalsWin();
            if(winnerMark) {
                setTimeout(() => {
                    alert(`Winner is player '${winnerMark}'`);
                    buildBoard();
                }, 100);
                return;
            }
        }
    }, [ cells ])

    const buildBoard = () => {
        const cells = [];
        for(let i = 0; i < 9; i++) {
            cells[i] = {
                mark: '',
                empty: true,
                i: Math.floor(i / 3),
                j: i % 3
            }
        }
        setTurn(0);
        setCells(cells);
    }

    const handleClick = (i, j) => {
        if(!cells[i * 3 + j].empty) {
            alert('Can\'t choose that cell');
            return;
        }

        cells = cells.map(cell => {
            if(cell.i === i && cell.j ===j) {
                cell.mark = turn %2 === 0 ? 'X' : 'O';
                cell.empty = false;
            }
            return cell;
        })
        setTurn(currentTurn => currentTurn + 1); 
        setCells(cells);   
    }

    // const rowWin = (row) => {
    //     if(!cells.length) return;
    //     const frstCellRow = row * 3;
    //     const scndCellRow = row * 3 + 1;
    //     const thrdCellRow = row * 3 + 2;
    //     if((!cells[frstCellRow].empty && !cells[scndCellRow].empty && !cells[thrdCellRow].empty)
    //         && ((cells[frstCellRow].mark === cells[scndCellRow].mark) 
    //             && (cells[frstCellRow].mark === cells[thrdCellRow].mark))
    //     ) {
    //         return cells[frstCellRow].mark;
    //     }

    //     return '';
    // }

    // const columnWin = (col) => {
    //     if(!cells.length) return;
    //     const frstCellCol = col;
    //     const scndCellCol = col + 3;
    //     const thrdCellCol = col + 6;
    //     if((!cells[frstCellCol].empty && !cells[scndCellCol].empty && !cells[thrdCellCol].empty)
    //         && ((cells[frstCellCol].mark === cells[scndCellCol].mark) 
    //             && (cells[frstCellCol].mark === cells[thrdCellCol].mark))
    //     ) {
    //         return cells[frstCellCol].mark;
    //     }

    //     return '';
    // }

    // const diagonalsWin = () => {
    //     if(!cells.length) return;
    //     if((!cells[0].empty && !cells[4].empty && !cells[8].empty) 
    //         && ((cells[0].mark === cells[4].mark) 
    //             && (cells[0]?.mark === cells[8]?.mark)) 
    //     )  {
    //         return cells[0].mark;
    //     } 
    //     if((!cells[2].empty && !cells[4].empty && !cells[6].empty) 
    //         && ((cells[2].mark === cells[4].mark) 
    //             && (cells[2]?.mark === cells[6]?.mark)) 
    //     )  {
    //         return cells[2].mark;
    //     } 
    //     return '';
    // }

    return (
        <>
            <section className={ styles.board }>
                {
                    [...Array(cells.length).keys()].map(i => {
                        if(i % 3 === 0) {
                            return (
                                <div className={ styles.row } key={ i }>
                                    {
                                        [...Array(3).keys()].map(j => {
                                            const cellData = cells[i + j];
                                            return (
                                                <div 
                                                    className={ `${ styles.cell } cell` } 
                                                    key={ cellData.i+''+cellData.j } 
                                                    ref={ cellRef }
                                                    onClick={ () => handleClick(cellData.i, cellData.j) }
                                                >
                                                    { !cellData.empty && cellData.mark }
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            );
                        }
                    })
                }
            </section>

            <style jsx>{`
                .cell {
                    height: ${ cellHeight }px;
                }
            `}</style>
        </>
    );
}