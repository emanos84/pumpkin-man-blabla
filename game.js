// 🎃 Pumpkin-Man Game - Core Game Logic

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Game settings
        this.tileSize = 40;
        this.rows = 15;
        this.cols = 19;
        
        // Set canvas size
        this.canvas.width = this.cols * this.tileSize;
        this.canvas.height = this.rows * this.tileSize;
        
        // Game state
        this.score = 0;
        this.lives = 3;
        this.timeLeft = 90;
        this.gameRunning = true;
        
        // Maze layout (1 = wall, 0 = path, 2 = pumpkin)
        this.maze = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
            [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
            [1,1,1,1,2,1,1,1,0,1,0,1,1,1,2,1,1,1,1],
            [1,2,2,2,2,1,0,0,0,0,0,0,0,1,2,2,2,2,1],
            [1,1,1,1,2,1,0,1,1,0,1,1,0,1,2,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
            [1,2,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
        
        // Player
        this.player = {
            x: 1,
            y: 1,
            size: this.tileSize * 0.7,
            speed: 1,
            color: '#FF7518'
        };
        
        // Input handling
        this.keys = {};
        this.setupControls();
        
        // Count initial pumpkins
        this.totalPumpkins = this.countPumpkins();
        this.collectedPumpkins = 0;
        
        // Start game loop
        this.lastTime = 0;
        this.animationFrame = null;
        this.startTimer();
        this.gameLoop();
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
    
    setupControls() {
        // Keyboard controls - attach to window for better compatibility
        window.addEventListener('keydown', (e) => {
            console.log('Key pressed:', e.key); // Debug log
            this.keys[e.key] = true;
            
            // Prevent arrow keys from scrolling the page
            if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }
        }, true);
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        }, true);
        
        // Also add WASD support as alternative
        window.addEventListener('keydown', (e) => {
            if (e.key === 'w' || e.key === 'W') this.keys['ArrowUp'] = true;
            if (e.key === 's' || e.key === 'S') this.keys['ArrowDown'] = true;
            if (e.key === 'a' || e.key === 'A') this.keys['ArrowLeft'] = true;
            if (e.key === 'd' || e.key === 'D') this.keys['ArrowRight'] = true;
        }, true);
        
        window.addEventListener('keyup', (e) => {
            if (e.key === 'w' || e.key === 'W') this.keys['ArrowUp'] = false;
            if (e.key === 's' || e.key === 'S') this.keys['ArrowDown'] = false;
            if (e.key === 'a' || e.key === 'A') this.keys['ArrowLeft'] = false;
            if (e.key === 'd' || e.key === 'D') this.keys['ArrowRight'] = false;
        }, true);
        
        // Touch/Mobile support
        let touchStartX = 0;
        let touchStartY = 0;
        
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: false });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!touchStartX || !touchStartY) return;
            
            const touchEndX = e.touches[0].clientX;
            const touchEndY = e.touches[0].clientY;
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            // Reset all directions
            this.keys['ArrowUp'] = false;
            this.keys['ArrowDown'] = false;
            this.keys['ArrowLeft'] = false;
            this.keys['ArrowRight'] = false;
            
            // Determine direction based on larger delta
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) this.keys['ArrowRight'] = true;
                else this.keys['ArrowLeft'] = true;
            } else {
                if (deltaY > 0) this.keys['ArrowDown'] = true;
                else this.keys['ArrowUp'] = true;
            }
        }, { passive: false });
        
        this.canvas.addEventListener('touchend', () => {
            this.keys['ArrowUp'] = false;
            this.keys['ArrowDown'] = false;
            this.keys['ArrowLeft'] = false;
            this.keys['ArrowRight'] = false;
        });
        
        console.log('Controls initialized!'); // Debug log
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.gameRunning && this.timeLeft > 0) {
                this.timeLeft--;
                document.getElementById('timer').textContent = this.timeLeft;
                
                if (this.timeLeft === 0) {
                    this.gameOver('Time\'s up!');
                }
            }
        }, 1000);
    }
    
    update() {
        if (!this.gameRunning) return;
        
        // Store old position
        const oldX = this.player.x;
        const oldY = this.player.y;
        
        // Handle player movement
        if (this.keys['ArrowUp']) {
            this.player.y -= this.player.speed * 0.1;
        }
        if (this.keys['ArrowDown']) {
            this.player.y += this.player.speed * 0.1;
        }
        if (this.keys['ArrowLeft']) {
            this.player.x -= this.player.speed * 0.1;
        }
        if (this.keys['ArrowRight']) {
            this.player.x += this.player.speed * 0.1;
        }
        
        // Check collision with walls
        if (this.checkWallCollision()) {
            this.player.x = oldX;
            this.player.y = oldY;
        }
        
        // Check pumpkin collection
        this.checkPumpkinCollection();
    }
    
    checkWallCollision() {
        // Get player grid position and check surrounding tiles
        const margin = 0.3;
        
        const left = Math.floor(this.player.x - margin);
        const right = Math.floor(this.player.x + margin);
        const top = Math.floor(this.player.y - margin);
        const bottom = Math.floor(this.player.y + margin);
        
        // Check all four corners of player
        if (this.maze[top] && this.maze[top][left] === 1) return true;
        if (this.maze[top] && this.maze[top][right] === 1) return true;
        if (this.maze[bottom] && this.maze[bottom][left] === 1) return true;
        if (this.maze[bottom] && this.maze[bottom][right] === 1) return true;
        
        return false;
    }
    
    checkPumpkinCollection() {
        const gridX = Math.floor(this.player.x);
        const gridY = Math.floor(this.player.y);
        
        if (this.maze[gridY] && this.maze[gridY][gridX] === 2) {
            this.maze[gridY][gridX] = 0; // Remove pumpkin
            this.score += 10;
            this.collectedPumpkins++;
            document.getElementById('score').textContent = this.score;
            
            // Check win condition
            if (this.collectedPumpkins === this.totalPumpkins) {
                this.gameWin();
            }
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw maze
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const x = col * this.tileSize;
                const y = row * this.tileSize;
                
                if (this.maze[row][col] === 1) {
                    // Wall
                    this.ctx.fillStyle = '#5a2d82';
                    this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
                    this.ctx.strokeStyle = '#7a4d9f';
                    this.ctx.lineWidth = 2;
                    this.ctx.strokeRect(x, y, this.tileSize, this.tileSize);
                } else if (this.maze[row][col] === 2) {
                    // Pumpkin
                    this.drawPumpkin(x + this.tileSize/2, y + this.tileSize/2, this.tileSize * 0.3);
                }
            }
        }
        
        // Draw player
        this.drawPlayer();
    }
    
    drawPumpkin(x, y, radius) {
        // Pumpkin body
        this.ctx.fillStyle = '#FF7518';
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Pumpkin lines
        this.ctx.strokeStyle = '#D35400';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x - radius/2, y - radius);
        this.ctx.lineTo(x - radius/2, y + radius);
        this.ctx.moveTo(x + radius/2, y - radius);
        this.ctx.lineTo(x + radius/2, y + radius);
        this.ctx.stroke();
        
        // Stem
        this.ctx.fillStyle = '#2d5016';
        this.ctx.fillRect(x - 3, y - radius - 5, 6, 8);
    }
    
    drawPlayer() {
        const x = this.player.x * this.tileSize + this.tileSize/2;
        const y = this.player.y * this.tileSize + this.tileSize/2;
        const radius = this.player.size / 2;
        
        // Player body (bigger pumpkin)
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Glow effect
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius * 1.5);
        gradient.addColorStop(0, 'rgba(255, 215, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Face - eyes
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(x - radius/3, y - radius/4, radius/6, 0, Math.PI * 2);
        this.ctx.arc(x + radius/3, y - radius/4, radius/6, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Face - smile
        this.ctx.beginPath();
        this.ctx.arc(x, y + radius/4, radius/2, 0, Math.PI);
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = '#000';
        this.ctx.stroke();
    }
    
    gameLoop(currentTime = 0) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.update();
        this.draw();
        
        this.animationFrame = requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    gameOver(message) {
        this.gameRunning = false;
        clearInterval(this.timerInterval);
        
        // Draw game over screen
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
        this.ctx.fillText('Refresh to play again', this.canvas.width/2, this.canvas.height/2 + 100);
    }
    
    gameWin() {
        this.gameRunning = false;
        clearInterval(this.timerInterval);
        
        // Draw win screen
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
        this.ctx.fillText('Refresh to play again', this.canvas.width/2, this.canvas.height/2 + 130);
    }
}

// Start game when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Starting game...');
        new Game();
    });
} else {
    console.log('Starting game...');
    new Game();
}
