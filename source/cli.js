#! /usr/bin/env babel-node

import fs from 'fs'
import yargs from 'yargs'
import Png from 'png-js'

import {render} from './climar'
import rgbaToNumber from './rgbaToNumber'


export default function (cliArguments) {

	yargs.parse(cliArguments)

	const argv = yargs
		.usage('Usage: $0 [options] <file-to-render>')
		.demand(1, 'A file to be rendered must be specified!')
		.options({
			'scale': {
				default: 1,
				choices: [0.5, 1],
				alias: 's',
				describe: 'Scale the size of a pixel',
				type: 'number',
			},
			'colorize': {
				default: true,
				alias: 'c',
				describe: 'Render the image in color (turned of in TTYs)',
				type: 'boolean',
			}
		})
		.argv

	const png = new Png(fs.readFileSync(argv._[0]))

	png.decode(function (pixels) {

		var options = {
			scale: argv.scale,
			colorize: process.stdout.isTTY ? argv.colorize : false,
			pixels: new Array(png.height)
				.fill()
				.map(row => new Array(png.width).fill(0))
				.map((row, y) =>
					row.map((element, x) => {
						let pixelStart = ((y * png.width) + x) * 4

						return rgbaToNumber(
							pixels[pixelStart],
							pixels[pixelStart + 1],
							pixels[pixelStart + 2],
							pixels[pixelStart + 3]
						)
					})
				)
		}

		console.log(render(options))
	})
}
