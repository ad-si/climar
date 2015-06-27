import {render} from '../climar'

let pixels = [
	[0xffffffff, 0, 0, 0],
	[0, 0xffffffff, 0, 0],
	[0, 0, 0xffffffff, 0],
	[0, 0, 0, 0xffffffff]
]

console.log(render({
	pixels,
	scale: 1
}))
