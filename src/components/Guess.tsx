import { Tile } from "./Tile"
import '../styles/Guess.css'

type GuessProps = {
    guess: string
    secretWord: string
    isCurrentGuess: boolean
}

export const Guess = ({ guess, secretWord, isCurrentGuess = false }: GuessProps) => {
    const letters = guess.padEnd(5).slice(0,5).split('')

    const renderTile = (letter: string, index: number) => {
        if (isCurrentGuess) {
            if (/^[a-zA-Z]{0,5}$/.test(letter)) {
                return <Tile letter={letter} type='current' />
            } else {
                return <Tile letter={letter} type='absent' />
            }
        }
        if (secretWord.indexOf(letter) == index) {
            return <Tile letter={letter} type='correct' />
        } else if (secretWord.indexOf(letter) >= 0) {
            return <Tile letter={letter} type='present' />
        } else {
            return <Tile letter={letter} type='absent' />
        }
    }

    return (
        <div className="guess">
            {letters?.map((letter, index) => (
                renderTile(letter, index)
            ))}
        </div>
    )
}