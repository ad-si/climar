import Canvas from 'drawille'
import isEven from 'is-even'

export default function (
		{
			pixels = [],
			style = 'wide'
		} = {}
	) {

	const width = pixels[0].length
	const height = pixels.length
	// const pixelsScaled = new Array(height / 2)
	// 	.fill()
	// 	.map(row => new Array(width / 2).fill(0))

	const canvas = new Canvas(width, height)

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (pixels[y][x])
				canvas.set(x, y)
		}
	}

	// return pixelsScaled
	// 	.map(row => `| ${row.join(joinCharacter)}|`)
	// 	.join('\n')
}
