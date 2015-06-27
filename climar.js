let isEven = require('is-even'),
	colors = require('ansi-256-colors')

function mute (string) {
	return colors.fg.bright[0] +
		string + colors.reset
}

function labelize (number) {
	let labelString = '',
		numberString = String(number),
		onesDigitString = numberString
			.split('')
			.pop()

	if (onesDigitString === '0')
		labelString +=
			colors.fg.standard[2] +
			numberString[0]
	else
		labelString +=
			colors.fg.bright[0] +
			onesDigitString

	return labelString + colors.reset
}

function stringifyPixels (
		{
			pixels = [],
			printLabels = true
		} = {}
	) {

	let outputString = '',
		offset = '',
		xLabels = '',
		topBorder = '',
		bottomBorder = '',
		imageString = ''


	if (printLabels) {
		offset = '   '

		xLabels = ' ' + pixels
			.map((row, index) => labelize(index) + ' ')
			.join('')  + '\n'
	}

	topBorder = mute(
		' ' + pixels
		.map(() => '__')
		.join('') + '\n'
	)

	bottomBorder = mute(
		' ' + pixels
		.map(() => '--')
		.join('')  + '\n'
	)

	imageString = pixels
		.map((row, y) => {
			let label = '',
				pixelString = ''

			if (printLabels)
				label = labelize(y) + '  '

			pixelString = row
				.map(pixel => (pixel === 0) ? '  ' : '█▌')
				.join('')

			return `${label}${mute('|')}${pixelString}${mute('|')}`
		})
		.join('\n') + '\n'


	return offset + xLabels +
		offset + topBorder +
		imageString +
		offset + bottomBorder
}

function createHighResolutionPixelString (
		{
			pixels = [],
			style = 'wide'
		} = {}
	) {

	let height = pixels.length,
		width = pixels[0].length,

		// Always generate an image where width and height are even
		// so that the image size aligns with the unicode block elements
		evenHeight = isEven(height) ? height : height + 1,
		evenWidth = isEven(width) ? width : width + 1,

		pixelsScaled = new Array(evenHeight / 2)
			.fill()
			.map(row =>
				new Array(evenWidth / 2).fill(0)
			),
		narrowCharacters = {
			' ' : ' ',
			'▗' : '▗',
			'▖' : '▖',
			'▄' : '▄',
			'▝' : '▝',
			'▐' : '▐',
			'▞' : '▞',
			'▟' : '▟',
			'▘' : '▘',
			'▚' : '▚',
			'▌' : '▌',
			'▙' : '▙',
			'▀' : '▀',
			'▜' : '▜',
			'▛' : '▛',
			'█' : '█'
		},
		wideCharacters = {
			' ' : '  ',
			'▗' : ' ▄',
			'▖' : '▄ ',
			'▄' : '▄▄',
			'▝' : ' ▀',
			'▐' : ' █',
			'▞' : '▄▀',
			'▟' : '▄█',
			'▘' : '▀ ',
			'▚' : '▀▄',
			'▌' : '█ ',
			'▙' : '█▄',
			'▀' : '▀▀',
			'▜' : '▀█',
			'▛' : '█▀',
			'█' : '██'
		},
		characterSet = wideCharacters,
		joinCharacter = ''


	if (style === 'narrow') {
		characterSet = narrowCharacters
		joinCharacter = ' '
	}

	for (let y = 0; y < evenHeight; y += 2) {
		for (let x = 0; x < evenWidth; x += 2) {

				let character = ' '

				if (pixels[y][x] === 0)
					if (pixels[y][x + 1] === 0)
						if (pixels[y + 1][x] === 0)
							if (pixels[y + 1][x + 1] === 0)
								character = characterSet[' ']
							else
								character = characterSet['▗']
						else
							if (pixels[y + 1][x + 1] === 0)
								character = characterSet['▖']
							else
								character = characterSet['▄']
					else
						if (pixels[y + 1][x] === 0)
							if (pixels[y + 1][x + 1] === 0)
								character = characterSet['▝']
							else
								character = characterSet['▐']
						else
							if (pixels[y + 1][x + 1] === 0)
								character = characterSet['▞']
							else
								character = characterSet['▟']
				else
					if (pixels[y][x + 1] === 0)
						if (pixels[y + 1][x] === 0)
							if (pixels[y + 1][x + 1] === 0)
								character = characterSet['▘']
							else
								character = characterSet['▚']
						else
							if (pixels[y + 1][x + 1] === 0)
								character = characterSet['▌']
							else
								character = characterSet['▙']
					else
						if (pixels[y + 1][x] === 0)
							if (pixels[y + 1][x + 1] === 0)
								character = characterSet['▀']
							else
								character = characterSet['▜']
						else
							if (pixels[y + 1][x + 1] === 0)
								character = characterSet['▛']
							else
								character = characterSet['█']

			pixelsScaled[y/2][x/2] = character
		}
	}

	return pixelsScaled
		.map(row => `| ${row.join(joinCharacter)}|`)
		.join('\n')
}

export function render (
		{
			pixels = [],
			scale = 1
		} = {}
	) {

	if (scale === 1) {
		return stringifyPixels({pixels})
	}
	else if (scale === 0.5) {
		return createHighResolutionPixelString({pixels})
	}
}
