# React Hub - Component Library & Development Environment

A comprehensive React + TypeScript + Vite development platform with built-in accessibility, testing, and design system support. Featuring Tailwind CSS, Storybook, Vitest, and GitHub Copilot integration for rapid component development.

## 🚀 Quick Start

### Prerequisites
- **Node.js** v24 or higher
- **npm** v10 or higher

### Installation & Local Development

```bash
# Clone and navigate to project
cd react-hub

# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev
```

## 📚 Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI library | 19.2.0 |
| **TypeScript** | Type safety and developer experience | 5.9.3 |
| **Vite** | Build tool, dev server with HMR | 7.2.4 |
| **Tailwind CSS** | Utility-first CSS framework | 4.1.18 |
| **React Router** | Client-side routing | 7.12.0 |
| **Axios** | HTTP client for API calls | 1.13.2 |
| **Storybook** | Component development environment | 10.1.11 |
| **Vitest** | Fast unit testing framework | 4.0.18 |
| **ESLint** | Code quality and consistency | 9.39.1 |
| **Testing Library** | Component testing utilities | Latest |

## 📂 Project Structure

```
react-hub/
├── src/
│   ├── components/          # Reusable UI components (organized by component)
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Tabs/
│   │   ├── Table/
│   │   └── ... (other components)
│   ├── pages/               # Page-level components
│   │   └── Login.tsx
│   ├── scripts/             # Utility scripts and helpers
│   │   ├── apiConnector.ts
│   │   ├── validationsService.ts
│   │   └── ...
│   ├── config/              # Configuration files (e.g., login.json)
│   ├── styles/              # Global styles and design tokens
│   │   ├── index.css
│   │   └── tokens.css
│   ├── test/                # Test setup and utilities
│   ├── assets/              # Static assets (images, fonts, etc.)
│   ├── App.tsx              # Main App component
│   ├── App.css              # App-level styles
│   ├── main.tsx             # Application entry point
│   └── index.css            # Root CSS imports
├── .github/
│   ├── instructions/        # Development guidelines and standards
│   │   ├── a11y.instructions.md
│   │   ├── code-review.instructions.md
│   │   ├── reactjs.instructions.md
│   │   └── prompt.instructions.md
│   ├── prompts/             # GitHub Copilot prompt templates
│   ├── design-system/       # Design tokens and component guidelines
│   └── agents/              # AI agent configurations
├── coverage/                # Test coverage reports
├── public/                  # Static files served as-is
├── eslint.config.js         # ESLint configuration
├── .prettierrc.json         # Prettier code formatting rules
├── tailwind.config.js       # Tailwind CSS customization
├── tsconfig.json            # TypeScript configuration
├── tsconfig.app.json        # TypeScript app-specific config
├── tsconfig.node.json       # TypeScript Node config
├── vite.config.ts           # Vite build configuration
├── vitest.config.ts         # Vitest testing configuration
├── vitest.setup.ts          # Vitest setup file
├── postcss.config.js        # PostCSS configuration for Tailwind
└── package.json             # Project dependencies and scripts
```

## ⚙️ Configuration

### Tailwind CSS

Tailwind CSS v4 is pre-configured with PostCSS for optimal styling:

1. **Tailwind directives** in `src/styles/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. **Import styles** in `src/main.tsx`:

```typescript
import './styles/index.css';
```

3. **Customize design tokens** in `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        // Custom color palette
      },
      spacing: {
        // Custom spacing scale
      },
      fontSize: {
        // Custom font sizes
      },
    },
  },
};
```

**Design Tokens**: Global design tokens are stored in `src/styles/tokens.css` for consistent theming.

### TypeScript

TypeScript configuration is split across multiple files for flexibility:

- **`tsconfig.json`** - Base TypeScript configuration
- **`tsconfig.app.json`** - Application-specific settings
- **`tsconfig.node.json`** - Node/build tool settings

### Code Quality

ESLint and Prettier enforce consistent code style and quality:

- **`.eslintrc.json`** - ESLint configuration with React and TypeScript support
- **`.prettierrc.json`** - Prettier code formatting rules
- Run `npm run lint` to check for issues
- ESLint will run automatically on file save in VS Code

## 📋 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with HMR on http://localhost:5173 |
| `npm run build` | Production build output to `dist/` (includes TypeScript type checking) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks on all source files |
| `npm test` | Run Vitest unit tests once |
| `npm run test:watch` | Run Vitest in watch mode for development |
| `npm run test:ui` | Launch Vitest UI dashboard (http://localhost:51204) |
| `npm run test:coverage` | Generate test coverage reports |

## 🧪 Testing

This project uses **Vitest** for fast, modern unit testing with native ESM support.

### Running Tests

```bash
# Run tests once
npm test

# Watch mode for development
npm run test:watch

# Interactive UI dashboard
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Files

Test files are located alongside components with `.test.tsx` extension:
- `src/components/Button/Button.test.tsx`
- `src/pages/Login.test.tsx`

**Coverage reports** are generated in `coverage/` directory after running `npm run test:coverage`.

### Testing Utilities

- **@testing-library/react** - Component testing utilities
- **@testing-library/jest-dom** - DOM matchers
- **jsdom** - DOM environment for testing
- **Vitest UI** - Visual test runner dashboard

