/*
IN THE PROCESS OF BEING MIGRATED TO THE REVAMPED CONTROLLER.
*/

var SpriteX;
var SpriteY;
var SpriteWidth;
var SpriteHeight;
var FutureX;
var FutureY;
var SpriteImgLocation;
var spriteType;
var spriteCount;
var verticalVelocity = 0;
var horizontalVelocity = 0;
var enableGravity = true;
var SpriteTop;
var SpriteBottom;
var SpriteLeft;
var SpriteRight;

/*Creates the variables necessary for controlling the specified number of sprites.
Sprite 0 is player. Higher numbers are drawn last. Type 0 is rectangles. Type 1 is images.*/
function createSpriteSet(n, type)
{
  SpriteX = [n];
  SpriteY = [n];
  FutureX = [n];
  FutureY = [n];
  SpriteTop = [n];
  SpriteBottom = [n];
  SpriteLeft = [n];
  SpriteRight = [n];
  SpriteWidth = [n];
  SpriteHeight = [n];
  SpriteImgLocation = [n];
  for (var i = 0; i < n; i++)
  {
    SpriteX[i] = null;
    SpriteY[i] = null;
    SpriteWidth[i] = null;
    SpriteHeight[i] = null;
    SpriteTop[i] = null;
    SpriteBottom[i] = null;
    SpriteLeft[i] = null;
    SpriteRight[i] = null;
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
      colorRect(SpriteX[i], SpriteY[i], SpriteWidth[i], SpriteHeight[i], 'red');
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

function moveEverything()
{
  collision(0);

  for (var i = 0; i <= spriteCount; i++)
  {
    SpriteX[i] = FutureX[i];
    SpriteY[i] = FutureY[i];
  }
}

function calculateFuture()
{
  var ignoredCounter = 0;
  for (var i = 0; i <= spriteCount; i++)
  {
    FutureX[i] = SpriteX[i] + horizontalVelocity;
    if (ignoredSprites[ignoredCounter] != i)
    {
      FutureY[i] = SpriteY[i] + verticalVelocity;
    }
    else
    {
      ignoredCounter++;
    }
  }
}

function calculateZone()
{
  calculateFuture();
  for (var i = 0; i <= spriteCount; i++)
  {
    //down edge
    SpriteBottom[i] = SpriteY[i] + SpriteHeight[i] + FutureY[i];
    //top edge
    SpriteTop[i] = SpriteY[i] + FutureY[i];
    // left edge
    SpriteLeft[i] = SpriteX[i] + FutureX[i];
    //right edge
    SpriteRight[i] = SpriteX[i] + SpriteWidth[i] + FutureX[i];
  }
}

function collision(p)
{
  calculateZone();
  for (var i = 1; i <= spriteCount; i++)
  {
    if (((SpriteRight[p] >= SpriteLeft[i] && SpriteRight[p] <= SpriteRight[i])
     || (SpriteLeft[p] <= SpriteRight[i] && SpriteLeft[p] >= SpriteLeft[i]))
     && SpriteBottom[p] >= SpriteTop[i])  // downward collision
    {
      verticalVelocity -= SpriteBottom[p] - SpriteTop[i];
    }
    /*if (SpriteRight[p] >= SpriteLeft[i]
     && SpriteRight[p] >= SpriteLeft[i]
     && SpriteTop[p] <= SpriteBottom[i]) //upward collison
    {

    }
    if (SpriteBottom[p] >= SpriteTop[i]
     && SpriteTop[p] <= SpriteBottom[i]
     && SpriteRight[p] >= SpriteLeft[i]) // right collision
    {

    }
    if (SpriteBottom[p] >= SpriteTop[i]
     && SpriteTop[p] <= SpriteBottom[i]
     && SpriteLeft[p] <= SpriteRight[i]) // left collision
    {

    } */

    calculateFuture();
  }
}

function gravity()
{
  if (enableGravity == true && verticalVelocity < 10)
  {
    verticalVelocity++;
  }
}

function colorRect(leftX, topY, width, height, drawColor)
{
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}
