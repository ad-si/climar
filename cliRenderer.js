let isEven = require('is-even')

function stringifyPixels (pixels) {

	return pixels
		.map(row =>
			'| ' +
			row
				.map(pixel => (pixel === 0) ? '  ' : '█ ')
				.join('') +
			'|'
		)
		.join('\n')
}

export function render (
		{
			pixels = [],
			scale = 1
		} = {}
	) {

	if (scale === 1) {
		return stringifyPixels(pixels)
	}
}
