var canvas;
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Runner = Matter.Runner;

let runner; 

function setup()
{
    canvas = createCanvas(1000, 600);

    engine = Engine.create();
    world = engine.world;

    runner = Runner.create();
    Runner.run(runner, engine);
}

function draw()
{
    Engine.update(engine);

    background(153,204,255);
    drawTable();
    setupCueBall();
    setupRedBalls();
    setupColouredBalls();
    setupCueStick();
}

function keyPressed()
{
    if (keyCode === 32) //spacebar pressed
        {
            isCharging = true;
        }
    if (keyCode === 48) //0 pressed - clear balls
        {
            clearBalls();
        }
    if (keyCode === 49) //1 pressed - balls go back to starting positions
        {
            startingPosition();
        }
    if (keyCode === 50) //2 pressed - red balls go to random positions
        {
            randomRedBalls();
        }
    if (keyCode == 51) //3 pressed - all balls (Except cue) go to random positions
        {
            randomColouredBalls();
            randomRedBalls();
        }
}

function keyReleased() 
{
    if (keyCode === 32) //if spacebar released
        {
            strikeCueBall();
        }
}

// collision detection
Matter.Events.on(Engine, 'collisionStart', function(event) {
    var pairs = event.pairs;
    pairs.forEach(function(pair) {
        console.log('Collision detected between:', pair.bodyA, 'and', pair.bodyB);
    });
});



