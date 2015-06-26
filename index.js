import {rasterize} from '../source/index.js'

console.time('test')

let pixels = rasterize({
	shapes: [
		{
			type: 'rectangle',
			width: 4,
			height: 4,
			topLeftCorner: {
				x: 2,
				y: 2
			},
			color: 0x00ff00
		}
	],
	viewport: {
		height: 20,
		width: 20
	}
})

console.timeEnd('test')

console.log(
	pixels
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
)
