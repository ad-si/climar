import {rasterize} from '../source/index.js'

console.log(rasterize({
	shapes: [
		{
			type: 'circle',
			radius: 2,
			center: {
				x: 5,
				y: 5
			}
		}
	],
	viewport: {
		height: 10,
		width: 10
	}
}))

console.log(rasterize())
