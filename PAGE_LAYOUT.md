# ClickyGame - Proposed Page Layout

This document outlines the semantic HTML structure for the ClickyGame, following best practices for accessibility and maintainability.

## HTML Structure

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ClickyGame</title>
    <!-- CSS will be included via Next.js styling system -->
</head>
<body>
    <!-- App Container -->
    <div id="app" class="app-container">
        <!-- Header Section -->
        <header class="game-header">
            <h1 class="game-title">ClickyGame</h1>
            <div class="game-controls">
                <button class="reset-button" aria-label="Reset Game">
                    <span class="reset-icon">↺</span>
                    <span class="reset-text">Reset Game</span>
                </button>
                <button class="theme-toggle" aria-label="Toggle Light/Dark Theme">
                    <span class="theme-icon">☀️</span>
                    <span class="theme-text">Light</span>
                </button>
            </div>
        </header>

        <!-- Main Game Area -->
        <main class="game-content">
            <!-- Score Display Section -->
            <section class="score-section">
                <h2 class="score-label">Your Clicky Score:</h2>
                <div class="score-display" aria-live="polite">0</div>
            </section>
            
            <!-- Game Controls Section -->
            <section class="game-interaction">
                <button class="click-button" aria-label="Click to score points">
                    Click Me!
                </button>
            </section>
        </main>

        <!-- Footer (optional, not shown in design) -->
        <footer class="game-footer">
            <p class="copyright">© 2025 ClickyGame</p>
        </footer>
    </div>
</body>
</html>
```

## Component Breakdown

In a Next.js/React implementation, this HTML structure would be broken down into the following components:

### Layout Component
```jsx
// components/Layout/Layout.tsx
const Layout = ({ children }) => (
  <div className="app-container">
    <Header />
    <main className="game-content">
      {children}
    </main>
    <Footer />
  </div>
);
```

### Header Component
```jsx
// components/Header/Header.tsx
const Header = () => (
  <header className="game-header">
    <h1 className="game-title">ClickyGame</h1>
    <div className="game-controls">
      <ResetButton />
      <ThemeToggle />
    </div>
  </header>
);
```

### Score Display Component
```jsx
// components/ScoreDisplay/ScoreDisplay.tsx
const ScoreDisplay = ({ score }) => (
  <section className="score-section">
    <h2 className="score-label">Your Clicky Score:</h2>
    <div className="score-display" aria-live="polite">{score}</div>
  </section>
);
```

### Click Button Component
```jsx
// components/ClickButton/ClickButton.tsx
const ClickButton = ({ onClick }) => (
  <section className="game-interaction">
    <button 
      className="click-button" 
      aria-label="Click to score points"
      onClick={onClick}
    >
      Click Me!
    </button>
  </section>
);
```

## CSS Structure Guide

The CSS should be organized with a focus on:

1. **Global Styles**: Theme variables, reset styles, typography
2. **Component-Specific Styles**: Modular CSS for each component
3. **Utility Classes**: Reusable classes for common patterns

### Example CSS Variables (in globals.css)

```css
:root {
  /* Dark Theme (Default) */
  --bg-primary: #121212;
  --bg-secondary: #1e1e1e;
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --accent-color: #ff4d4d;
  --button-bg: #ffffff;
  --button-text: #121212;
  --header-border: #333333;
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f0f0f0;
  --text-primary: #121212;
  --text-secondary: #555555;
  --accent-color: #ff4d4d;
  --button-bg: #121212;
  --button-text: #ffffff;
  --header-border: #dddddd;
}
```

### Responsive Design Approach

The layout should be built with a mobile-first approach, using:

1. **Flexible containers**: Using percentages and relative units
2. **Media queries**: For major layout shifts at common breakpoints
3. **CSS Grid/Flexbox**: For responsive placement of elements

### Animation Considerations

1. **Click feedback**: Small scale animation on the click button
2. **Score updates**: Subtle animation when the score changes
3. **Theme transition**: Smooth transition between light/dark themes

## Accessibility Considerations

1. Use proper heading hierarchy (`h1`, `h2`, etc.)
2. Include appropriate ARIA attributes
3. Ensure sufficient color contrast between text and backgrounds
4. Make interactive elements keyboard accessible
5. Use `aria-live` regions for dynamically updated content (score)
