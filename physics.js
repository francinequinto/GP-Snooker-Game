const redBalls = [];
const colouredBalls = [];
let cueBall;
let blueBall;
let greenBall;
let brownBall;
let yellowBall;
let pinkBall;
let blackBall;
let cueStick;

let cueStickPower = 0; // Tracks power of the cue stick
let isCharging = false; // Tracks whether the user is charging
const maxPower = 1.5; // Max force applied to the cue ball
const powerIncrement = 0.005; //how fast the power builds up

function drawTable() 
{
    var tableHeight = 600;
    var tableWidth = 300;

    const centerX = width / 2;
    const centerY = height / 2;
    const cornerRadius = 25; // Radius for rounding the corners

    // Draw the table with rounded corners
    rectMode(CENTER);
    fill(51, 0, 0); // Dark brown color for the table
    rect(centerX, centerY, tableHeight + 30, tableWidth + 30, cornerRadius); // Outer border with rounded corners
    fill(0, 100, 0); // Green color for the playing surface
    rect(centerX, centerY, tableHeight, tableWidth, cornerRadius); // Inner playing surface

    const cushionThickness = 1;
    noStroke();
    fill(255);

    // D zone
    World.add(world, Bodies.rectangle(centerX - tableWidth / 2, centerY, cushionThickness, tableHeight, { isStatic: true }));
    rect(centerX - tableWidth / 2, centerY, cushionThickness, tableHeight / 2);

    const semiCircleX = (centerX - tableWidth / 2) + cushionThickness;
    const semiCircleY = centerY;
    const dZoneRadius = 95;

    stroke(255);
    strokeWeight(1);
    noFill();
    arc(semiCircleX, semiCircleY, dZoneRadius, dZoneRadius, HALF_PI, -HALF_PI);

    // Pockets 
    strokeWeight(0.5);
    fill(0);  
    ellipse(centerX - 300, centerY - 150, 12.5); // Top left
    ellipse(centerX + 300, centerY - 150, 12.5); // Top right
    ellipse(centerX - 300, centerY + 150, 12.5); // Bottom left
    ellipse(centerX + 300, centerY + 150, 12.5); // Bottom right
    ellipse(centerX, centerY - 150, 12.5); // Middle top
    ellipse(centerX, centerY + 150, 12.5); // Middle bottom
}
///////////////////////////////////////////////////////////////////

function setupCueBall()
{
    tableHeight = 600;
    tableWidth = 300;

    const centerX = width/2;
    const centerY = height/2;

    const ballRadius = tableWidth/36;
    const cueBallX = centerX - (tableWidth/2) - 18;
    const cueBallY = centerY + 10;

    // cue ball
    cueBall = Bodies.circle(cueBallX, cueBallY, ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, cueBall);
    fill(255)
    noStroke();
    ellipse(cueBall.position.x, cueBall.position.y, ballRadius);


    return cueBall;
}
///////////////////////////////////////////////////////////////////

function setupRedBalls()
{
    tableHeight = 600;
    tableWidth = 300;

    const centerX = width/2;
    const centerY = height/2;
    const dZoneRadius = 95;

    const ballRadius = tableWidth/36;
    const offset = ballRadius; //space between balls

    let count = 0;
    for (let row = 0; row < 5; row++) { // Pyramid of 5 rows
        for (let col = 0; col <= row; col++) {
            const x = (centerX + 100) + (row * offset);
            const y = centerY - (row * offset) / 2 + (col * offset);

            const redBall = Bodies.circle(x, y, ballRadius, {
                restitution: 0.9,
                friction: 0.01,
                density: 0.01
            });

            redBalls.push(redBall);
            World.add(world, redBall); 
            fill(255, 0, 0)
            noStroke();
            ellipse(x, y, ballRadius);

            count++;
            if (count >= 16) break; //stop after 16 balls
        }
    }
}
///////////////////////////////////////////////////////////////////

