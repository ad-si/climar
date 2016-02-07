import colors from 'ansi-256-colors'

import numberToRgba from './numberToRgba'
import alphaToBlockElement from './alphaToBlockElement'
import highResolutionRenderer from './highResolutionRenderer'


function mute (string, colorize) {
	return (colorize ? colors.fg.bright[0] : '') +
		string +
		(colorize ? colors.reset : '')
}

function labelize (number, colorize) {
	let labelString = '',
		numberString = String(number),
		onesDigitString = numberString
			.split('')
			.pop()

	if (onesDigitString === '0')
		labelString +=
			(colorize ? colors.fg.standard[2] : '') +
			numberString[0]
	else
		labelString +=
			(colorize ? colors.fg.bright[0] : '') +
			onesDigitString

	return labelString +
		(colorize ? colors.reset : '')
}

function stringifyPixels (
		{
			pixels = [],
			printLabels = true,
			colorize = true
		} = {}
	) {

	let outputString = '',
		offset = '',
		xLabels = '',
		topBorder = '',
		bottomBorder = '',
		imageString = ''


	if (printLabels) {
		offset = '   '

		xLabels = ' ' + pixels
			.map((row, index) => labelize(index, colorize))
			.join(' ')  + '\n'
	}

	topBorder = mute(
		' ' + pixels
		.map(() => '__')
		.join('') + '\n'
		, colorize
	)

	bottomBorder = mute(
		' ' + pixels
		.map(() => '--')
		.join('')  + '\n'
		, colorize
	)

	imageString = pixels
		.map((row, y) => {
			let label = '',
				pixelString = ''

			if (printLabels)
				label = labelize(y, colorize) + '  '

			pixelString = row
				.map(pixelColor => alphaToBlockElement(
						numberToRgba(pixelColor).a
					)
				)
				.join('')

			return label +
				mute('|', colorize) +
				pixelString +
				mute('|', colorize)
		})
		.join('\n') + '\n'


	return offset + xLabels +
		offset + topBorder +
		imageString +
		offset + bottomBorder
}



export function render (
		{
			pixels = [],
			scale = 1,
			colorize = true
		} = {}
	) {

	if (scale === 1) {
		return stringifyPixels({
			pixels,
			colorize
		})
	}
	else if (scale === 0.5) {
		return highResolutionRenderer({pixels})
	}
}
