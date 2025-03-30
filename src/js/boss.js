export class Boss {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = 240;
        this.height = 140;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = 80;
        this.health = 10;
        this.speed = 2;
        this.glowTimer = 0;
        this.isActive = false;
        this.hitFlashTimer = 0;
        
        // Movement pattern variables
        this.targetX = this.x;
        this.targetY = this.y;
        this.moveTimer = 0;
        this.moveInterval = 150;
        this.minY = 50;
        this.maxY = canvas.height / 3; // Increased vertical range
        
        // Add smooth vertical oscillation
        this.verticalOscillation = 0;
        this.oscillationSpeed = 0.02;
        this.oscillationRange = 30;
    }

    update() {
        if (!this.isActive) return;

        // Update movement timer
        this.moveTimer++;
        
        // Update vertical oscillation
        this.verticalOscillation += this.oscillationSpeed;
        const verticalOffset = Math.sin(this.verticalOscillation) * this.oscillationRange;
        
        // Choose new random target position
        if (this.moveTimer >= this.moveInterval) {
            this.moveTimer = 0;
            this.targetX = Math.random() * (this.canvas.width - this.width);
            this.targetY = Math.random() * (this.maxY - this.minY) + this.minY;
            
            // Adjust move interval randomly
            this.moveInterval = 120 + Math.random() * 60;
            
            // Randomly adjust oscillation parameters for variety
            this.oscillationSpeed = 0.02 + Math.random() * 0.01;
            this.oscillationRange = 25 + Math.random() * 10;
        }

        // Move towards target position
        const dx = this.targetX - this.x;
        const dy = (this.targetY + verticalOffset) - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 1) {
            const moveX = (dx / distance) * this.speed;
            const moveY = (dy / distance) * this.speed;
            
            this.x += moveX;
            this.y += moveY;
        }

        // Keep within bounds
        this.x = Math.max(0, Math.min(this.canvas.width - this.width, this.x));
        this.y = Math.max(this.minY, Math.min(this.maxY + this.oscillationRange, this.y));
        
        // Update effects
        this.glowTimer += 0.05;
        if (this.hitFlashTimer > 0) this.hitFlashTimer -= 1;

        // Reduced wobble effect
        this.x += Math.sin(this.glowTimer * 2) * 0.3;
        this.y += Math.cos(this.glowTimer * 1.5) * 0.2;
    }

    draw(ctx) {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;

        // Add motion blur effect based on speed
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        ctx.shadowBlur = Math.min(speed * 2, 15);
        ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';

        // Main body gradient
        const bodyGradient = ctx.createLinearGradient(
            this.x, this.y,
            this.x + this.width, this.y + this.height
        );
        
        if (this.hitFlashTimer > 0) {
            // Flash red when hit
            bodyGradient.addColorStop(0, '#FF4444');
            bodyGradient.addColorStop(0.5, '#CC0000');
            bodyGradient.addColorStop(1, '#AA0000');
        } else {
            // Normal colors
            bodyGradient.addColorStop(0, '#4A4A4A');
            bodyGradient.addColorStop(0.5, '#333333');
            bodyGradient.addColorStop(1, '#1A1A1A');
        }

        // Main body (larger UFO shape)
        ctx.beginPath();
        ctx.ellipse(
            centerX, centerY,
            this.width / 2, this.height / 3,
            0, 0, Math.PI * 2
        );
        ctx.fillStyle = bodyGradient;
        ctx.fill();

        // Reset shadow for other elements
        ctx.shadowBlur = 0;

        // Top dome (larger and more menacing)
        const domeGradient = ctx.createRadialGradient(
            centerX, centerY - this.height / 4, 0,
            centerX, centerY - this.height / 4, this.width / 2
        );
        domeGradient.addColorStop(0, 'rgba(255, 0, 0, 0.9)');
        domeGradient.addColorStop(0.7, 'rgba(200, 0, 0, 0.7)');
        domeGradient.addColorStop(1, 'rgba(150, 0, 0, 0.5)');

        ctx.beginPath();
        ctx.ellipse(
            centerX, centerY - this.height / 4,
            this.width / 2.5, this.height / 3,
            0, 0, Math.PI * 2
        );
        ctx.fillStyle = domeGradient;
        ctx.fill();

        // Bottom glow effect
        const glowSize = 40 + Math.sin(this.glowTimer) * 10;
        const glowGradient = ctx.createRadialGradient(
            centerX, centerY + this.height / 3,
            0,
            centerX, centerY + this.height / 3,
            glowSize
        );
        glowGradient.addColorStop(0, 'rgba(255, 0, 0, 0.4)');
        glowGradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.2)');
        glowGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

        ctx.beginPath();
        ctx.ellipse(
            centerX, centerY + this.height / 3,
            glowSize, glowSize / 2,
            0, 0, Math.PI * 2
        );
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Running lights with movement-based glow
        const lightPositions = [-0.4, -0.2, 0, 0.2, 0.4];
        lightPositions.forEach(pos => {
            const lightX = centerX + this.width * pos;
            const lightY = centerY + this.height / 6;
            const lightRadius = 5;
            
            // Enhanced light glow based on movement
            const glowRadius = lightRadius * 2 + (speed / 2);
            ctx.beginPath();
            ctx.arc(lightX, lightY, glowRadius, 0, Math.PI * 2);
            const lightGlow = ctx.createRadialGradient(
                lightX, lightY, 0,
                lightX, lightY, glowRadius
            );
            lightGlow.addColorStop(0, 'rgba(255, 0, 0, 0.3)');
            lightGlow.addColorStop(1, 'rgba(255, 0, 0, 0)');
            ctx.fillStyle = lightGlow;
            ctx.fill();

            // Light core
            ctx.beginPath();
            ctx.arc(lightX, lightY, lightRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#FF0000';
            ctx.fill();
        });

        // Draw health bar
        const healthBarWidth = this.width;
        const healthBarHeight = 10;
        const healthPercentage = this.health / 10;
        
        // Health bar background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(
            centerX - healthBarWidth/2,
            this.y - 20,
            healthBarWidth,
            healthBarHeight
        );
        
        // Health bar fill
        ctx.fillStyle = `rgb(${255 * (1-healthPercentage)}, ${255 * healthPercentage}, 0)`;
        ctx.fillRect(
            centerX - healthBarWidth/2,
            this.y - 20,
            healthBarWidth * healthPercentage,
            healthBarHeight
        );
    }

    hit() {
        this.health--;
        this.hitFlashTimer = 5;
        this.speed = Math.min(this.speed + 0.1, 3.5);
        return this.health <= 0;
    }

    activate() {
        this.isActive = true;
    }
} 