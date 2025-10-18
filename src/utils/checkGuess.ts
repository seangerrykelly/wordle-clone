import wordList from '../data/five-letter-words.json'

export type GuessResult = {
    index: number
    type: 'correct' | 'present' | 'absent' | 'current'
}

export enum ValidGuessResponses {
    VALID = 'Valid guess',
    NOT_ENOUGH_LETTERS = 'Not enough letters',
    NOT_IN_WORD_LIST = 'Not in word list'
}

export const GAME_OVER_MESSAGES: Map<number, string> = new Map<number, string>([
    [1, 'Genius'],
    [2, 'Magnificent'],
    [3, 'Impressive'],
    [4, 'Splendid'],
    [5, 'Great'],
    [6, 'Phew'],
])

export const checkGuessValidity = (guess: string) => {
    if (wordList.includes(guess) && guess.length === 5) {
        return ValidGuessResponses.VALID
    } else if (guess.length < 5) {
        return ValidGuessResponses.NOT_ENOUGH_LETTERS
    } else {
        return ValidGuessResponses.NOT_IN_WORD_LIST
    }
}

/*
    If letter is in the correct spot, return correct
    If letter is not in the correct spot, return present
    If letter is not in the word, return absent
    If letter is in the word, but letter was already used prior, return absent
*/
export const checkGuess = (guess: string, secretWord: string) => {
    const guessMap = new Map<number, GuessResult>()
    const secretWordMap = new Map<string, number>()
    for (let i = 0; i < secretWord.length; i++) {
        const currLetter = secretWord[i]
        if (secretWordMap.has(currLetter)) {
            secretWordMap.set(currLetter, secretWordMap.get(currLetter)! + 1)
        } else {
            secretWordMap.set(currLetter, 1)
        }
    }

    // Iterate through the guess twice. Once for the greens and definite greys, then once for the yellows
    for (let i = 0; i < guess.length; i++) {
        const currLetter = guess[i]
        const guessResult: GuessResult = { index: i, type: 'absent' }

        if (currLetter === secretWord[i]) {
            guessResult.index = i
            guessResult.type = 'correct'
            guessMap.set(i, guessResult)
            secretWordMap.set(currLetter, secretWordMap.get(currLetter)! - 1)
        } else if (!secretWord.includes(currLetter)) {
            guessMap.set(i, guessResult)
        }
    }

    // Go through the word again to get the yellows
    for (let i = 0; i < guess.length; i++) {
        const currLetter = guess[i]
        const guessResult: GuessResult = { index: i, type: 'present' }
        if (guessMap.has(i)) {
            continue
        } else if (secretWord.includes(currLetter) && secretWordMap.get(currLetter)! > 0) {
            guessMap.set(i, guessResult)
            secretWordMap.set(currLetter, secretWordMap.get(currLetter)! - 1)
        } else {
            guessResult.type = 'absent'
            guessMap.set(i, guessResult)
        }
    }

    return guessMap
}