const { useState } = React;

const winning_combinations = [
[0, 1, 2], [3, 4, 5], [6, 7, 8],
[0, 3, 6], [1, 4, 7], [2, 5, 8],[0, 4, 8], [2, 4, 6]];

function Board(){
    const [state, setState] = useState({
        selections: Array(9).fill(null),
        activePlayer: 'X',
    });

    const [msg, setMsg] = useState('');

    const handleClick = (key) => {
        if (state.selections[key] || msg) return;

        setState(s => {
            const cp = [...s.selections];
            cp[key] = s.activePlayer;

            const draw = cp.every(x => x !== null);
            const winner = winning_combinations.some(combo => 
                combo.every(i => cp[i] === s.activePlayer));

            if (winner) {
                setMsg(`Player ${s.activePlayer} wins!`);
            } else if (draw) {
                setMsg('It\'s a draw!');
            }

            return {
                selections: cp,
                activePlayer: s.activePlayer === 'X' ? 'O' : 'X',
            };
        });
    }

    const reset = () => {
        setState({
            selections: Array(9).fill(null),
            activePlayer: 'X',
        });
        setMsg('');
    }

    return (
        <div className="game">
            <h1>Tic-Tac-Toe</h1>
            <div className="msg">{msg}</div>
            <div className="squares">
                {state.selections.map((value, index) => (
                    <button 
                        key={index}
                        className="square"
                        onClick={() => handleClick(index)}
                    >
                        {value}
                    </button>
                ))}
            </div>
            <button type="reset" onClick={reset}>Reset Game</button>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Board />);