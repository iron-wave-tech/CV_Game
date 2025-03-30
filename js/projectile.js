class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 12;
        this.height = 16;
        this.speed = 10;
        this.color = '#00ffff';
        this.glowColor = 'rgba(0, 255, 255, 0.4)';
    }

    update() {
        this.y -= this.speed;
    }

    draw(ctx) {
        ctx.imageSmoothingEnabled = false;  // Ensure pixel-perfect rendering

        // Draw arrow-shaped projectile
        ctx.fillStyle = this.color;
        
        // Main arrow body
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height / 2);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        // Inner detail
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(this.x + 2, this.y + 4);
        ctx.lineTo(this.x + this.width - 4, this.y + this.height / 2);
        ctx.lineTo(this.x + 2, this.y + this.height - 4);
        ctx.closePath();
        ctx.fill();
    }

    isOffscreen() {
        return this.y < 0;
    }
} 