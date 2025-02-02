import React, { useState, useEffect } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
  // Updated path for v2


import Square from "./Square";

const Board = () => {
    const [state, setState] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        const isBoardFull = state.every(square => square !== null);
        const winner = checkWinner();

        if ( winner || isBoardFull) {
            setGameOver(true);
            setWinner(winner);
        } else {
            setGameOver(false);
            setWinner(null);
        }
    }, [state]);

    const checkWinner = () => {
        const winnerLogic = [
            [0, 1, 2],
              [3, 4, 5],
            [6, 7, 8],
            [1, 4, 7],
            [0, 3, 6],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let logic of winnerLogic) {
            const [a, b, c] = logic;
            if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
                return state[a];
            }
        }
        return null;
    };

    const handleClick = (index) => {
        if (state[index] !== null || gameOver) {
            return;
        }
        const copyState = [...state];
        copyState[index] = isXTurn ? "X" : "O";
        setState(copyState);
        setIsXTurn(!isXTurn);
    };

    const handleReset = () => {
        setState(Array(9).fill(null));
        setIsXTurn(true);
        setGameOver(false);
        setWinner(null);
    };

    console.log('State', state);

    return (
      

       <div className='board-container'>
         <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
        <PuzzlePieceIcon className="h-6 w-6 text-white mr-2" />


         Tic-Tac-Toe</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
       
      </Container>
    </Navbar>
      
            {(gameOver) ? (
                <>   <div className="result-message">{winner? `${winner} is the winner!` : "It's a draw"}</div>
                    <button onClick={handleReset}>Play Again</button>
                </>
            ) : (
                <>
                    <h4> Player {isXTurn ? "X" : "O"} please move</h4>
                    <div className='board-row'>
                        <Square onClick={() => handleClick(0)} value={state[0]} />
                        <Square onClick={() => handleClick(1)} value={state[1]} />
                        <Square onClick={() => handleClick(2)} value={state[2]} />
                    </div>
                    <div className='board-row'>
                      <Square onClick={() => handleClick(3)} value={state[3]} />
                        <Square onClick={() => handleClick(4)} value={state[4]} />
                        <Square onClick={() => handleClick(5)} value={state[5]} />
                    </div>
                    <div className='board-row'>
                        <Square onClick={() => handleClick(6)} value={state[6]} />
                        <Square onClick={() => handleClick(7)} value={state[7]} />
                        <Square onClick={() => handleClick(8)} value={state[8]} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Board;


