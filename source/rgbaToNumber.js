export default function (redValue, greenValue, blueValue, alphaValue) {

	return (redValue << 24) +
		(greenValue << 16) +
		(blueValue << 8) +
		alphaValue
}
