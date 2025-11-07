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

    const renderTile = (letter: string, guessResult: GuessResult, index: number) => {
        if (isCurrentGuess) {
            if (/^[a-zA-Z]{0,5}$/.test(letter)) {
                return <Tile letter={letter} type='current' isFlipping={false} index={index}/>
            } else {
                return <Tile letter={letter} type='empty' isFlipping={false}  index={index}/>
            }
        }

        if (guessResult) {
            return <Tile letter={letter} type={guessResult.type} isFlipping={true}  index={index}/>
        } else {
            return <Tile letter={letter} type='empty' isFlipping={false} index={index}/>
        }
    }

    return (
        <div className={`guess ${hasError && isCurrentGuess ? 'errorShake' : ''}`}>
            {letters?.map((letter, index) => (
                renderTile(letter, guessResult.get(index)!, index)
            ))}
        </div>
    )
}