## 📖 Development Standards & Best Practices

### Standards Documentation

Development standards are documented in `.github/instructions/`:

| File | Coverage | Purpose |
|------|----------|---------|
| **a11y.instructions.md** | Accessibility (WCAG 2.2 AA) | Creating accessible components for all users, including those using assistive technologies |
| **code-review.instructions.md** | Code quality, security, testing | Comprehensive code review guidelines covering architecture, performance, and best practices |
| **reactjs.instructions.md** | React patterns, hooks, best practices | React-specific development guidelines including component patterns and state management |
| **prompt.instructions.md** | Copilot prompt quality | Guidelines for creating high-quality prompts for GitHub Copilot |

### Component Development

When creating new components:

1. **Review standards** in `.github/instructions/` before starting
2. **Structure components** with clear separation of concerns
3. **Add accessibility attributes** (ARIA labels, semantic HTML)
4. **Include TypeScript types** for all props
5. **Write unit tests** for component logic
6. **Document with Storybook** for visual development

### Example Component Structure

```
components/MyComponent/
├── MyComponent.tsx          # Main component
├── MyComponent.stories.tsx  # Storybook stories
├── MyComponent.test.tsx     # Unit tests
└── index.ts                 # Barrel export
```

## 🎨 Storybook - Component Development Environment

Storybook is integrated for isolated component development and documentation.

### Creating Component Stories

Create a `.stories.tsx` file alongside your component:

```typescript
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Click me',
    variant: 'secondary',
  },
};
```

## 🤖 GitHub Copilot Integration

### Structured Prompts

Reusable prompt templates are available in `.github/prompts/` for common development tasks. These prompts are optimized with development standards to ensure consistent, high-quality output.

**Available Prompts:**

| File | Purpose |
|------|---------|
| `01-react-tw-vite-setup.prompt.md` | React, Tailwind, and Vite configuration setup |
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

### Using Prompts in Copilot Chat

Attach prompts and instruction files in GitHub Copilot Chat to enforce standards:

```markdown
@02-reusable-component.prompt.md 
@a11y.instructions.md 
@reactjs.instructions.md

Create an accessible Button component with size and variant support
```

This ensures generated code follows accessibility, React, and code quality standards automatically.

### GitHub Copilot Instructions

See `.github/copilot-instructions.md` for project-specific Copilot configuration and best practices.

## 🔒 Security & Performance

### Security Checklist

- No sensitive data (API keys, passwords, tokens) in source code
- All user inputs are validated and sanitized
- API calls use Axios with proper error handling
- Dependencies are regularly updated for security patches

### Performance Tips

- Use React code splitting via React Router
- Lazy load images and components
- Optimize Tailwind CSS output in production builds
- Monitor bundle size with Vite analysis tools
- Use React DevTools Profiler to identify bottlenecks

## 📦 Dependency Management

### Adding Dependencies

```bash
# Install production dependency
npm install package-name

# Install development dependency
npm install --save-dev package-name
```

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update
```

## 🔧 Development Workflow

1. **Create a feature branch** for your work
2. **Review standards** in `.github/instructions/`
3. **Use prompts** from `.github/prompts/` with Copilot Chat for consistency
4. **Write tests** alongside components
5. **Run linting** with `npm run lint` before committing
6. **Build locally** with `npm run build` to verify production output
7. **Follow commit conventions** with clear, descriptive messages

## 📝 Naming Conventions

- **Components**: PascalCase (e.g., `MyComponent.tsx`)
- **Files**: PascalCase for components, camelCase for utilities (e.g., `utils.ts`)
- **Variables/Functions**: camelCase (e.g., `handleClick`, `isActive`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_ITEMS = 100`)
- **CSS Classes**: kebab-case with Tailwind utilities

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Dev server runs on port 5173
# If occupied, Vite will use the next available port
```

### TypeScript Errors
```bash
# Type check before building
tsc -b

# Check specific file
tsc src/components/Button/Button.tsx
```

### ESLint Issues
```bash
# Run linter
npm run lint

# Auto-fix common issues
npm run lint -- --fix
```

### Test Failures
```bash
# Run tests with verbose output
npm test -- --reporter=verbose

# Debug in browser
npm run test:ui
```

## 🤝 Contributing

1. **Follow standards**: Review `.github/instructions/` before starting work
2. **Use prompts**: Leverage `.github/prompts/` templates with Copilot for consistency
3. **Write tests**: Ensure components have corresponding test files
4. **Lint code**: Run `npm run lint` to check code quality
5. **Build verification**: Ensure `npm run build` completes without errors
6. **Commit messages**: Follow conventional commits format
7. **Code review**: Request reviews from team members

## 📄 License

This project is part of the React Accelerators initiative. See LICENSE for details.

## 📞 Support & Resources

- **VS Code Extensions**: Install ESLint, Prettier, and Storybook extensions for better DX
- **Documentation**: Check `.github/instructions/` for detailed development guidelines
- **Storybook Docs**: See component stories for usage examples
- **Vitest Docs**: https://vitest.dev
- **Tailwind Docs**: https://tailwindcss.com
- **React Docs**: https://react.dev