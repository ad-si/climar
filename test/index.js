import {render} from '../climar'
import mocha from 'mocha'
import {expect} from 'chai'


mocha.describe('Climar', () => {

	it('Renders a 4x4 black & white image', () => {
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
})
