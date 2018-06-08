// Enemies our player must avoid
var Enemy = function(x, y, fastRate) {

    // Variables for each enemy position and fastRate
    this.x = x;
    this.y = y;
    this.fastRate = fastRate;

    // The image/sprite for our enemies, this uses a helper we've provide to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // Multiplies any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
    this.x += this.fastRate * dt;

    // Finding collisions between enemies and player
    if(player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 50 && 50 + player.y > this.y) {
        player.x = 200;
        player.y = 400;
    }

    // Random speed for each enemy
    if(this.x > 500) {
        this.x = -100;
        this.fastRate = 100 + Math.floor(Math.random() * 234);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player x and y starting position
var playerX = 200;
var playerY = 400;

var Player = function() {
    this.x = playerX;
    this.y = playerY;
    this.sprite = 'images/char-boy.png';
};


Player.prototype.update = function() {

    //setting the x an y of game play space
    if (this.x < 0) {
        this.x = 0;
    } else if(this.x > 400) {
        this.x = 400;
    }
    else if(this.y > 400) {
        this.y = 400;
    }

    //reset when player touch the water and change background color
    else if (this.y < 0) {
        setTimeout(function() {
            player.x = 200;
            player.y = 400;
        }, 800);
        changeColor('lightgreen');
    }
};

// Changing background color when player wins
function changeColor(colorOfWin) {
    if(colorOfWin) {
        document.getElementById("winner").style.backgroundColor = colorOfWin;
        setTimeout(changeColor, 800);
    } else {
        document.getElementById("winner").style.backgroundColor = 'white';
        return colorOfWin;
    }
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Arrow keys to move player on the game space
Player.prototype.handleInput = function(allowedKeys) {

    if(allowedKeys === 'left' && this.x > 10) {
        this.x -= 100;
    }
    if(allowedKeys === 'up' && this.y > 2) {
        this.y -= 83;
    }
    if(allowedKeys === 'right' && this.x < 350) {
            this.x += 100;
    }
    if(allowedKeys === 'down' && this.y < 400) {
        this.y += 80;
    }
};

// Starting position of player
var player = new Player();

// All enemies objects in an array
var enemy1 = new Enemy(-100, 63, 80);
var enemy2 = new Enemy(-200, 145, 90);
var enemy3 = new Enemy(-300, 230, 60);

var allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});