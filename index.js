import {rasterize} from '../source/index.js'
import {render} from '../test/cliRenderer.js'


let options = {
	shapes: [
		{
			type: 'circle',
			radius: 2,
			center: {
				x: 5,
				y: 5
			}
		},
		{
			type: 'rectangle',
			width: 4,
			height: 4,
			topLeftCorner: {
				x: 2,
				y: 2
			},
			color: 0x00ff00
		},
		{
			type: 'rectangle',
			width: 5,
			height: 5,
			topLeftCorner: {
				x: 7,
				y: 7
			},
			color: 0x00ff00
		},
		{
			type: 'rectangle',
			width: 15,
			height: 1,
			topLeftCorner: {
				x: 2,
				y: 15
			},
			color: 0x00ff00
		}
	],
	viewport: {
		height: 20,
		width: 20
	}
}


console.time('test')

let pixels = rasterize(options)

console.timeEnd('test')


console.log(render({
	pixels,
	scale: 0.5
}))
