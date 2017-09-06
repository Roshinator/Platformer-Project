var imported = document.createElement('script');
imported.src = 'SpriteControllerRevamped.js';
document.head.appendChild(imported);

window.setTimeout(window.onload, 1000);

var frame = 0;

window.onload = function()
{
  newSprite(150, 000, 20, 20, true, true);// player id: 1
  newSprite(0, 560, 2400, 40, true, false);// ground id: 2
  newSprite(400, 500, 110, 60, true, false);
  newSprite(600, 300, 500, 10, true, false);

  canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 60;
	setInterval(function(){
    moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);

  window.addEventListener("keydown",
		function(evt) {
			if (evt.keyCode == 39)
      {
        //console.log("move right");
        moveRight(1);
      }

      else if (evt.keyCode == 37)
      {
        moveLeft(1);
        //console.log("move left");
      }

      else if (evt.keyCode == 38)
      {
        //console.log("jump");
        jump(1);
      }
		})

    window.addEventListener("keyup",
  		function(evt) {
  			if (evt.keyCode == 39)
        {
          //console.log("move right");
          stop(1);
        }

        else if (evt.keyCode == 37)
        {
          //console.log("move left");
          stop(1);
        }

        else if (evt.keyCode == 38)
        {
          stopJump(1);
        }
  		})
    window.addEventListener("keydown",
  		function(evt) {
    		if (evt.keyCode == 68)
        {
          death();
        }
      })
}
