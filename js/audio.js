class AudioManager {
    constructor() {
        this.sounds = {
            shoot: new Audio('sounds/shoot.wav'),
            explosion: new Audio('sounds/explosion.wav'),
            milestone: new Audio('sounds/milestone.wav'),
            gameOver: new Audio('sounds/gameover.wav')
        };

        // Background music
        this.bgMusic = new Audio('sounds/background.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.3;

        // Set volume for all sound effects
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0.2;
        });

        // Initialize audio context for Web Audio API
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    playSound(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play().catch(error => {
                console.log('Audio playback failed:', error);
            });
        }
    }

    startBackgroundMusic() {
        this.bgMusic.play().catch(error => {
            console.log('Background music playback failed:', error);
        });
    }

    stopBackgroundMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }

    // Create a retro-style sound effect using Web Audio API
    createRetroSound(frequency, duration) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + duration);
    }
} 