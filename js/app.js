// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.move = 2;
    this.width = 75;
    this.height = 55;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.move;
    if (this.x > 500) {
    this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 415;
    this.width = 55;
    this.height = 75;

};

// Player can not move off screen
Player.prototype.update = function(dt) {
    if (this.y > 390) {
        this.y = 390;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    for(var i = 0; i < allEnemies.length; i++) {
        this.handleCollision(allEnemies[i]);
    }

// Player win
    if (this.y < 10) {
        this.x = 200;
        this.y = 415; 
        score++;
    }
};

// Score display
//Source from MDN: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Track_the_score_and_win
function drawScore() {
    ctx.font = 'bold 40px serif';
    ctx.fillStyle = '#FF0000';
    ctx.fillText('Score: ' + score, 175, 100);
}

// Check collisions 
Player.prototype.handleCollision = function(enemy) {
    
    function detectCollision(enemy, player){
        //Source from MDN: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        var rect1 = {x: enemy.x, y: enemy.y, width: enemy.width, height: enemy.height} 
        var rect2 = {x: player.x, y: player.y, width: player.width, height: player.height} 

        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y)   {
                return true;
                // collision detected!
        }
    }
    
    if (detectCollision(enemy, player)) {
        var enemy1 = new Enemy(-300, 60);
        var enemy2 = new Enemy(-200, 145);
        var enemy3 = new Enemy(-100, 225);
        var enemy4 = new Enemy(-450, 225);
        var enemy5 = new Enemy(-650, 60);
        var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
        player = new Player();
        score = 0;
        // collision detected!
    }
}


// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Moves player left/right/up/down 
Player.prototype.handleInput = function(dt) {
    switch (dt) {
        case 'left':
            this.x -= 100;
            break;
        case 'up':
            this.y -= 85;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'down':
            this.y += 85;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-300, 60);
var enemy2 = new Enemy(-200, 145);
var enemy3 = new Enemy(-100, 225);
var enemy4 = new Enemy(-450, 225);
var enemy5 = new Enemy(-650, 60);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
var player = new Player();
var score = 0;



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
