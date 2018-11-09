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
			'high-resolution': {
				default: false,
				alias: 'h',
				describe: 'Render image in high resolution (2x)',
				type: 'boolean',
			},
			'pixel-per-character': {
				default: 0.5,
				choose: [0.5, 1, 2, 4, 8],
				alias: 'p',
				describe: 'Number of pixel to render per character',
				type: 'boolean',
			},
			'scale': {
				default: 1,
				alias: 's',
				describe: 'Scale rendering of image by the specified factor',
				type: 'number',
			},
			'colorize': {
				default: true,
				alias: 'c',
				describe: 'Render the image in color (turned of in non TTYs)',
				type: 'boolean',
			}
		})
		.argv

	const png = new Png(fs.readFileSync(argv._[0]))

	png.decode(function (pixels) {

		pixels = new Array(png.height)
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

		const options = {
			highResolution: argv.highResolution,
			scale: argv.scale,
			colorize: process.stdout.isTTY ? argv.colorize : false,
			pixels,
		}

		console.log(render(options))
	})
}
