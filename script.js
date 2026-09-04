const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const W = 700, H = 400;
const R = 22;

let x = W/2;
let y = H/2;
let vx = 2;
let vy = 1.5;

let moving = true;
let speedMult = 1;

let clickTimer = null;

function drawField() {
    ctx.fillStyle = '#2d8c3a';
    ctx.fillRect(0, 0, W, H);
    
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 12]); 
    
    ctx.beginPath();
    ctx.arc(W/2, H/2, 45, 0, Math.PI*2);
    ctx.stroke();
    
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(W/2, 0);
    ctx.lineTo(W/2, H);
    ctx.stroke();
    
    ctx.strokeRect(30, H/2 - 50, 60, 100);
    ctx.strokeRect(W - 90, H/2 - 50, 60, 100);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, R, 0, Math.PI*2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(x, y, R-5, 0, Math.PI*2);
    ctx.fillStyle = '#2c2c2c';
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    
    ctx.beginPath();
    ctx.ellipse(x+3, y+R-3, R*0.6, R*0.3, 0, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fill();
}

function update() {
    if (!moving) return;
    
    let curVx = vx * speedMult;
    let curVy = vy * speedMult;
    
    x += curVx;
    y += curVy;
    
    if (x + R >= W) { x = W - R; vx = -Math.abs(vx); }
    if (x - R <= 0) { x = R; vx = Math.abs(vx); }
    if (y + R >= H) { y = H - R; vy = -Math.abs(vy); }
    if (y - R <= 0) { y = R; vy = Math.abs(vy); }
}

function draw() {
    drawField();
    drawBall();
}

function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

function onSingleClick() {
    if (!moving) {
        moving = true;
        speedMult = 1;
    } else {
        speedMult = Math.min(speedMult + 0.6, 10);
    }
}

function onDoubleClick() {
    moving = false;
    speedMult = 1;
}

canvas.addEventListener('click', (e) => {
    if (clickTimer) {
        clearTimeout(clickTimer);
        clickTimer = null;
        onDoubleClick();
    } else {
        clickTimer = setTimeout(() => {
            onSingleClick();
            clickTimer = null;
        }, 200);
    }
});

canvas.addEventListener('dblclick', (e) => {
    e.preventDefault();
});

animate();