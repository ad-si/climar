import isEven from 'is-even'

export default function (
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
