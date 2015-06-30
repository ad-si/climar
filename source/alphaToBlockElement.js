export default function (alphaValue) {

	if (alphaValue === 0xff)
		return '█▌'

	else if (alphaValue === 0)
		return '  '

	else if (alphaValue > 0xaa)
		return '▓▌'

	else if (alphaValue > 0x55)
		return '▒▌'

	else
		return '░▌'
}
