
let RandomNumber = 0
let Attempts = 0
let TotalWon = 0
let TotalLost = 0
initGame()

function initGame() {
	RandomNumber = Math.floor(Math.random() * 99) + 1
	console.info(`Random number is: ${RandomNumber}`)

	document.querySelector('#reset-button').style.display = 'none'
	document.querySelector('#player-guess').focus()
	document.querySelector('#feedback').innerHTML = ''
	Attempts = 0
	document.querySelector('#guess-button').disabled = false
}

document.querySelector('#guess-button').addEventListener('click', () => {
	let guess = Number(document.querySelector('#player-guess').value)
	console.info(`Player guessed: ${guess}`)

	let feedback = document.querySelector('#feedback')

	if (guess < 1 || guess > 99 || window.isNaN(guess)) {
		feedback.innerHTML = `<p class="bold">Your guess must be between 1 and 99.</p>` + feedback.innerHTML
		feedback.style.color = 'crimson'
		return
	}

	Attempts += 1
	console.info(`Attempt number: ${Attempts}`)

	if (guess == RandomNumber) {
		feedback.innerHTML = `<p>Congratulations! You guessed the number in ${Attempts} attempts.</p>` + feedback.innerHTML
		feedback.style.color = 'darkslategrey'
		TotalWon += 1
		gameOver()
	} else {
		const status = guess < RandomNumber ? 'Too low!' : 'Too high!'
		feedback.innerHTML = `<p><span class="bold">Guess ${Attempts}: </span>${guess} (${status})</p>` + feedback.innerHTML
		feedback.style.color = 'black'

		if (Attempts === 7) {
			feedback.innerHTML = `<p class="bold">YOU LOST! Random number: ${RandomNumber}</p>` + feedback.innerHTML
			feedback.style.color = 'crimson'
			TotalLost += 1
			gameOver()
			return
		}
	}
})

document.querySelector('#reset-button').addEventListener('click', () => {
	initGame()
})

function gameOver() {
	document.querySelector('#total-wins').textContent = TotalWon
	document.querySelector('#total-losses').textContent = TotalLost
	document.querySelector('#total-games').textContent = TotalWon + TotalLost
	document.querySelector('#guess-button').disabled = true
	document.querySelector('#reset-button').style.display = 'inline'
}
