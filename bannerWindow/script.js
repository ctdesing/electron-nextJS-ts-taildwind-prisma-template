const images = [
	'assets/next_logo.jpg',
	'assets/prisma_logo.svg',
	'assets/tailwind_logo.png',
	'assets/typescript_logo.svg',
	'assets/electron_logo.png'
]

const imgDisplay = document.getElementById('img-display')
const loadingIndicator = document.getElementById('loading-inner')

const getNextImage = ((images)=> {
	let counter = 0

	return () => {
		const nextImage = images[counter]

		if (counter < images.length) {
			counter++
		} else {
			counter = 0
		}

		return nextImage
	}
})(images)

console.log(getNextImage(images))

setInterval(() => {
	imgDisplay.style.backgroundImage=`url(${getNextImage()})`
}, 1 * 1000)

let loadingCounter = 0

const loading = setInterval(() => {
	if (loadingCounter >= 90) {
		clearInterval(loading)
		return
	}

	loadingIndicator.style.width = `${loadingCounter+=2}%`
},100)

