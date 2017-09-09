var sprite = [0];

function newSprite(x, y, width, height, collides, gravity, enemy, color)
{
  console.log("Sprite " + (sprite.length) + " created.");
  var newSprite = {
    xPos: x,
    yPos: y,
    width: width,
    height: height,
    xFuture: x,
    yFuture: y,
    topEdge: null,
    bottomEdge: null,
    leftEdge: null,
    rightEdge: null,
    collides: collides,
    gravityEnabled: gravity,
    horizontalVelocity: 0,
    verticalVelocity: 0,
    inJump: false,
    enemy: enemy,
    color: color };
  sprite.push(newSprite);
}

function drawEverything()
{
  colorRect(0,0,canvas.width,canvas.height, 'white');

    for (var i = sprite.length - 1; i >= 1; i--)
    {
      colorRect(sprite[i].xPos, sprite[i].yPos, sprite[i].width, sprite[i].height, sprite[i].color);
    }
}

function moveEverything()
{
  applyGravity();
  for (var i = 1; i < sprite.length; i++)
  {
    collision();
    sprite[i].xPos = sprite[i].xFuture;
    sprite[i].yPos = sprite[i].yFuture;
  }
}

function calculateFuturePosition()
{
  for (var i = 1; i < sprite.length; i++)
  {
    sprite[i].xFuture = sprite[i].xPos + sprite[i].horizontalVelocity;
    if (sprite[i].gravityEnabled)
    {
      sprite[i].yFuture = sprite[i].yPos + sprite[i].verticalVelocity;
    }
  }
}

function calculateEdges()
{
  calculateFuturePosition();
  for (var i = 1; i < sprite.length; i++)
  {
    //down edge
    sprite[i].bottomEdge = sprite[i].height + sprite[i].yFuture;
    //top edge
    sprite[i].topEdge = sprite[i].yFuture;
    // left edge
    sprite[i].leftEdge = sprite[i].xFuture;
    //right edge
    sprite[i].rightEdge = sprite[i].width + sprite[i].xFuture;
  }
}

function collision()
{
  calculateEdges();

  for (var p = 1; p < sprite.length; p++)
  {
    if (sprite[p].collides) //only do a collision check if the sprite actually collides.
    {
      for (var i = 1; i < sprite.length; i++)
      {
        if (p != i && sprite[i].collides) //Prevents sprite being checked from colliding with itself and makes sure both sprites collide before changing.
        {
          if (((sprite[p].rightEdge >= sprite[i].leftEdge && sprite[p].rightEdge <= sprite[i].rightEdge)
           || (sprite[p].leftEdge <= sprite[i].rightEdge && sprite[p].leftEdge >= sprite[i].leftEdge))
           && sprite[p].bottomEdge >= sprite[i].topEdge
           && ((sprite[p].bottomEdge - sprite[p].verticalVelocity) < (sprite[i].topEdge - sprite[i].verticalVelocity)))  // downward collision
          {
            sprite[p].verticalVelocity = 0;//sprite[p].bottomEdge - sprite[i].topEdge;
            sprite[p].inJump = false;
            if (sprite[i].enemy)
            {
              death();
            }
          }
          if (((sprite[p].rightEdge >= sprite[i].leftEdge && sprite[p].rightEdge <= sprite[i].rightEdge)
           || (sprite[p].leftEdge <= sprite[i].rightEdge && sprite[p].leftEdge >= sprite[i].leftEdge))
           && sprite[p].topEdge <= sprite[i].bottomEdge
           && ((sprite[p].topEdge - sprite[p].verticalVelocity) > (sprite[i].bottomEdge - sprite[i].verticalVelocity)))  // downward collision
          {
            sprite[p].verticalVelocity = 0;
            if (sprite[i].enemy)
            {
              death();
            }
          }
          if (((sprite[p].bottomEdge >= sprite[i].topEdge && sprite[p].bottomEdge <= sprite[i].bottomEdge)
           || (sprite[p].topEdge <= sprite[i].bottomEdge && sprite[p].topEdge >= sprite[i].topEdge))
           && sprite[p].rightEdge >= sprite[i].leftEdge
           && ((sprite[p].rightEdge - sprite[p].horizontalVelocity) < (sprite[i].leftEdge - sprite[i].horizontalVelocity))) // right collision
          {
            //sprite[p].horizontalVelocity = 0;
            stop(p);
            if (sprite[i].enemy)
            {
              death();
            }
          }
          if (((sprite[p].bottomEdge >= sprite[i].topEdge && sprite[p].bottomEdge <= sprite[i].bottomEdge)
           || (sprite[p].topEdge <= sprite[i].bottomEdge && sprite[p].topEdge >= sprite[i].topEdge))
           && sprite[p].leftEdge <= sprite[i].rightEdge
           && ((sprite[p].leftEdge - sprite[p].horizontalVelocity) > (sprite[i].rightEdge - sprite[i].horizontalVelocity))) // right collision
          {
            //sprite[p].horizontalVelocity = 0;
            stop(p);
            if (sprite[i].enemy)
            {
              death();
            }
          }
          if (p == 1 && sprite[p].yPos > 900 )
          {
            death();
          }
          if (p == 1 && sprite[p].xPos <= 0)
          {
            sprite[p].horizontalVelocity = 0;
          }
        }
      }
    }
  }
  calculateFuturePosition();
}

function applyGravity()
{
  for (var i = 1; i < sprite.length; i++)
  {
    if (sprite[i].gravityEnabled && sprite[i].verticalVelocity < 10)
    {
      sprite[i].verticalVelocity++;
    }
  }
}

function moveRight(player)
{
  if (sprite[player].xPos <= 150)
  {
    sprite[player].horizontalVelocity = 5;
  }
  else
  {
    sprite[player].horizontalVelocity = 0;
    for (var i = 1; i < sprite.length; i++)
    {
      if (player != i)
      {
        sprite[i].horizontalVelocity = -5
      }
    }
  }
}

function moveLeft(player)
{
  if (sprite[player].xPos >= 150)
  {
    sprite[player].horizontalVelocity = -5;
  }
  else
  {
    sprite[player].horizontalVelocity = 0;
    for (var i = 1; i < sprite.length; i++)
    {
      if (player != i)
      {
        sprite[i].horizontalVelocity = 5
      }
    }
  }
}

function stop(player)
{
  if (sprite[player].horizontalVelocity != 0)
  {
    sprite[player].horizontalVelocity = 0;
  }
  else
  {
    {
      for (var i = 1; i < sprite.length; i++)
      {
        if (player != i)
        {
          sprite[i].horizontalVeocity = 0;
          if (sprite[i].horizontalVelocity < 0)
          {
            sprite[i].horizontalVelocity = 0;//+= 5;
          }
          else
          {
            sprite[i].horizontalVelocity = 0;//-= 5;
          }
        }
      }
    }
  }
}

function jump(player)
{
  if (!sprite[player].inJump)
  {
    sprite[player].verticalVelocity = -25;
    sprite[player].inJump = true;
  }
}

function stopJump(player)
{
  if (sprite[player].inJump && sprite[player].verticalVelocity < 0)
  {
    sprite[player].verticalVelocity = 0;
  }
}

function colorRect(leftX, topY, width, height, drawColor)
{
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}

function death()
{
  swal({
    title: "You Died",
    text: "Get ready to try again!",
    type: "error",
    timer: 3000,
    showConfirmButton: false
  },
  function(){
    location.reload();
  });
}
