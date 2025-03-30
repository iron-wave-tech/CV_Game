# Dmitrii Lipko's Interactive CV Space Game

An interactive space-themed CV game built with HTML5 Canvas and JavaScript.

## Setup and Installation

### Prerequisites
- Git installed on your system
- GitHub account
- Basic knowledge of terminal commands

### Local Setup
1. Clone the repository:
```bash
git clone https://github.com/yourusername/dmitrii_cv_space.git
cd dmitrii_cv_space
```

2. Open the project in your preferred code editor

3. To run locally, you can use any local server. For example:
   - Using Python: `python -m http.server 8000`
   - Using Node.js: `npx serve`
   - Using VS Code's Live Server extension

### Pushing to GitHub

1. Initialize Git in your project (if not already done):
```bash
git init
```

2. Create a `.gitignore` file:
```bash
echo "node_modules/" > .gitignore
echo ".DS_Store" >> .gitignore
```

3. Add your files to Git:
```bash
git add .
```

4. Commit your changes:
```bash
git commit -m "Initial commit"
```

5. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name your repository (e.g., "dmitrii_cv_space")
   - Don't initialize with README (since we already have one)
   - Click "Create repository"

6. Link your local repository to GitHub:
```bash
git remote add origin https://github.com/yourusername/dmitrii_cv_space.git
```

7. Push your code to GitHub:
```bash
git push -u origin main
```

### Updating the Project

After making changes to your code:

1. Stage your changes:
```bash
git add .
```

2. Commit your changes:
```bash
git commit -m "Description of your changes"
```

3. Push to GitHub:
```bash
git push
```

## Project Structure

```
dmitrii_cv_space/
├── index.html
├── styles.css
├── js/
│   └── game.js
└── README.md
```

## Features

- Interactive space-themed CV game
- Responsive design
- Skill showcase with visual effects
- Mobile-friendly controls
- Animated starfield background
- Interactive elements with hover effects

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Canvas API
- Google Fonts (Press Start 2P)

## Customization

### Adjusting the Watermark Position

To modify the position of the "A Dmitrii Lipko Production" watermark:

1. Open `styles.css`
2. Find the `#game-container::before` selector
3. Adjust the position using these properties:
```css
#game-container::before {
    top: 35px;    /* Adjust vertical position */
    right: 10px;  /* Adjust horizontal position */
}
```

- Increase `top` value to move it down
- Decrease `top` value to move it up
- Increase `right` value to move it left
- Decrease `right` value to move it right

## License

This project is open source and available under the MIT License. 