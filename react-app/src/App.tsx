import GameBoard from "./game/GameBoard"

export default function App() {
    return (
        <main>
            <h1 className="app">2048game</h1>
            <div>
                <GameBoard />
            </div>
        </main>
    )
}