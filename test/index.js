import {expect} from 'chai'

import {render} from '../source/climar'


describe('Climar', () => {
	it('Renders a 4x4 black & transparent image', () => {
		let pixels = [
			[0xffffffff, 0, 0, 0],
			[0, 0xffffffff, 0, 0],
			[0, 0, 0xffffffff, 0],
			[0, 0, 0, 0xffffffff]
		]

		expect(render({
			pixels,
			scale: 1,
			colorize: false
		}))
		.to.equal(
			'    0 1 2 3\n' +
			'    ________\n' +
			'0  |█▌      |\n' +
			'1  |  █▌    |\n' +
			'2  |    █▌  |\n' +
			'3  |      █▌|\n' +
			'    --------\n'
		)
	})

	it('Renders a 4x4 black, transparent & semi-transparent image', () => {
		let pixels = [
			[0xffffffff, 0, 0, 0],
			[0, 0xffffffbb, 0, 0],
			[0, 0, 0xffffff66, 0],
			[0, 0, 0, 0xffffffff11]
		]

		expect(render({
			pixels,
			scale: 1,
			colorize: false
		}))
		.to.equal(
			'    0 1 2 3\n' +
			'    ________\n' +
			'0  |█▌      |\n' +
			'1  |  ▓▓    |\n' +
			'2  |    ▒▒  |\n' +
			'3  |      ░░|\n' +
			'    --------\n'
		)
	})
})
