import { Boss } from './boss.js';
import { Enemy } from './enemy.js';
import { Projectile } from './projectile.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.initializeGame();
        this.milestones = [
            {
                title: "Fullstack Engineer | Tiqets",
                subtitle: "2022 – Present | Amsterdam, Netherlands",
                content: `At Tiqets, I played a key role in delivering sophisticated solutions that enhanced both the platform's scalability and overall user experience:
• Designed and implemented a standalone frontend application, seamlessly separating it from a monolithic backend to improve performance and flexibility.
• Developed a reusable UI component library to streamline REST API interactions, speeding up development and ensuring consistent design.
• Transitioned the platform to React and TypeScript, enabling cleaner code and improving feature delivery speed by 25%.
• Introduced robust screenshot testing using BackstopJS, reducing user interface regressions by 35% and ensuring smoother releases.
• Optimized state management and data fetching by integrating React-Query, improving performance metrics and reducing network complexity by 35%.
• Worked closely with product and design teams to introduce features that drove user engagement and contributed to platform growth..`
            },
            {
                title: "Frontend Engineer | Yandex",
                subtitle: "2021 – 2022 | Moscow, Russia",
                content: `At Yandex, I led key initiatives that improved user engagement, streamlined workflows, and enhanced inclusivity:
• Increased user engagement by 18% through A/B testing of news card layouts, resulting in higher retention and better ad impressions.
• Designed and implemented an efficient CI/CD pipeline for Opera integration, reducing deployment time by 30% and enabling faster iterations.
• Improved accessibility by applying ARIA best practices, reducing barriers by 40% and creating a more inclusive experience for users.`
            },
            {
                title: "Senior Frontend Engineer | Domclick",
                subtitle: "2020 – 2021 | Moscow, Russia",
                content: `At Domclick, I delivered impactful solutions that enhanced user engagement and optimized workflows:
• Created a discussion forum leveraging TypeScript, React, and Redux, enabling thousands of users to engage and resolve issues effectively.
• Designed and implemented animated 3D property widgets, boosting user interactions with property listings by 22%.
• Guided and collaborated with a team of two developers, ensuring the successful delivery of projects under tight deadlines.`
            },
            {
                title: "Frontend Engineer | Domclick",
                subtitle: "2019 – 2020 | Moscow, Russia",
                content: `At Domclick, I focused on improving usability and streamlining support systems to enhance efficiency:
• Optimized the helpdesk UI, leading to a 20% reduction in customer support handling times.
• Introduced an AI-powered autocomplete system, enabling faster and more accurate responses for users.
• Standardized and unified client support forms, reducing maintenance efforts by 25% and ensuring easier integration of new features.
• Created a custom browser widget, allowing for seamless navigation across internal knowledge bases and improving agent workflows.`
            },
            {
                title: "Mission Control",
                subtitle: "Where Skills Are Born!",
                content: `<p>From Mission Control, I command a suite of tools and technologies to transform bold ideas into extraordinary solutions.</p>
<div class="skill-arsenal">
    
    
    <div class="skill-category">
        <div class="skill-category-title">Frontend & Backend Expertise</div>
        <div class="skill-list">
            <span class="skill-item">JavaScript</span>
            <span class="skill-item">TypeScript</span>
            <span class="skill-item">React</span>
            <span class="skill-item">Vue.js</span>
            <span class="skill-item">Next.js</span>
            <span class="skill-item">Node.js</span>
            <span class="skill-item">Express.js</span>
            <span class="skill-item">Ruby on Rails</span>
            <span class="skill-item">PostgreSQL</span>
            <span class="skill-item">MySQL</span>
            <span class="skill-item">MongoDB</span>
        </div>
    </div>

    <div class="skill-category">
        <div class="skill-category-title">Testing & Quality Assurance</div>
        <div class="skill-list">
            <span class="skill-item">Jest</span>
            <span class="skill-item">Cypress</span>
            <span class="skill-item">Playwright</span>
            <span class="skill-item">Storybook</span>
        </div>
    </div>

    <div class="skill-category">
        <div class="skill-category-title">Cloud Infrastructure & DevOps</div>
        <div class="skill-list">
            <span class="skill-item">AWS</span>
            <span class="skill-item">Kubernetes</span>
            <span class="skill-item">Docker</span>
            <span class="skill-item">GitLab CI/CD</span>
        </div>
    </div>

    <div class="skill-category">
        <div class="skill-category-title">Performance & Monitoring</div>
        <div class="skill-list">
            <span class="skill-item">Sentry</span>
            <span class="skill-item">Datadog</span>
        </div>
    </div>

    <div class="skill-category">
        <div class="skill-category-title">Build Tools & Version Control</div>
        <div class="skill-list">
            <span class="skill-item">Git</span>
            <span class="skill-item">Webpack</span>
            <span class="skill-item">Vite</span>
        </div>
    </div>

    <div class="skill-category">
        <div class="skill-category-title">Emerging Technologies</div>
        <div class="skill-list">
            <span class="skill-item">TensorFlow</span>
            <span class="skill-item">OpenAI APIs</span>
        </div>
    </div>

    <div class="skill-category">
        <div class="skill-category-title">Methodologies</div>
        <div class="skill-list">
            <span class="skill-item">Agile</span>
            <span class="skill-item">DevSecOps</span>
            <span class="skill-item">Scrum</span>
        </div>
    </div>
</div>`
            },
            {
                title: "Hobbies & Interests",
                subtitle: "Beyond the Code",
                content: `When I'm not engineering digital solutions, I embrace adventure:
• Sports: Continuously challenging myself both physically and mentally to grow stronger.
• Traveling: Immersing myself in new cultures and experiences to spark creativity and inspiration.
• Tech Enthusiasm: Staying curious and up-to-date with the latest innovations shaping the industry.
• Photography: Capturing moments and perspectives through the lens of technology.
• Gaming: Exploring virtual worlds and interactive experiences.`
            },
            {
                title: "You've reached the final stage! Congratulations!",
                subtitle: "Let's connect and create something extraordinary together!",
                content: `<br> Thank you for playing! I hope you enjoyed discovering more about my career journey and skills. It would be amazing to collaborate and create something extraordinary together. Connect with me via email or LinkedIn, I'd love to hear from you!`
            }
        ];

        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Show welcome screen when game starts
        this.showWelcomeScreen();
    }

    initializeGame() {
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.enemies = [];
        this.projectiles = [];
        this.isGameOver = false;
        this.milestoneIndex = 0;
        this.lastEnemySpawn = 0;
        this.enemySpawnInterval = 2000; // 2 seconds between enemy spawns
        this.boss = new Boss(this.canvas);
        this.isBossBattle = false;
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    spawnEnemy() {
        const now = Date.now();
        if (now - this.lastEnemySpawn >= this.enemySpawnInterval) {
            const enemy = new Enemy(
                this.canvas,
                Math.random() * (this.canvas.width - 80),
                50
            );
            this.enemies.push(enemy);
            this.lastEnemySpawn = now;
        }
    }

    update() {
        if (this.isGameOver) return;

        if (!this.isBossBattle) {
            this.spawnEnemy();
            // Update enemies
            this.enemies = this.enemies.filter(enemy => {
                enemy.update();
                // Remove enemies that are off screen (past the bottom)
                return enemy.y <= this.canvas.height + enemy.height;
            });
        } else {
            // Boss battle mode
            this.boss.update();
        }

        // Update projectiles
        this.projectiles = this.projectiles.filter(projectile => {
            projectile.update();
            return !projectile.isOffscreen();
        });

        // Check collisions
        this.checkCollisions();
    }

    checkCollisions() {
        this.projectiles.forEach((projectile, projectileIndex) => {
            if (this.isBossBattle) {
                // Check collision with boss
                if (this.isColliding(projectile, this.boss)) {
                    this.projectiles.splice(projectileIndex, 1);
                    if (this.boss.hit()) {
                        // Boss defeated
                        this.showVictoryScreen();
                    }
                }
            } else {
                // Check collisions with regular enemies
                this.enemies.forEach((enemy, enemyIndex) => {
                    if (this.isColliding(projectile, enemy)) {
                        this.projectiles.splice(projectileIndex, 1);
                        this.enemies.splice(enemyIndex, 1);
                        this.score += 100;
                        this.checkMilestone();
                        return;
                    }
                });
            }
        });
    }

    isColliding(projectile, enemy) {
        return projectile.x < enemy.x + enemy.width &&
               projectile.x + projectile.width > enemy.x &&
               projectile.y < enemy.y + enemy.height &&
               projectile.y + projectile.height > enemy.y;
    }

    checkMilestone() {
        if (this.score === 600 && !this.isBossBattle) { // After 6th milestone
            this.startBossBattle();
            return;
        }
        
        const scoreThresholds = [1, 2, 3, 4, 5, 6];
        if (scoreThresholds.includes(this.score / 100) && this.milestoneIndex < this.milestones.length) {
            this.showMilestone(this.milestones[this.milestoneIndex]);
            this.milestoneIndex++;
        }
    }

    showMilestone(milestone) {
        const overlay = document.getElementById('overlay');
        const title = overlay.querySelector('.milestone-title');
        const body = overlay.querySelector('.milestone-body');
        
        title.textContent = milestone.title;
        
        // Convert bullet points to proper list items
        const content = milestone.content.split('•').filter(item => item.trim());
        const formattedContent = content.length > 0 
            ? `<h3>${milestone.subtitle}</h3>
               <p>${content[0]}</p>
               <ul>
                   ${content.slice(1).map(item => `<li>${item.trim()}</li>`).join('')}
               </ul>`
            : `<h3>${milestone.subtitle}</h3><p>${milestone.content}</p>`;
            
        body.innerHTML = formattedContent;
        overlay.classList.remove('hidden');

        const closeButton = overlay.querySelector('.close-button');
        closeButton.onclick = () => {
            overlay.classList.add('hidden');
        };
    }

    startBossBattle() {
        this.isBossBattle = true;
        this.enemies = []; // Clear remaining enemies
        this.boss.activate();
        
        // Show boss introduction
        const overlay = document.getElementById('overlay');
        const title = overlay.querySelector('.milestone-title');
        const body = overlay.querySelector('.milestone-body');
        
        title.textContent = "Hobbies & Interests";
        body.innerHTML = `
            <h3>Beyond the Code</h3>
            <p>When I'm not engineering digital solutions, I embrace adventure:</p>
            <ul>
                <li>Sports: Continuously challenging myself both physically and mentally to grow stronger.</li>
                <li>Traveling: Immersing myself in new cultures and experiences to spark creativity and inspiration.</li>
                <li>Tech Enthusiasm: Staying curious and up-to-date with the latest innovations shaping the industry.</li>
                <li>Photography: Capturing moments and perspectives through the lens of technology.</li>
                <li>Gaming: Exploring virtual worlds and interactive experiences.</li>
            </ul>
            <p>Now it's time to defeat the mega boss to complete your mission!</p>`;
        overlay.classList.remove('hidden');

        const closeButton = overlay.querySelector('.close-button');
        closeButton.onclick = () => {
            overlay.classList.add('hidden');
        };
    }

    showVictoryScreen() {
        const overlay = document.getElementById('overlay');
        const title = overlay.querySelector('.milestone-title');
        const body = overlay.querySelector('.milestone-body');
        const closeButton = overlay.querySelector('.close-button');
        
        // Hide the continue/close button
        closeButton.style.display = 'none';
        
        const finalMilestone = this.milestones[this.milestones.length - 1];
        title.textContent = finalMilestone.title;
        body.innerHTML = `
            <div class="final-milestone">
                <h3>${finalMilestone.subtitle}</h3>
                <p>${finalMilestone.content}</p>
                <div class="contact-links">
                    <a href="mailto:dmitrii.lipko@gmail.com" class="contact-link">Email Me</a>
                    <a href="https://www.linkedin.com/in/dmitrii-lipko/" target="_blank" class="contact-link">LinkedIn</a>
                </div>
                <button id="playAgainBtn" class="play-again-btn">Play Again</button>
            </div>
        `;
        
        // Add event listener for the Play Again button
        const playAgainBtn = document.getElementById('playAgainBtn');
        playAgainBtn.onclick = () => {
            overlay.classList.add('hidden');
            this.resetGame();
            // Reset the close button display for future milestones
            closeButton.style.display = '';
        };
        
        overlay.classList.remove('hidden');
    }

    resetGame() {
        // Reset all game state
        this.initializeGame();
        
        // Clear the overlay content
        const overlay = document.getElementById('overlay');
        overlay.classList.add('hidden');
        
        // Reset score display
        document.getElementById('score-value').textContent = '0';
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.isBossBattle) {
            // Draw boss
            this.boss.draw(this.ctx);
        } else {
            // Draw regular enemies
            this.enemies.forEach(enemy => enemy.draw(this.ctx));
        }
        
        // Draw projectiles
        this.projectiles.forEach(projectile => projectile.draw(this.ctx));
        
        // Update score display
        document.getElementById('score-value').textContent = this.score;
    }

    addProjectile(x, y) {
        const projectile = new Projectile(x, y);
        this.projectiles.push(projectile);
    }

    gameOver() {
        this.isGameOver = true;
        // Show game over screen
        const overlay = document.getElementById('overlay');
        const title = overlay.querySelector('.milestone-title');
        const body = overlay.querySelector('.milestone-body');
        
        title.textContent = "Game Over";
        body.innerHTML = `<p>Final Score: ${this.score}</p><p>Thanks for playing!</p>`;
        overlay.classList.remove('hidden');
    }

    showWelcomeScreen() {
        const overlay = document.getElementById('overlay');
        const title = overlay.querySelector('.milestone-title');
        const body = overlay.querySelector('.milestone-body');
        const closeButton = overlay.querySelector('.close-button');
        
        // Hide the continue/close button
        closeButton.style.display = 'none';
        
        title.textContent = "Welcome to Dmitrii Lipko's Cosmic Quest!";
        body.innerHTML = `
            <div class="final-milestone">
                <h3>Your Mission Begins</h3>
                <p>The universe is brimming with mysteries, but alien obstacles stand in the way of uncovering them. As you take on challenges and overcome each alien, you'll unlock new insights into my skills, passions, and career journey.</p>
                <p>This isn't just a game—it's an exploration of creativity, innovation, and discovery. Together, let's face the aliens and unveil the extraordinary story that lies ahead.</p>
                <button id="startGameBtn" class="play-again-btn">Start Mission</button>
            </div>
        `;
        
        // Add event listener for the Start Mission button
        const startGameBtn = document.getElementById('startGameBtn');
        startGameBtn.onclick = () => {
            overlay.classList.add('hidden');
            // Reset the close button display for future milestones
            closeButton.style.display = '';
        };
        
        overlay.classList.remove('hidden');
    }
}

// Add click handler for the watermark
document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    gameContainer.addEventListener('click', (e) => {
        // Check if the click was on the watermark (::before element)
        if (e.target === gameContainer && e.offsetX > gameContainer.offsetWidth - 300 && e.offsetY > gameContainer.offsetHeight - 50) {
            window.open('https://www.linkedin.com/in/dmitrii-lipko/', '_blank');
        }
    });
}); 