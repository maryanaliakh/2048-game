import GameBoard from "./game/GameBoard.tsx"

export default function App() {
    return (
        <main>
            <h1 className="app">2048game</h1>
            <div>
                <GameBoard q={2}/>
            </div>
        </main>
    )
}