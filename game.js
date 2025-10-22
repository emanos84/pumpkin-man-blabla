// Pumpkin-Man Game - Simple Working Version

let game = null;

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.tileSize = 40;
        this.rows = 15;
        this.cols = 19;
        
        this.canvas.width = this.cols * this.tileSize;
        this.canvas.height = this.rows * this.tileSize;
        
        this.score = 0;
        this.lives = 3;
        this.timeLeft = 90;
        this.gameRunning = false;
        this.timerInterval = null;
        
        this.maze = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
            [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
            [1,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,1],
            [1,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,1],
            [1,1,1,1,2,1,2,1,1,2,1,1,2,1,2,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
            [1,2,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
        
        this.player = {
            x: 9,
            y: 9,
            speed: 0.15
        };
        
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        
        this.totalPumpkins = this.countPumpkins();
        this.collectedPumpkins = 0;
        
        this.setupControls();
        this.setupStartButton();
        this.animate();
    }
    
    setupControls() {
        document.body.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'w') { this.keys.up = true; e.preventDefault(); }
            if (e.key === 'ArrowDown' || e.key === 's') { this.keys.down = true; e.preventDefault(); }
            if (e.key === 'ArrowLeft' || e.key === 'a') { this.keys.left = true; e.preventDefault(); }
            if (e.key === 'ArrowRight' || e.key === 'd') { this.keys.right = true; e.preventDefault(); }
        });
        
        document.body.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'w') this.keys.up = false;
            if (e.key === 'ArrowDown' || e.key === 's') this.keys.down = false;
            if (e.key === 'ArrowLeft' || e.key === 'a') this.keys.left = false;
            if (e.key === 'ArrowRight' || e.key === 'd') this.keys.right = false;
        });
    }
    
    setupStartButton() {
        const btn = document.getElementById('startButton');
        if (btn) {
            btn.onclick = () => {
                document.getElementById('startScreen').style.display = 'none';
                document.getElementById('gameScreen').style.display = 'block';
                this.startGame();
            };
        }
    }
    
    startGame() {
        this.gameRunning = true;
        this.timerInterval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
                document.getElementById('timer').textContent = this.timeLeft;
                if (this.timeLeft === 0) {
                    this.gameOver("Time's up!");
                }
            }
        }, 1000);
    }
    
    countPumpkins() {
        let count = 0;
        for (let row of this.maze) {
            for (let cell of row) {
                if (cell === 2) count++;
            }
        }
        return count;
    }
    
    update() {
        if (!this.gameRunning) return;
        
        const oldX = this.player.x;
        const oldY = this.player.y;
        
        if (this.keys.up) this.player.y -= this.player.speed;
        if (this.keys.down) this.player.y += this.player.speed;
        if (this.keys.left) this.player.x -= this.player.speed;
        if (this.keys.right) this.player.x += this.player.speed;
        
        if (this.checkWallCollision()) {
            this.player.x = oldX;
            this.player.y = oldY;
        }
        
        this.checkPumpkinCollection();
    }
    
    checkWallCollision() {
        const margin = 0.3;
        const left = Math.floor(this.player.x - margin);
        const right = Math.floor(this.player.x + margin);
        const top = Math.floor(this.player.y - margin);
        const bottom = Math.floor(this.player.y + margin);
        
        if (this.maze[top]?.[left] === 1) return true;
        if (this.maze[top]?.[right] === 1) return true;
        if (this.maze[bottom]?.[left] === 1) return true;
        if (this.maze[bottom]?.[right] === 1) return true;
        
        return false;
    }
    
    checkPumpkinCollection() {
        const gridX = Math.floor(this.player.x);
        const gridY = Math.floor(this.player.y);
        
        if (this.maze[gridY]?.[gridX] === 2) {
            this.maze[gridY][gridX] = 0;
            this.score += 10;
            this.collectedPumpkins++;
            document.getElementById('score').textContent = this.score;
            
            if (this.collectedPumpkins === this.totalPumpkins) {
                this.gameWin();
            }
        }
    }
    
    draw() {
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const x = col * this.tileSize;
                const y = row * this.tileSize;
                
                if (this.maze[row][col] === 1) {
                    this.ctx.fillStyle = '#5a2d82';
                    this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
                    this.ctx.strokeStyle = '#7a4d9f';
                    this.ctx.lineWidth = 2;
                    this.ctx.strokeRect(x, y, this.tileSize, this.tileSize);
                } else if (this.maze[row][col] === 2) {
                    this.drawPumpkin(x + this.tileSize/2, y + this.tileSize/2, this.tileSize * 0.3);
                }
            }
        }
        
        this.drawPlayer();
    }
    
    drawPumpkin(x, y, radius) {
        this.ctx.fillStyle = '#FF7518';
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.strokeStyle = '#D35400';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x - radius/2, y - radius);
        this.ctx.lineTo(x - radius/2, y + radius);
        this.ctx.moveTo(x + radius/2, y - radius);
        this.ctx.lineTo(x + radius/2, y + radius);
        this.ctx.stroke();
        
        this.ctx.fillStyle = '#2d5016';
        this.ctx.fillRect(x - 3, y - radius - 5, 6, 8);
    }
    
    drawPlayer() {
        const x = this.player.x * this.tileSize + this.tileSize/2;
        const y = this.player.y * this.tileSize + this.tileSize/2;
        const radius = this.tileSize * 0.35;
        
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius * 1.5);
        gradient.addColorStop(0, 'rgba(255, 215, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(x - radius/3, y - radius/4, radius/6, 0, Math.PI * 2);
        this.ctx.arc(x + radius/3, y - radius/4, radius/6, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.arc(x, y + radius/4, radius/2, 0, Math.PI);
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = '#000';
        this.ctx.stroke();
    }
    
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
    
    gameOver(message) {
        this.gameRunning = false;
        clearInterval(this.timerInterval);
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#FF7518';
        this.ctx.font = 'bold 48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width/2, this.canvas.height/2 - 40);
        
        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = '24px Arial';
        this.ctx.fillText(message, this.canvas.width/2, this.canvas.height/2 + 10);
        this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width/2, this.canvas.height/2 + 50);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '18px Arial';
        this.ctx.fillText('Press F5 to play again', this.canvas.width/2, this.canvas.height/2 + 100);
    }
    
    gameWin() {
        this.gameRunning = false;
        clearInterval(this.timerInterval);
        
        this.ctx.fillStyle = 'rgba(90, 45, 130, 0.9)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = 'bold 48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🎃 YOU WIN! 🎃', this.canvas.width/2, this.canvas.height/2 - 40);
        
        this.ctx.fillStyle = '#FF7518';
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width/2, this.canvas.height/2 + 10);
        this.ctx.fillText(`Time Bonus: +${this.timeLeft * 5}`, this.canvas.width/2, this.canvas.height/2 + 45);
        
        const finalScore = this.score + (this.timeLeft * 5);
        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = 'bold 32px Arial';
        this.ctx.fillText(`Final: ${finalScore}`, this.canvas.width/2, this.canvas.height/2 + 90);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '18px Arial';
        this.ctx.fillText('Press F5 to play again', this.canvas.width/2, this.canvas.height/2 + 130);
    }
}

window.addEventListener('load', () => {
    setTimeout(() => {
        game = new Game();
    }, 500);
});
