#! /usr/bin/env babel-node

import fs from 'fs'
import yargs from 'yargs'
import Png from 'png-js'

import {render} from './climar'
import rgbaToNumber from './rgbaToNumber'


var argv = yargs
	.demand(1)
	.argv

var png = new Png(fs.readFileSync(argv._[0]))

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
