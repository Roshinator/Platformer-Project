var imported = document.createElement('script');
imported.src = 'SpriteControllerRevamped.js';
document.head.appendChild(imported);

window.setTimeout(window.onload, 1000);

var frame = 0;

window.onload = function()
{
  newSprite(140, 000, 20, 20, true, true, false, 'green');// player id: 1
  newSprite(0, 560, 1356, 40, true, false, false, 'brown');// ground id: 2
  newSprite(1598, 560, 802, 40, true, false, false, 'brown');
  newSprite(400, 500, 110, 60, true, false, false, 'brown');
  newSprite(600, 300, 500, 10, true, false, false, 'brown');
  newSprite(800, 200, 458, 30, true, false, false, 'brown');
  newSprite(1256, 700, 100, 15, true, false, false, 'brown');
  newSprite(1598, 323, 832, 38, true, false, false, 'brown');
  newSprite(0, 560, 1356, 40, true, false, false, 'brown');
  newSprite(Math.random() * 2400, Math.random() * 600, Math.random() * 240, Math.random() * 60, true, false, true, 'blue');

  canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
  canvas.width = window.innerWidth - 25;
  canvas.height = window.innerHeight - 25;

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

    window.addEventListener("resize",
      function(evt) {
        canvas.width = window.innerWidth - 25;
        canvas.height = window.innerHeight - 25;
      })
}
