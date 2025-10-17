import { Tile } from "./Tile"
import '../styles/Guess.css'
import type { GuessResult } from "../utils/checkGuess"

type GuessProps = {
    guess: string
    isCurrentGuess: boolean
    guessResult: Map<number, GuessResult>
    hasError: boolean
}

export const Guess = ({ guess, isCurrentGuess = false, guessResult, hasError = false }: GuessProps) => {
    const letters = guess.padEnd(5).slice(0,5).split('')

    const renderTile = (letter: string, guessResult: GuessResult) => {
        if (isCurrentGuess) {
            if (/^[a-zA-Z]{0,5}$/.test(letter)) {
                return <Tile letter={letter} type='current' />
            } else {
                return <Tile letter={letter} type='absent' />
            }
        }

        if (guessResult) {
            return <Tile letter={letter} type={guessResult.type} />
        } else {
            return <Tile letter={letter} type='absent' />
        }
    }

    return (
        <div className={`guess ${hasError && isCurrentGuess ? 'errorShake' : ''}`}>
            {letters?.map((letter, index) => (
                renderTile(letter, guessResult.get(index)!)
            ))}
        </div>
    )
}