function setupColouredBalls()
{
    tableHeight = 600;
    tableWidth = 300;

    const centerX = width/2;
    const centerY = height/2;
    const dZoneRadius = 95;
    const ballRadius = tableWidth/36;

    //blue ball
    blueBall = Bodies.circle(centerX, centerY, ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, blueBall);
    fill(0, 0, 200);
    noStroke();
    ellipse(blueBall.position.x, blueBall.position.y, ballRadius);

    //green ball
    const cushionThickness = 1;
    const semiCircleX = (centerX - tableWidth/2) + cushionThickness;
    const semiCircleY = centerY;

    greenBall = Bodies.circle(semiCircleX, (semiCircleY - dZoneRadius/2), ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, greenBall);
    fill(0, 225, 0);
    noStroke();
    ellipse(greenBall.position.x, greenBall.position.y, ballRadius);

    //brown ball
    brownBall = Bodies.circle(semiCircleX, semiCircleY, ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, brownBall);
    fill(102, 51, 0);
    noStroke();
    ellipse(brownBall.position.x, brownBall.position.y, ballRadius);

    //yellow ball
     yellowBall = Bodies.circle(semiCircleX, (semiCircleY + dZoneRadius/2), ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, yellowBall);
    fill(255, 255, 51);
    noStroke();
    ellipse(yellowBall.position.x, yellowBall.position.y, ballRadius);

    //pink ball
    pinkBall = Bodies.circle((centerX + 90), centerY, ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, pinkBall);
    fill(255, 204, 229);
    noStroke();
    ellipse(pinkBall.position.x, pinkBall.position.y, ballRadius);

    //black ball
    blackBall = Bodies.circle((centerX + 250), centerY, ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, blackBall);
    fill(0);
    noStroke();
    ellipse(blackBall.position.x, blackBall.position.y, ballRadius);

    return blueBall, greenBall, brownBall, yellowBall, blackBall;
}
///////////////////////////////////////////////////////////////////

function setupCueStick()
{

    let cueStickLength = 120;
    let cueStickThickness = 7;

    // Position of the cue stick relative to the cue ball
    const cueStickX = cueBall.position.x - cueStickLength / 2;
    const cueStickY = cueBall.position.y;

    // Initialize cue stick as a rectangle body
    if (!cueStick) {
        cueStick = Bodies.rectangle(cueStickX, cueStickY, cueStickLength, cueStickThickness, {
            isStatic: false, // Cue stick starts as static
            angle: 0 // Initially aligned horizontally
        });

        World.add(world, cueStick);
    }

    // Rotate the cue stick around the cue ball based on mouse position
    const dx = mouseX - cueBall.position.x;
    const dy = mouseY - cueBall.position.y;
    const angle = Math.atan2(dy, dx);

    // Position the cue stick dynamically based on the power
    const stickDistance = 75 - cueStickPower * 50; // Adjust distance based on power
    Body.setPosition(cueStick, {
        x: cueBall.position.x - Math.cos(angle) * stickDistance,
        y: cueBall.position.y - Math.sin(angle) * stickDistance,
    });

    Body.setAngle(cueStick, angle);

    // Handle power charging and releasing
    if (isCharging) {
        cueStickPower = Math.min(cueStickPower + powerIncrement, maxPower); // Increment power
    }

    // brown base
    fill(139, 69, 19);
    push();
    translate(cueStick.position.x - 8, cueStick.position.y);
    rotate(cueStick.angle);
    rectMode(CENTER);
    rect(0, 0, cueStickLength, cueStickThickness);
    pop();

    // black base
    fill(0);
    push();
    translate(
        cueStick.position.x - Math.cos(cueStick.angle) * (cueStickLength / 2),
        cueStick.position.y - Math.sin(cueStick.angle) * (cueStickLength / 2)
    );
    rotate(cueStick.angle);
    rectMode(CENTER);
    rect(0, 0, cueStickLength - 80, cueStickThickness);
    pop();

    // power meter
    fill(255, 0, 0, 150);
    push();
    translate(cueStick.position.x, cueStick.position.y);
    rotate(cueStick.angle);
    rectMode(CENTER);
    rect(0, 0, cueStickLength * cueStickPower * 1, cueStickThickness / 2);
    pop();
}
///////////////////////////////////////////////////////////////////

