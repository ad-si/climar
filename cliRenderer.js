let isEven = require('is-even')

export function render (
		{
			pixels = [],
			scale = 1
		} = {}
	) {

	if (scale === 1) {
		return pixels
			.map(row => {
				return '| ' +
				row
				.map(pixel => {
					return (pixel === 0) ? '  ' : '█ '
				})
				.join('') +
				'|'
			})
			.join('\n')
	}
}
