import { Game } from './game.js';
import { Player } from './player.js';
import { AudioManager } from './audio.js';
import { Enemy } from './enemy.js';
import { Projectile } from './projectile.js';
import { Boss } from './boss.js';
import '../css/styles.css';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const game = new Game(canvas);
    const player = new Player(canvas);
    const audioManager = new AudioManager();

    // Start background music
    audioManager.startBackgroundMusic();

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                player.moveLeft();
                break;
            case 'ArrowRight':
                player.moveRight();
                break;
            case ' ':
                game.addProjectile(player.getCenterX(), player.getY());
                audioManager.playSound('shoot');
                break;
        }
    });

    document.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                player.stopMovingLeft();
                break;
            case 'ArrowRight':
                player.stopMovingRight();
                break;
        }
    });

    // Mobile controls
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');
    const shootBtn = document.getElementById('shoot-btn');

    leftBtn.addEventListener('touchstart', () => player.moveLeft());
    leftBtn.addEventListener('touchend', () => player.stopMovingLeft());
    rightBtn.addEventListener('touchstart', () => player.moveRight());
    rightBtn.addEventListener('touchend', () => player.stopMovingRight());
    shootBtn.addEventListener('touchstart', () => {
        game.addProjectile(player.getCenterX(), player.getY());
        audioManager.playSound('shoot');
    });

    // Game loop
    function gameLoop() {
        game.update();
        player.update();
        game.draw();
        player.draw(game.ctx);
        requestAnimationFrame(gameLoop);
    }

    // Start the game
    gameLoop();
}); 