function strikeCueBall() {
    // Check if cue stick and cue ball are in close range
    const dx = cueBall.position.x - cueStick.position.x;
    const dy = cueBall.position.y - cueStick.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 50) { // Adjust as needed for accuracy
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        const forceMagnitude = cueStickPower * 0.05; // Adjust for proper scaling
        const force = {
            x: (dx / magnitude) * forceMagnitude,
            y: (dy / magnitude) * forceMagnitude,
        };

        // Apply force to the cue ball
        Body.applyForce(cueBall, cueBall.position, force);
    }

    // Reset cue stick
    cueStickPower = 0;
    isCharging = false;
}
///////////////////////////////////////////////////////////////////   

function clearBalls() 
{
    for (let ball of redBalls) {
        World.remove(world, ball);
    }
    for (let ball of colouredBalls) {
        World.remove(world, ball);
    }
    redBalls.length = 0;
    colouredBalls.length = 0;
    
}
///////////////////////////////////////////////////////////////////

function startingPosition() //red balls in triangle
{
    clearBalls();
    console.log('starting position');

    tableHeight = 600;
    tableWidth = 300;

    const centerX = width/2;
    const centerY = height/2;
    const dZoneRadius = 95;

    const ballRadius = tableWidth/36;
    const offset = ballRadius; //space between balls

    //red balls
    let count = 0;
    for (let row = 0; row < 5; row++) { // Pyramid of 5 rows
        for (let col = 0; col <= row; col++) {
            const x = (centerX + 100) + (row * offset);
            const y = centerY - (row * offset) / 2 + (col * offset);

            const redBall = Bodies.circle(x, y, ballRadius, {
                restitution: 0.9,
                friction: 0.01,
                density: 0.01
            });

            redBalls.push(redBall);
            World.add(world, redBall); 
            fill(255, 0, 0)
            noStroke();
            ellipse(x, y, ballRadius);

            count++;
            if (count >= 16) break; //stop after 16 balls
        }
    }

    //coloured balls
    //blue ball
    blueBall = Bodies.circle(centerX, centerY, ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, blueBall);
    fill(0, 0, 200);
    noStroke();
    ellipse(blueBall.position.x, blueBall.position.y, ballRadius);

    //green ball
    const cushionThickness = 1;
    const semiCircleX = (centerX - tableWidth/2) + cushionThickness;
    const semiCircleY = centerY;

    greenBall = Bodies.circle(semiCircleX, (semiCircleY - dZoneRadius/2), ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, greenBall);
    fill(0, 225, 0);
    noStroke();
    ellipse(greenBall.position.x, greenBall.position.y, ballRadius);

    //brown ball
    brownBall = Bodies.circle(semiCircleX, semiCircleY, ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, brownBall);
    fill(102, 51, 0);
    noStroke();
    ellipse(brownBall.position.x, brownBall.position.y, ballRadius);

    //yellow ball
     yellowBall = Bodies.circle(semiCircleX, (semiCircleY + dZoneRadius/2), ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, greenBall);
    fill(255, 255, 51);
    noStroke();
    ellipse(yellowBall.position.x, yellowBall.position.y, ballRadius);

    //pink ball
    pinkBall = Bodies.circle((centerX + 90), centerY, ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, pinkBall);
    fill(255, 204, 229);
    noStroke();
    ellipse(pinkBall.position.x, pinkBall.position.y, ballRadius);

    //black ball
    blackBall = Bodies.circle((centerX + 250), centerY, ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, blackBall);
    fill(0);
    noStroke();
    ellipse(blackBall.position.x, blackBall.position.y, ballRadius);

    return blueBall, greenBall, brownBall, yellowBall, blackBall;
}
///////////////////////////////////////////////////////////////////

