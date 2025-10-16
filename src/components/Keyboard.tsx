import '../styles/Keyboard.css'
import type { GuessResult } from '../utils/checkGuess'

type KeyboardProps = {
    handleClick: (letter: string) => void
    keyboardMap: Map<string, GuessResult['type']>
}

export const Keyboard = ({ handleClick, keyboardMap }: KeyboardProps) => {
    const keyboardRows = new Map<number, string[]>([
        [1, ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']],
        [2, ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']],
        [3, ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']]
    ])

    return (
        <div>
            {Array.from(keyboardRows.entries()).map(([rowNumber, letters]) => (
                <div key={rowNumber} className="keyboard-row">
                    {letters.map((letter) => (
                        <button 
                            key={letter} 
                            className={`keyboard-key ${keyboardMap.get(letter)}-key`}
                            onClick={() => handleClick(letter)}>
                            {letter}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    )

}