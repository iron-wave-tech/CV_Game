class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = 60;
        this.height = 80;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 100;
        this.speed = 8;
        this.bodyGradient = null;
        this.flameTimer = 0;
        this.isMovingLeft = false;
        this.isMovingRight = false;
    }

    update() {
        if (this.isMovingLeft && this.x > 0) {
            this.x -= this.speed;
        }
        if (this.isMovingRight && this.x < this.canvas.width - this.width) {
            this.x += this.speed;
        }
        this.flameTimer += 0.1;
    }

    draw(ctx) {
        // Create body gradient
        this.bodyGradient = ctx.createLinearGradient(
            this.x, this.y,
            this.x + this.width, this.y + this.height
        );
        this.bodyGradient.addColorStop(0, '#2196F3');  // Blue
        this.bodyGradient.addColorStop(1, '#1976D2');  // Darker blue

        // Main rocket body
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y); // Nose tip
        ctx.quadraticCurveTo(
            this.x + this.width * 0.75, this.y + this.height * 0.3,
            this.x + this.width, this.y + this.height * 0.7
        ); // Right curve
        ctx.lineTo(this.x + this.width, this.y + this.height * 0.9); // Right side
        ctx.quadraticCurveTo(
            this.x + this.width / 2, this.y + this.height,
            this.x, this.y + this.height * 0.9
        ); // Bottom curve
        ctx.lineTo(this.x, this.y + this.height * 0.7); // Left side
        ctx.quadraticCurveTo(
            this.x + this.width * 0.25, this.y + this.height * 0.3,
            this.x + this.width / 2, this.y
        ); // Left curve
        ctx.closePath();

        // Add metallic effect
        ctx.fillStyle = this.bodyGradient;
        ctx.fill();

        // Add shine effect
        const shineGradient = ctx.createLinearGradient(
            this.x, this.y,
            this.x + this.width * 0.7, this.y + this.height * 0.7
        );
        shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
        shineGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
        shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = shineGradient;
        ctx.fill();

        // Cockpit window
        ctx.beginPath();
        ctx.ellipse(
            this.x + this.width / 2,
            this.y + this.height * 0.3,
            this.width * 0.15,
            this.height * 0.15,
            0,
            0,
            Math.PI * 2
        );
        const windowGradient = ctx.createRadialGradient(
            this.x + this.width / 2, this.y + this.height * 0.3, 0,
            this.x + this.width / 2, this.y + this.height * 0.3, this.width * 0.15
        );
        windowGradient.addColorStop(0, 'rgba(135, 206, 235, 0.9)');
        windowGradient.addColorStop(1, 'rgba(25, 118, 210, 0.9)');
        ctx.fillStyle = windowGradient;
        ctx.fill();

        // Engine flame effect
        this.drawFlame(ctx);
    }

    drawFlame(ctx) {
        const flameX = this.x + this.width / 2;
        const flameY = this.y + this.height;
        const flameWidth = this.width * 0.3;
        const flameHeight = this.height * 0.4;

        // Create flame gradient
        const flameGradient = ctx.createLinearGradient(
            flameX, flameY,
            flameX, flameY + flameHeight
        );
        flameGradient.addColorStop(0, '#FF9500');   // Orange
        flameGradient.addColorStop(0.5, '#FF5722'); // Deep orange
        flameGradient.addColorStop(1, 'rgba(255, 87, 34, 0)'); // Transparent

        // Animate flame
        const waveOffset = Math.sin(this.flameTimer) * 5;

        // Main flame
        ctx.beginPath();
        ctx.moveTo(flameX - flameWidth / 2, flameY);
        ctx.quadraticCurveTo(
            flameX + waveOffset, flameY + flameHeight * 0.7,
            flameX, flameY + flameHeight
        );
        ctx.quadraticCurveTo(
            flameX - waveOffset, flameY + flameHeight * 0.7,
            flameX + flameWidth / 2, flameY
        );
        ctx.closePath();

        // Add glow effect
        ctx.shadowColor = '#FF5722';
        ctx.shadowBlur = 20;
        ctx.fillStyle = flameGradient;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner flame
        const innerFlameGradient = ctx.createLinearGradient(
            flameX, flameY,
            flameX, flameY + flameHeight * 0.7
        );
        innerFlameGradient.addColorStop(0, '#FFEB3B');    // Yellow
        innerFlameGradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(flameX - flameWidth / 4, flameY);
        ctx.quadraticCurveTo(
            flameX + waveOffset / 2, flameY + flameHeight * 0.5,
            flameX, flameY + flameHeight * 0.7
        );
        ctx.quadraticCurveTo(
            flameX - waveOffset / 2, flameY + flameHeight * 0.5,
            flameX + flameWidth / 4, flameY
        );
        ctx.closePath();

        ctx.fillStyle = innerFlameGradient;
        ctx.fill();
    }

    moveLeft() {
        this.isMovingLeft = true;
    }

    moveRight() {
        this.isMovingRight = true;
    }

    stopMovingLeft() {
        this.isMovingLeft = false;
    }

    stopMovingRight() {
        this.isMovingRight = false;
    }

    getCenterX() {
        return this.x + this.width / 2;
    }

    getY() {
        return this.y;
    }
} 