function randomRedBalls() 
{
    clearBalls();
    console.log('random red');

    tableHeight = 600;
    tableWidth = 300;

    const centerX = width/2;
    const centerY = height/2;
    const dZoneRadius = 95;

    const ballRadius = tableWidth/36;
    const offset = ballRadius; //space between balls
    const tableLHS = centerX - tableWidth / 2;
    const tableRHS = centerX + tableWidth / 2;
    const tableTop = centerY - tableHeight / 2;
    const tableBottom = centerY + tableHeight / 2;

    //red balls
    let count = 0;
    for (let row = 0; row < 5; row++) { // Pyramid of 5 rows
        for (let col = 0; col <= row; col++) {
            const x = random(tableLHS + ballRadius, tableRHS - ballRadius);
            const y = random(tableTop + ballRadius, tableBottom - ballRadius);

            const redBall = Bodies.circle(x, y, ballRadius, {
                restitution: 0.9,
                friction: 0.01,
                density: 0.01
            });

            redBalls.push(redBall);
            World.add(world, redBall); 
            fill(255, 0, 0)
            noStroke();
            ellipse(x, y, ballRadius);

            count++;
            if (count >= 16) break; //stop after 16 balls
        }
    }

    //coloured balls
    //blue ball
    blueBall = Bodies.circle(centerX, centerY, ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, blueBall);
    fill(0, 0, 200);
    noStroke();
    ellipse(blueBall.position.x, blueBall.position.y, ballRadius);

    //green ball
    const cushionThickness = 1;
    const semiCircleX = (centerX - tableWidth/2) + cushionThickness;
    const semiCircleY = centerY;

    greenBall = Bodies.circle(semiCircleX, (semiCircleY - dZoneRadius/2), ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, greenBall);
    fill(0, 225, 0);
    noStroke();
    ellipse(greenBall.position.x, greenBall.position.y, ballRadius);

    //brown ball
    brownBall = Bodies.circle(semiCircleX, semiCircleY, ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, brownBall);
    fill(102, 51, 0);
    noStroke();
    ellipse(brownBall.position.x, brownBall.position.y, ballRadius);

    //yellow ball
     yellowBall = Bodies.circle(semiCircleX, (semiCircleY + dZoneRadius/2), ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, yellowBall);
    fill(255, 255, 51);
    noStroke();
    ellipse(yellowBall.position.x, yellowBall.position.y, ballRadius);

    //pink ball
    pinkBall = Bodies.circle((centerX + 90), centerY, ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, pinkBall);
    fill(255, 204, 229);
    noStroke();
    ellipse(pinkBall.position.x, pinkBall.position.y, ballRadius);

    //black ball
    blackBall = Bodies.circle((centerX + 250), centerY, ballRadius, {
        restitution: 0.9, // bounciness
        friction: 0.01,   // minimal friction
        density: 0.01     // lightweight
    });

    World.add(world, blackBall);
    fill(0);
    noStroke();
    ellipse(blackBall.position.x, blackBall.position.y, ballRadius);

    return blueBall, greenBall, brownBall, yellowBall, blackBall;
}

function randomColouredBalls()
{
    clearBalls();

    const ballRadius = tableWidth / 36;
    const tableLHS = width / 2 - tableWidth / 2;
    const tableRHS = width / 2 + tableWidth / 2;
    const tableTop = height / 2 - tableHeight / 2;
    const tableBottom = height / 2 + tableHeight / 2;

    const balls = [blueBall, greenBall, brownBall, yellowBall, pinkBall, blackBall];

    balls.forEach(ball => {
        const x = random(tableLHS + ballRadius, tableRHS - ballRadius);
        const y = random(tableTop + ballRadius, tableBottom - ballRadius);
        Body.setPosition(ball, { x, y });
    });
}