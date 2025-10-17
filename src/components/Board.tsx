import '../styles/Board.css'
import type { GuessResult } from '../utils/checkGuess'
import { Guess } from './Guess'

type BoardProps = {
    guesses: Array<string>
    guessIndex: number
    currentGuess: string
    guessResults: Array<Map<number, GuessResult>>
    hasError: boolean
}

export const Board = ({ guesses, guessIndex, currentGuess, guessResults, hasError}: BoardProps) => {
    
    return (
        <div className="board">
            {guessResults.map((guess, index) => (
                <Guess 
                    key={index}
                    guess={index === guessIndex ? currentGuess: guesses[index]}
                    guessResult={guess}
                    isCurrentGuess={index === guessIndex}
                    hasError={hasError}
                />
            ))}
        </div>
    )
}