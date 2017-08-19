var imported = document.createElement('script');
imported.src = 'SpriteController.js';
document.head.appendChild(imported);

window.setTimeout(window.onload, 1000);

var frame = 0;

window.onload = function()
{
  createSpriteSet(2, 0);
  canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
  initSprite(0, 200, 200, 20, 20); //Initialize Player
  initSprite(1, 0, 560, 800, 40); //Initialize ground

	var framesPerSecond = 60;
	setInterval(function(){
		drawEverything();
    gravity();
	}, 1000/framesPerSecond);

  setInterval(function(){
    fps();
  }, 1000);
}

function gravity()
{
  FutureY[0] = ******
  if (downCollide())
  {
    
  }
}

function fps()
{
  if (frame % 60 == 0)
  {
    console.log("Stable");
  }
  else
  {
    console.log("DROPPED FRAME");
    frame = 0;
  }
}
