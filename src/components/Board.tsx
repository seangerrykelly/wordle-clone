import '../styles/Board.css'
import { Guess } from './Guess'

type BoardProps = {
    guesses: Array<string>
    secretWord: string
    guessIndex: number
    currentGuess: string
}

export const Board = ({ guesses, secretWord, guessIndex, currentGuess}: BoardProps) => {
    return (
        <div className="board">
            {guesses.map((guess, index) => (
                <Guess 
                    key={index} 
                    guess={index === guessIndex ? currentGuess: guess} 
                    secretWord={secretWord} 
                    isCurrentGuess={index === guessIndex}
                />
            ))}
        </div>
    )
}