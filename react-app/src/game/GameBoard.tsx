import {useEffect, useState} from "react"

export default function GameBoard() {
    const [matrix, setMatrix] = useState(Array(4).fill(0).map(() => Array(4).fill(0)));
    const [win, setWin] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)


        const addTwo = (newMatrix) => {
            const percentage = Math.floor(Math.random() * 10)

            let row = Math.floor(Math.random() * 4)
            let cell = Math.floor(Math.random() * 4)

            while (newMatrix[row][cell] !== 0) {
                row = Math.floor(Math.random() * 4)
                cell = Math.floor(Math.random() * 4)
            }

            if (percentage === 9) {
                newMatrix[row][cell] = 4;
            } else {
                newMatrix[row][cell] = 2;
            }
        }

    useEffect(() => {
        setMatrix(prev => {
            const newMatrix = prev.map(row => [...row]);
            addTwo(newMatrix);
            addTwo(newMatrix);
            return newMatrix;
        });
    }, []);

        let changeMatrix = (prevMatrix, newMatrix) => {
            let different = false;

            for(let row = 0; row < 4; row++) {
                for (let cell = 0; cell < 4; cell++) {
                    if(newMatrix[row][cell] != prevMatrix[row][cell]) {
                        different = true;
                        break;
                    }
                }
            }
            if (different) {
                const updatedMatrix = newMatrix.map(row => [...row])
                addTwo(updatedMatrix);
                return updatedMatrix;
            }
            return prevMatrix;
        }


    const movLeft = () => {
        let counterScore = 0;

        setMatrix((prev) => {
                const newMatrix = prev.map(row => row.filter(num => num !== 0));

        for (let row = 0; row < 4; row++) {
                while (newMatrix[row].length < 4) {
                    newMatrix[row].push(0)
                }
        }

        for (let row = 0; row < 4; row++) {
            for (let cell = 0; cell < 3; cell++) {
                if(newMatrix[row][cell] === newMatrix[row][cell+1] && newMatrix[row][cell] != 0) {
                    newMatrix[row][cell] += newMatrix[row][cell+1]
                    counterScore += newMatrix[row][cell]
                    newMatrix[row][cell+1] = 0
                    cell++;
                }
            }
        }

        newMatrix.map(row => row.filter(num => num !== 0));
        for (let row = 0; row < 4; row++) {
            while (newMatrix[row].length < 4) {
                newMatrix[row].push(0)
            }
        }

        const updatedMatrix = changeMatrix(prev, newMatrix)
        winFunc(updatedMatrix)
        if(gameOverFunc(updatedMatrix)) {
            setGameOver(true)
        }

            setScore(prev => {
                const newScore = prev + counterScore;
                setBestScore(prevBest => Math.max(prevBest, newScore));
                return newScore;
            });
        return updatedMatrix;
    })
    }

    const movRight = () => {
        let counterScore = 0;

        setMatrix((prev) => {
            const newMatrix = prev.map(row => row.filter(num => num !== 0));

        for (let row = 0; row < 4; row++) {
            while (newMatrix[row].length < 4) {
                    newMatrix[row].unshift(0)
            }
        }

        for (let row = 0; row < 4; row++) {
            for (let cell = 3; cell >= 0; cell--) {
                if(newMatrix[row][cell] === newMatrix[row][cell-1] && newMatrix[row][cell] != 0) {
                    newMatrix[row][cell] += newMatrix[row][cell-1]
                    counterScore += newMatrix[row][cell]
                    newMatrix[row][cell-1] = 0
                    cell--;
                }
            }
        }

        newMatrix.map(row => row.filter(num => num !== 0));
        for (let row = 0; row < 4; row++) {
            while (newMatrix[row].length < 4) {
                newMatrix[row].unshift(0)
            }
        }

        const updatedMatrix = changeMatrix(prev, newMatrix)
        winFunc(updatedMatrix)
        if(gameOverFunc(updatedMatrix)) {
            setGameOver(true)
        }

            setScore(prev => {
                const newScore = prev + counterScore;
                setBestScore(prevBest => Math.max(prevBest, newScore));
                return newScore;
            });

            return updatedMatrix;
        })
    }

    const movUp = () => {
        let counterScore = 0;
        setMatrix(prev => {
            const newMatrix = Array(4).fill(0).map(() => Array(4).fill(0));


            for (let col = 0; col < 4; col++) {
                let column = [];
                for (let row = 0; row < 4; row++) {
                    if (prev[row][col] != 0) {
                        column.push(prev[row][col]);
                    }
                }

                for (let cell = 0; cell < column.length - 1; cell++) {
                    if (column[cell] === column[cell + 1] && column[cell] != 0) {
                        column[cell] += column[cell + 1];
                        counterScore += column[cell]
                        column[cell + 1] = 0;
                        cell++;
                    }
                }

                column = column.filter(num => num !== 0);
                while (column.length < 4) column.push(0);

                for (let row = 0; row < 4; row++) {
                    newMatrix[row][col] = column[row];
                }

            }

            const updatedMatrix = changeMatrix(prev, newMatrix)
            winFunc(updatedMatrix)
            if (gameOverFunc(updatedMatrix)) {
                setGameOver(true)
            }

            setScore(prev => {
                const newScore = prev + counterScore;
                setBestScore(prevBest => Math.max(prevBest, newScore));
                return newScore;
            });

            return updatedMatrix;
        })
    }

    const movDown = () => {
        let counterScore = 0;
        setMatrix(prev => {
        const newMatrix = Array(4).fill(0).map(() => Array(4).fill(0));


        for (let col = 0; col < 4; col++) {
            let column = [];
            for (let row = 0; row < 4; row++) {
                if(prev[row][col] != 0) {
                    column.push(prev[row][col]);
                }
            }

            for (let cell = 0; cell < column.length - 1; cell++) {
                if(column[cell] === column[cell + 1] && column[cell] != 0) {
                    column[cell] += column[cell+1];
                    counterScore += column[cell]
                    column[cell+1] = 0;
                    cell++;
                }
            }

            column = column.filter(num => num !== 0);
            while (column.length < 4) column.unshift(0);

            for (let row = 0; row < 4; row++) {
                newMatrix[row][col] = column[row];
            }

        }

        const updatedMatrix = changeMatrix(prev, newMatrix)
        winFunc(updatedMatrix)
        if(gameOverFunc(updatedMatrix)) {
            setGameOver(true)
        }

        setScore(prev => {
            const newScore = prev + counterScore;
            setBestScore(prevBest => Math.max(prevBest, newScore));
            return newScore;
        });

        return updatedMatrix;
    })
    }


    let winFunc = (newMatrix) => {
        for(let row = 0; row < 4; row++) {
            for (let cell = 0; cell < 4; cell++) {
                if(newMatrix[row][cell] === 2048) {
                    setWin(true)
                }
            }
        }
    }

    let gameOverFunc = (newMatrix) => {
        for(let row = 0; row < 4; row++) {
            for (let cell = 0; cell < 4; cell++) {
                if(newMatrix[row][cell] === 0) {
                    return false;
                }
            }}

        for(let row = 0; row < 4; row++) {
            for (let cell = 0; cell < 3; cell++) {
                if(newMatrix[row][cell] === newMatrix[row][cell+1]){
                    return false;
                }
            }
        }

        for(let cell = 0; cell < 4; cell++) {
            for(let row = 0; row < 3; row++) {
                if (newMatrix[row][cell] === newMatrix[row + 1][cell]) {
                    return false;
                }
            }
        }
        return true;
    }

    let newGame = () => {
        setScore(0)
        setWin(false)
        setGameOver(false)
        setMatrix(() => {
            const newMatrix = Array(4).fill(0).map(() => Array(4).fill(0))
            addTwo(newMatrix)
            addTwo(newMatrix)
            return newMatrix
        });
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)) e.preventDefault();
            switch(e.key) {
                case "ArrowLeft": movLeft(); break;
                case "ArrowRight": movRight(); break;
                case "ArrowUp": movUp(); break;
                case "ArrowDown": movDown(); break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);


    return (
        <div>
            <div className="scores-container">
                <div className="score2">
                    <span className="label">SCORE</span>
                    <span className="value">{score}</span>
                </div>
                <div className="score">
                    <span className="label">BESTSCORE</span>
                    <span className="value">{bestScore}</span>
                </div>
            </div>

            <div className="background">
                {matrix.map((row, indexRow) => (
                    <div key={indexRow}>
                        {row.map((cell, indexCell) => (
                            <span
                                key={indexCell}
                                className={`cell cell-${cell}`}
                            >
                            {cell !== 0 ? cell : ""}
                            </span>
                        ))}
                    </div>
                ))}
            </div>


            {win && (
                <>
                    <div className="overlay"></div>
                        <div className="win-card">
                            <h3>YOU WIN 🎉</h3>
                            <button onClick={newGame}>New Game</button>
                        </div>
                </>
            )}
            {gameOver && (
                <>
                    <div className="overlay"></div>
                        <div className="gameover-card">
                            <h3>GAME OVER</h3>
                            <button onClick={newGame}>New Game</button>
                        </div>
                </>
            )}
        </div>
    );

}
