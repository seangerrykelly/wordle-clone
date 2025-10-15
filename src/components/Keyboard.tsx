import '../styles/Keyboard.css'

type KeyboardProps = {
    handleClick: (letter: string) => void
}

export const Keyboard = ({ handleClick }: KeyboardProps) => {
    const keyboardRows = new Map<number, string[]>([
        [1, ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']],
        [2, ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']],
        [3, ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']]
    ])
    
    return (
        <div className="keyboard-container">
            {Array.from(keyboardRows.entries()).map(([rowNumber, letters]) => (
                <div key={rowNumber} className="keyboard-row">
                    {letters.map((letter) => (
                        <button 
                            key={letter} 
                            className="keyboard-key"
                            onClick={() => handleClick(letter)}>
                            {letter}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    )

}