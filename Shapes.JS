class Shapes {
	constructor() {

	}
	function colorRect(leftX, topY, width, height, drawColor)
	{
		canvasContext.fillStyle = drawColor;
		canvasContext.fillRect(leftX, topY, width, height);
	}

	function colorCircle(centerX, centerY, radius, drawColor)
	{
		canvasContext.fillStyle = drawColor;
		canvasContext.beginPath();
		canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
		canvasContext.fill();
	}
}
