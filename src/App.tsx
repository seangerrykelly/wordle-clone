import React, { useEffect, useState } from 'react'
import './App.css'
import { Board } from './components/Board'
import { Keyboard } from './components/Keyboard'
import wordList from './data/five-letter-words.json'

function App() {
  const [guessCount, setGuessCount] = useState(0)
  const [currGuess, setCurrGuess] = useState('')
  const [guesses, setGuesses] = useState<Array<string>>(Array(6).fill(''))
  const [secretWord, setSecretWord] = useState<string>('react')
  const [isGameOver, setIsGameOver] = useState<boolean>(false)

  /**
   * Select random word from list on page load
   */
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * wordList.length)
    setSecretWord(wordList[randomIndex])
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
    }  else if (event.code === 'Enter' && currGuess.length === 5) {
      handleKeyboardClick('ENTER')
    } else if (event.code === 'Backspace') {
      handleKeyboardClick('DEL')
    }
  }

  const addNewGuess = () => {
    const guessesCopy = guesses
    guessesCopy[guessCount] = currGuess
    setGuesses(guessesCopy)
    setGuessCount(guessCount => guessCount + 1)
    if (guessCount >= 5 || currGuess === secretWord) {
      setIsGameOver(true)
    }
    setCurrGuess('')
  }

  const handleKeyboardClick = (letter: string) => {
    if (isGameOver) {
      return
    }
    
    if (letter == "ENTER" && currGuess.length == 5) {
      addNewGuess()
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
      <h1>Wordle</h1>
      <div className="card">
        <Board guesses={guesses} secretWord={secretWord} guessIndex={guessCount} currentGuess={currGuess}/>
        <Keyboard handleClick={handleKeyboardClick}/>
      </div>
    </>
  )
}

export default App
