# React + TypeScript + Vite

Minimal setup for React with Vite, HMR, TypeScript, Tailwind CSS, and ESLint.

## Quick Start

### Prerequisites
- Node.js v24+
- npm

### Installation & Local Project Setup

```bash
cd react-hub
npm install
npm run dev
```

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety and developer experience
- **Vite** - Build tool and dev server with HMR
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **ESLint** - Code quality and consistency
- **Storybook** - Component development environment

## Project Structure

```
react-hub/
├── src/
│   ├── CommonComponents/    # Reusable UI components
│   ├── scripts/       # Utility scripts and helpers
│   ├── config/              # Configuration files
│   ├── pages/               # Page components
│   ├── styles/              # Global styles
│   ├── assets/              # Static assets (images, fonts, etc.)
│   ├── App.tsx              # Main App component
│   └── main.tsx             # Application entry point
├── .github/
│   ├── design-system/       # Design tokens and component guidelines
│   ├── agents/              # AI agent configurations and workflows
│   ├── prompts/             # Copilot prompt templates
│   └── instructions/        # Development guidelines and standards
├── public/                  # Static files served as-is
├── .eslintrc.json           # ESLint configuration
├── .prettierrc.json         # Prettier code formatting rules
├── tailwind.config.js       # Tailwind CSS customization
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
└── package.json             # Project dependencies and scripts
```

## Configuration

### Tailwind CSS Setup

Tailwind CSS is pre-configured. To customize:

1. **Add Tailwind directives** to `src/styles/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. **Import CSS in `src/main.tsx`**:

```typescript
import './styles/index.css';
```

3. **Customize** in `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: { /* ... */ },
      spacing: { /* ... */ },
    },
  },
};
```

### Code Quality

ESLint and Prettier are configured to enforce consistent code style. Configuration files:
- `.eslintrc.json` - Linting rules
- `.prettierrc.json` - Code formatting rules

## Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with HMR on port 5173 |
| `npm run build` | Production build output to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks on source files |

## Development Guidelines

### Standards & Best Practices

Development standards are documented in `.github/instructions/`:

| File | Coverage |
|------|----------|
| `a11y.instructions.md` | WCAG 2.2 Level AA accessibility requirements |
| `code-review.instructions.md` | Code quality, security, and testing standards |
| `reactjs.instructions.md` | React patterns, hooks, and best practices |

### GitHub Copilot Integration

#### Structured Prompts (`.github/prompts/`)

Reusable prompt templates for common development tasks:

| Prompt | Purpose |
|--------|---------|
| `01-react-tw-vite-setup.prompt.md` | React, Tailwind, and Vite configuration |
| `02-reusable-component.prompt.md` | Create reusable React components with TypeScript |
| `03-figma-to-code.prompt.md` | Convert Figma designs to React components |
| `04-image-code.prompt.md` | Generate code from images or screenshots |
| `05-json-driven-form-page.prompt.md` | Generate forms and pages from JSON schemas |
| `06-unit-testing.prompt.md` | Write unit tests for components and utilities |
| `07-code-formatting.prompt.md` | Format code consistently across the project |
| `08-linting.prompt.md` | Configure and run ESLint checks |
| `09-git-commit-messages.prompt.md` | Write conventional commit messages |
| `10-react-security-review.prompt.md` | Security review and vulnerability fixes |
| `11-code-validation.prompt.md` | Form input validation and error handling |
| `12-review-and-refactor.prompt.md` | Review and refactor existing code |

#### Using Prompts & Instructions

Attach prompts and instructions in Copilot Chat for enforced standards:

```
@02-reusable-component.prompt.md @a11y.instructions.md @reactjs.instructions.md
Create an accessible Button component with size and variant support
```

This ensures generated code follows accessibility, React, and code quality standards.

## Contributing

1. **Follow standards**: Review `.github/instructions/` before starting work
2. **Use prompts**: Leverage `.github/prompts/` templates for common tasks
3. **Lint code**: Run `npm run lint:fix` to auto-correct issues
4. **Test builds**: Ensure `npm run build` completes without errors
5. **Commit messages**: Follow conventional commits (run `npm run lint` on commit)