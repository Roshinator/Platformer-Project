var SpriteX;
var SpriteY;
var SpriteWidth;
var SpriteHeight;
var FutureX;
var FutureY;
var SpriteImgLocation;
var spriteType;
var spriteCount;

/*Creates the variables necessary for controlling the specified number of sprites.
Sprite 0 is player. Higher numbers are drawn last. Type 0 is rectangles. Type 1 is images.*/
function createSpriteSet(n, type)
{
  SpriteX = [n];
  SpriteY = [n];
  FutureX = [n];
  FutureY = [n];
  SpriteWidth = [n];
  SpriteHeight = [n];
  SpriteImgLocation = [n];
  for (var i = 0; i < n; i++)
  {
    SpriteX[i] = null;
    SpriteY[i] = null;
    SpriteWidth[i] = null;
    SpriteHeight[i] = null;
    SpriteImgLocation[i] = null;
    console.log("Sprite " + i + " created.");
    spriteCount = i;
  }
  spriteType = type;
}

function initSprite(id, x, y, width, height)
{
	SpriteX[id] = x;
	SpriteY[id] = y;
	SpriteWidth[id] = width;
	SpriteHeight[id] = height;
  console.log("Sprite " + id + " activated.");
}

function drawEverything()
{
  colorRect(0,0,canvas.width,canvas.height, 'black');

  if (spriteType == 0)
  {
    for (var i = spriteCount; i >= 0; i--)
    {
      colorRect(SpriteX[i], SpriteY[i], SpriteWidth[i], SpriteHeight[i], 'white');
    }
  }
  else if (spriteType == 1) //use later to substitute images in
  {
    for (var i = spriteCount; i >= 0; i--)
    {
      //canvasContext.drawImage(SpriteImgLocation, SpriteX[i], SpriteY[i], SpriteWidth[i], SpriteHeight[i]);
    }
  }
}

function downCollide()
{
  var bottomEdge = SpriteY[0] + SpriteHeight[0] + FutureY[0];
}

function leftCollide()
{
  var leftEdge = SpriteX[0] + FutureX[0];
}

function upCollide()
{
  var topEdge = SpriteY[0] + FutureY[0];
}

function rightCollide()
{
  var rightEdge = SpriteX[0] + SpriteWidth[0] + FutureX[0];
}

function colorRect(leftX, topY, width, height, drawColor)
{
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}
