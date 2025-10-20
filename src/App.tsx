import { useEffect, useState } from 'react'
import './App.css'
import { Board } from './components/Board'
import { Keyboard } from './components/Keyboard'
import wordList from './data/five-letter-words.json'
import { checkGuess, checkGuessValidity, GAME_OVER_MESSAGES, ValidGuessResponses, type GuessResult } from './utils/checkGuess'
import { ErrorMessage } from './components/ErrorMessage'
import { GameOverMessage } from './components/GameOverMessage'

function App() {
  const [guessCount, setGuessCount] = useState(0)
  const [currGuess, setCurrGuess] = useState('')
  const [guesses, setGuesses] = useState<Array<string>>(Array(6).fill(''))
  const [guessResults, setGuessResults] = useState<Array<Map<number, GuessResult>>>(Array(6).fill(new Map<number, GuessResult>))
  const [secretWord, setSecretWord] = useState<string>('react')

  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showGameOverMessage, setShowGameOverMessage] = useState<boolean>(false)
  const [gameOverMessage, setGameOverMessage] = useState<string>('')
  const [didUserWin, setDidUserWin] = useState<boolean>(false)

  const [keyboardMap, setKeyboardMap] = useState<Map<string, GuessResult['type']>>(new Map<string, GuessResult['type']>)

  // Reset error state after 1 second. This is used for the shaking animation when an invalid word is guessed.
  useEffect(() => {
    if (!hasError) {
      return
    }
    const resetHasError = setTimeout(() => {
        setHasError(false)
    }, 1000)

    return () => clearTimeout(resetHasError)
  }, [hasError])

  useEffect(() => {
    if (!showGameOverMessage) {
      return
    }
    const resetShowGameOverMessage = setTimeout(() => {
        if (didUserWin){
          setShowGameOverMessage(false)
        }
    }, 2000)

    return () => clearTimeout(resetShowGameOverMessage)
  }, [showGameOverMessage])

  /**
   * Select random word from list on page load
   */
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * wordList.length)
    setSecretWord(wordList[randomIndex])

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < alphabet.length; i++) {
      keyboardMap?.set(alphabet[i], 'current')
    }
  }, [])

  /**
   * Add event listener for tracking key presses if current focus is not the input
   * Include currGuess as a dependency to avoid stale state issues in handler
   */
  useEffect(() => {
    if (isGameOver) {
      return
    }
    const keyDownListener = (event: KeyboardEvent) => handleKeyDown(event)
    window.addEventListener('keydown', keyDownListener)
    return () => window.removeEventListener('keydown', keyDownListener)
  }, [currGuess, isGameOver])

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code.startsWith('Key') && currGuess.length < 5) {
      const currKey = event.code.slice(event.code.length - 1).toLowerCase()
      handleKeyboardClick(currKey)
    }  else if (event.code === 'Enter') {
      handleKeyboardClick('ENTER')
    } else if (event.code === 'Backspace') {
      handleKeyboardClick('DEL')
    }
  }

  const addNewGuess = (guessResult: Map<number, GuessResult>) => {
    const guessResultsCopy = guessResults
    guessResultsCopy[guessCount] = guessResult
    setGuessResults(guessResultsCopy)

    const guessesCopy = guesses
    guessesCopy[guessCount] = currGuess
    setGuesses(guessesCopy)

    setGuessCount(guessCount => guessCount + 1)
    if (guessCount >= 5 || currGuess === secretWord) {
      setShowGameOverMessage(true)
      setGameOverMessage(currGuess === secretWord ? GAME_OVER_MESSAGES.get(guessCount)! : secretWord.toUpperCase())
      setIsGameOver(true)
    }
    setDidUserWin(currGuess === secretWord)
    setCurrGuess('')
  }

  const updateKeyboardMap = (guessResult: Map<number, GuessResult>) => {
    const keyboardMapCopy = keyboardMap
    for (let i = 0; i < currGuess.length; i++) {
      const letterResult = guessResult.get(i)
      const currLetter = currGuess[i].toUpperCase()
      if (letterResult) {
        if (keyboardMapCopy?.get(currLetter) === 'correct') {
          continue
        } else {
          // If letter is already yellow, don't set it to grey
          if (keyboardMapCopy?.get(currLetter) === 'present' && letterResult.type === 'absent') {
            continue
          }
          keyboardMapCopy?.set(currLetter, letterResult.type)
        }
      }
    }
    setKeyboardMap(keyboardMapCopy)
  }

  const handleKeyboardClick = (letter: string) => {
    if (isGameOver) {
      return
    }
    
    if (letter == "ENTER") {
      const guessValidity = checkGuessValidity(currGuess)
      if (guessValidity === ValidGuessResponses.VALID) {      
        const guessResult = checkGuess(currGuess, secretWord)
        updateKeyboardMap(guessResult)
        addNewGuess(guessResult)
        return
      }
      setHasError(true)
      setErrorMessage(guessValidity)
      return
    }

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
      <div className="card">
        {hasError && <ErrorMessage message={errorMessage} />}
        {showGameOverMessage && <GameOverMessage message={gameOverMessage} />}
        <Board 
          guesses={guesses} 
          guessIndex={guessCount} 
          currentGuess={currGuess}
          guessResults={guessResults}
          hasError={hasError}
        />
        <Keyboard 
          handleClick={handleKeyboardClick}
          keyboardMap={keyboardMap}
        />
      </div>
    </>
  )
}

export default App
