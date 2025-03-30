export class InputHandler {
    constructor() {
        this.keys = {
            left: false,
            right: false,
            shoot: false
        };
        
        // More accurate mobile detection
        this.isMobile = this.isTouchDevice();
        
        this.setupDesktopControls();
        if (this.isMobile) {
            this.setupMobileControls();
        } else {
            // Hide mobile controls on desktop
            const mobileControls = document.querySelector('.mobile-controls');
            if (mobileControls) {
                mobileControls.style.display = 'none';
            }
        }
    }

    isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }

    setupDesktopControls() {
        window.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    this.keys.left = true;
                    break;
                case 'ArrowRight':
                    this.keys.right = true;
                    break;
                case ' ':
                    this.keys.shoot = true;
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    this.keys.left = false;
                    break;
                case 'ArrowRight':
                    this.keys.right = false;
                    break;
                case ' ':
                    this.keys.shoot = false;
                    break;
            }
        });
    }

    setupMobileControls() {
        if (!this.isMobile) return;

        const mobileControls = document.querySelector('.mobile-controls');
        if (mobileControls) {
            mobileControls.style.display = 'flex';
        }

        const leftBtn = document.getElementById('leftBtn');
        const rightBtn = document.getElementById('rightBtn');
        const shootBtn = document.getElementById('shootBtn');

        // Left button controls
        leftBtn.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent default touch behavior
            this.keys.left = true;
            leftBtn.classList.add('active');
        });

        leftBtn.addEventListener('touchend', (e) => {
            e.preventDefault(); // Prevent default touch behavior
            this.keys.left = false;
            leftBtn.classList.remove('active');
        });

        // Right button controls
        rightBtn.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent default touch behavior
            this.keys.right = true;
            rightBtn.classList.add('active');
        });

        rightBtn.addEventListener('touchend', (e) => {
            e.preventDefault(); // Prevent default touch behavior
            this.keys.right = false;
            rightBtn.classList.remove('active');
        });

        // Shoot button controls
        shootBtn.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent default touch behavior
            this.keys.shoot = true;
            shootBtn.classList.add('active');
        });

        shootBtn.addEventListener('touchend', (e) => {
            e.preventDefault(); // Prevent default touch behavior
            this.keys.shoot = false;
            shootBtn.classList.remove('active');
        });
    }

    isKeyPressed(key) {
        return this.keys[key];
    }

    isMobileDevice() {
        return this.isMobile;
    }
} 