import '../styles/GameOverMessage.css'

type GameOverMessageProps = {
    message: string
}

export const GameOverMessage = ({ message }: GameOverMessageProps) => {
    return (
        <div className="gameOverMessage">
            {message}
        </div>
    )
}