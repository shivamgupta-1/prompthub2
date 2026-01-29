# Vitest Setup Guide

## Overview

Vitest has been configured for unit and integration testing of React components in this project. It uses React Testing Library for testing components with an emphasis on accessibility and user interactions.

## What Was Installed

```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Packages

- **vitest** - Fast unit test framework powered by Vite
- **@vitest/ui** - UI dashboard for running and visualizing tests
- **@testing-library/react** - Utilities for testing React components
- **@testing-library/jest-dom** - Jest DOM matchers for Vitest
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - DOM implementation for Node.js

## Configuration Files

### vitest.config.ts
Main Vitest configuration file with:
- jsdom environment for DOM testing
- Global test setup file
- Code coverage settings (80% target)
- Test file patterns

### vitest.setup.ts
Global test setup including:
- Jest-DOM matchers registration
- window.matchMedia mock
- localStorage and sessionStorage mocks
- Automatic cleanup after each test

### src/test/setup.ts
Test utility file with custom render function wrapper for common providers/wrappers.

## NPM Scripts

```bash
# Run tests in watch mode (default)
npm run test

# Run tests in watch mode with file watching
npm run test:watch

# Run tests with UI dashboard
npm run test:ui

# Generate code coverage report
npm run test:coverage
```

## Writing Tests

### Basic Test Structure

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should handle user interactions', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<MyComponent onClick={handleClick} />)
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### Best Practices

1. **Use Accessibility Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
2. **Test User Behavior**: Test what users see and do, not implementation details
3. **Use userEvent**: More realistic than fireEvent for user interactions
4. **Mock External Dependencies**: Use `vi.mock()` or `vi.fn()` for APIs and services
5. **Cover Edge Cases**: Test happy paths, errors, loading states, and edge cases
6. **Cleanup**: Tests auto-cleanup between runs via `vitest.setup.ts`

### Example Test File

See `src/components/Button/Button.test.tsx` for a complete example.

## Code Coverage

Generate coverage reports with:

```bash
npm run test:coverage
```

Coverage reports are generated in:
- Console output
- `coverage/` directory (HTML report)
- `coverage/lcov.info` (LCOV format for CI/CD)

Target coverage is 80% for lines, functions, branches, and statements.

## Testing Patterns

### Mocking APIs

```typescript
import { vi } from 'vitest'

vi.mock('@/scripts/apiConnector', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'test' }))
}))
```

### Testing Async Operations

```typescript
import { waitFor } from '@testing-library/react'

it('should fetch and display data', async () => {
  render(<MyComponent />)
  
  await waitFor(() => {
    expect(screen.getByText('Loaded Data')).toBeInTheDocument()
  })
})
```

### Testing Form Submission

```typescript
const user = userEvent.setup()

it('should submit form', async () => {
  render(<FormComponent />)
  
  await user.type(screen.getByLabelText('Name'), 'John')
  await user.click(screen.getByRole('button', { name: /submit/i }))
  
  expect(handleSubmit).toHaveBeenCalled()
})
```

## UI Dashboard

Run tests with visual UI:

```bash
npm run test:ui
```

Opens at `http://localhost:51204` with:
- Real-time test execution
- Test filtering and search
- Coverage visualization
- Error details and stack traces

## TypeScript Support

Full TypeScript support is configured in `tsconfig.app.json` with:
- Vitest globals types
- Testing Library types
- Jest-DOM types

## Next Steps

1. Write tests for existing components using the patterns above
2. Integrate with CI/CD pipeline
3. Set coverage thresholds in `vitest.config.ts`
4. Review [React Testing Library docs](https://testing-library.com/react)
5. Check [Vitest docs](https://vitest.dev/) for advanced features

## Troubleshooting

### Tests not found
- Ensure test files follow pattern: `**/*.{test,spec}.{ts,tsx}`
- Check `vitest.config.ts` for include/exclude patterns

### Module not found in tests
- Add path alias to `vitest.config.ts` resolve section
- Update `tsconfig.app.json` with path mappings

### Async test timeout
- Increase timeout: `it('name', async () => {}, 10000)`
- Use `waitFor` with custom timeout: `waitFor(() => {...}, { timeout: 5000 })`

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about/)
- [Jest-DOM Matchers](https://github.com/testing-library/jest-dom)
