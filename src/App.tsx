import { useState } from 'react'
import './App.css'
import { Board } from './components/Board'
import { Keyboard } from './components/Keyboard'

function App() {
  const [guessCount, setGuessCount] = useState(0)
  const [currGuess, setCurrGuess] = useState('')
  const [guesses, setGuesses] = useState<Array<string>>(Array(6).fill(''))
  const [secretWord, setSecretWord] = useState('react')
  const [isGameOver, setIsGameOver] = useState<boolean>(false)

  const addNewGuess = () => {
    const guessesCopy = guesses
    guessesCopy[guessCount] = currGuess
    setGuesses(guessesCopy)
    setGuessCount(guessCount + 1)
    setCurrGuess('')
    if (guessCount >= 5) {
      setIsGameOver(true)
    }
  }

  const submitGuess = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (isGameOver) {
      return
    }
    addNewGuess()
  }

  const updateGuess = (event: { target: { value: string } }) => {
    // Update current guess
    const currInput = event.target.value.toLowerCase()
      // Allow only letters, max 5 characters
    if (/^[a-zA-Z]{0,5}$/.test(currInput)) {
      setCurrGuess(currInput);
    }
    // setCurrGuess(currInput)

    // Update list of guesses
    // const guessesCopy = guesses
    // guessesCopy[guessCount] = currInput
    // setGuesses(guessesCopy)
  }

  const handleKeyboardClick = (letter: string) => {
    if (letter == "ENTER" && currGuess.length == 5) {
      addNewGuess()
      return
    }
    console.log('letter: ', letter)
    if (letter == "DEL") {
      setCurrGuess(currGuess.slice(0, currGuess.length - 1))
      return
    }
    if (currGuess.length >= 5) {
      return
    }
    setCurrGuess(currGuess + letter.toLowerCase())
  }

  return (
    <>
      <h1>Wordle</h1>
      <div className="card">
        <Board guesses={guesses} secretWord={secretWord}/>
        <form onSubmit={submitGuess}>
          <input type="text" autoFocus value={currGuess} onChange={updateGuess} />
          <button disabled={isGameOver || currGuess.length < 5} type="submit">Guess</button>
        </form>
        <Keyboard handleClick={handleKeyboardClick}/>
      </div>
    </>
  )
}

export default App
