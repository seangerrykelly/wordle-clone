type GuessResult = {
    index: number
    type: 'correct' | 'present' | 'absent' | 'current'
}

/*
    If letter is in the correct spot, return green
    If letter is not in the correct spot, return yellow
    If letter is not in the word, return grey
    If letter is in the word, but letter was already used prior, return grey
*/

export const checkGuess = (guess: string, secretWord: string) => {
    const answer = new Map<number, GuessResult>()
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
            answer.set(i, guessResult)
            secretWordMap.set(currLetter, secretWordMap.get(currLetter)! - 1)
        } else if (!secretWord.includes(currLetter)) {
            answer.set(i, guessResult)
        }
    }

    // Go through the word again to get the yellows
    for (let i = 0; i < guess.length; i++) {
        const currLetter = guess[i]
        const guessResult: GuessResult = { index: i, type: 'present' }
        if (answer.has(i)) {
            continue
        } else if (secretWord.includes(currLetter) && secretWordMap.get(currLetter)! > 0) {
            answer.set(i, guessResult)
            secretWordMap.set(currLetter, secretWordMap.get(currLetter)! - 1)
        } else {
            guessResult.type = 'absent'
            answer.set(i, guessResult)
        }
    }

}