import { useState } from 'react'
import '../styles/Board.css'
import { Guess } from './Guess'

type BoardProps = {
    guesses: Array<string>
    secretWord: string
}

export const Board = ({ guesses, secretWord }: BoardProps) => {
    const [guessList, setGuessList] = useState<Array<string>>(guesses)
    console.log('guessList: ', guessList)
    return (
        <div className="board">
            {guessList.map((guess, index) => (
                <Guess key={index} guess={guess} secretWord={secretWord} />
            ))}
        </div>
    )
}