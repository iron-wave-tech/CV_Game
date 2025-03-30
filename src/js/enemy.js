export class Enemy {
    constructor(canvas, x, y) {
        this.canvas = canvas;
        this.width = 80;
        this.height = 40;
        this.x = x;
        this.y = y;
        this.speed = 1.5;
        this.glowTimer = 0;
        this.horizontalPhase = Math.random() * Math.PI * 2; // Random start position
        this.verticalSpeed = 1; // Constant downward speed
    }

    update() {
        // Smooth sine wave horizontal movement
        this.horizontalPhase += 0.02;
        const horizontalOffset = Math.sin(this.horizontalPhase) * this.speed;
        this.x += horizontalOffset;
        
        // Bounce off screen edges smoothly
        if (this.x <= 0) {
            this.x = 0;
            this.horizontalPhase = Math.PI - this.horizontalPhase; // Reverse phase
        } else if (this.x + this.width >= this.canvas.width) {
            this.x = this.canvas.width - this.width;
            this.horizontalPhase = Math.PI - this.horizontalPhase; // Reverse phase
        }
        
        // Constant downward movement only
        this.y += this.verticalSpeed;
        
        // Glow animation
        this.glowTimer += 0.05;
    }

    draw(ctx) {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;

        // UFO body gradient
        const bodyGradient = ctx.createLinearGradient(
            this.x, this.y,
            this.x + this.width, this.y + this.height
        );
        bodyGradient.addColorStop(0, '#E0E0E0');  // Light metallic
        bodyGradient.addColorStop(0.5, '#BDBDBD'); // Medium metallic
        bodyGradient.addColorStop(1, '#9E9E9E');   // Dark metallic

        // Main saucer body
        ctx.beginPath();
        ctx.ellipse(
            centerX, centerY,
            this.width / 2, this.height / 3,
            0, 0, Math.PI * 2
        );
        ctx.fillStyle = bodyGradient;
        ctx.fill();

        // Top dome
        const domeGradient = ctx.createRadialGradient(
            centerX, centerY - this.height / 6, 0,
            centerX, centerY - this.height / 6, this.width / 3
        );
        domeGradient.addColorStop(0, 'rgba(200, 230, 255, 0.9)');
        domeGradient.addColorStop(0.7, 'rgba(150, 180, 255, 0.7)');
        domeGradient.addColorStop(1, 'rgba(100, 150, 255, 0.5)');

        ctx.beginPath();
        ctx.ellipse(
            centerX, centerY - this.height / 6,
            this.width / 3, this.height / 4,
            0, 0, Math.PI * 2
        );
        ctx.fillStyle = domeGradient;
        ctx.fill();

        // Bottom glow effect
        const glowSize = 20 + Math.sin(this.glowTimer) * 5;
        const glowGradient = ctx.createRadialGradient(
            centerX, centerY + this.height / 4,
            0,
            centerX, centerY + this.height / 4,
            glowSize
        );
        glowGradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
        glowGradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.1)');
        glowGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

        ctx.beginPath();
        ctx.ellipse(
            centerX, centerY + this.height / 4,
            glowSize, glowSize / 2,
            0, 0, Math.PI * 2
        );
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Running lights
        const lightPositions = [-0.3, 0, 0.3];
        lightPositions.forEach(pos => {
            const lightX = centerX + this.width * pos;
            const lightY = centerY + this.height / 6;
            const lightRadius = 3;
            
            // Light glow
            ctx.beginPath();
            ctx.arc(lightX, lightY, lightRadius * 2, 0, Math.PI * 2);
            const lightGlow = ctx.createRadialGradient(
                lightX, lightY, 0,
                lightX, lightY, lightRadius * 2
            );
            lightGlow.addColorStop(0, 'rgba(255, 255, 0, 0.3)');
            lightGlow.addColorStop(1, 'rgba(255, 255, 0, 0)');
            ctx.fillStyle = lightGlow;
            ctx.fill();

            // Light core
            ctx.beginPath();
            ctx.arc(lightX, lightY, lightRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFF00';
            ctx.fill();
        });

        // Metallic shine
        const shineGradient = ctx.createLinearGradient(
            this.x, this.y,
            this.x + this.width, this.y + this.height
        );
        shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        shineGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');

        ctx.beginPath();
        ctx.ellipse(
            centerX, centerY,
            this.width / 2, this.height / 3,
            0, 0, Math.PI * 2
        );
        ctx.fillStyle = shineGradient;
        ctx.fill();
    }

    getCenterX() {
        return this.x + this.width / 2;
    }

    getCenterY() {
        return this.y + this.height / 2;
    }
} 