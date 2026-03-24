/*
REPLACE THIS WITH A NICE PROFESSIONAL HEADER
 CONTAINING:
 DATE, YOUR NAME, ORGANIZATION
 COPYRIGHT
SUMMARY OF THIS CODE
*/

// =====================================================================
// you have been provided some working code to get you started
// it is your job to add functionality as described in the assignment
// =====================================================================
// --- 1. SETUP & SELECTION ---
// We grab the canvas from the HTML so JS can "see" it
const canvas = document.getElementById('clockCanvas');

// The 'context' is the actual API we use to draw (think of it as the toolbox)
const ctx = canvas.getContext('2d');

// Calculate the radius based on the canvas size. 
// We use half the height to ensure the clock fits perfectly in the center.
const radius = canvas.height / 2;

// IMPORTANT: By default, (0,0) is the top-left corner of the canvas.
// translate(x, y) moves the (0,0) origin to the center of our canvas.
// This makes drawing a circle much easier!
ctx.translate(radius, radius);

// --- 2. THE DIGITAL CLOCK EXAMPLE ---
function updateDigitalClock() {
    // The Date object contains the current system time
    const now = new Date();
    
    // toLocaleTimeString() gives us a nice "11:30:05 AM" format
    const timeString = now.toLocaleTimeString();
    
    // Update the text inside our <div> in the HTML
    document.getElementById('digital-clock').innerText = timeString;
}

// setInterval runs a function repeatedly. 
// 1000 milliseconds = 1 second.
setInterval(updateDigitalClock, 1000); 


// --- 3. ANALOG CLOCK DRAWING ---

function drawClock() {
    // In an animation, you usually need to clear the canvas here 
    // or redraw the background so the old "frames" disappear.
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    
    // STUDENT TASK: Call your future 'drawHands' function here!
}

function drawFace(ctx, radius) {
    // Start a new shape
    ctx.beginPath();
    
    // arc(x, y, radius, startAngle, endAngle)
    // 2 * Math.PI represents a full 360-degree circle in Radians
    ctx.arc(0, 0, radius * 0.9, 0, 2 * Math.PI);
    
    ctx.fillStyle = 'white';
    ctx.fill(); // Fill the circle with white

    // Draw the outer border (the "rim" of the clock)
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 5;
    ctx.stroke(); 
    
    // Draw a small black circle in the very center (the "pin" for the hands)
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    // Loop 12 times to place numbers 1 through 12
    for (let num = 1; num <= 12; num++) {
        // Calculate the angle for each number (30 degrees or PI/6 radians)
        let ang = num * Math.PI / 6;

        // 1. Rotate the entire 'paper' to the correct angle
        ctx.rotate(ang);
        // 2. Move 'up' the canvas (negative Y) to the edge of the clock
        ctx.translate(0, -radius * 0.75);
        // 3. Rotate back so the number itself isn't tilted
        ctx.rotate(-ang);
        
        // Draw the number text
        ctx.fillText(num.toString(), 0, 0);

        // 4. UNDO the movements so we are ready for the next number!
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.75);
        ctx.rotate(-ang);
    }
}

// Run the function once immediately so the page isn't blank on load
drawClock();
