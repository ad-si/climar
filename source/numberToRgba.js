export default function (number) {

	number = Math.floor(number)

	return {
		r: number >> 24 & 255,
		g: number >> 16 & 255,
		b: number >> 8  & 255,
		a: number       & 255
	}
}
