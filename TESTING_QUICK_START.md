# Vitest Quick Start Guide

## 🎯 What is Vitest?

Vitest is a blazingly fast unit testing framework powered by Vite. It provides:
- Lightning-fast test execution
- ESM-first support with TypeScript
- Jest-compatible API
- Minimal configuration
- React Testing Library integration

## ⚡ Quick Commands

```bash
# Watch mode (development)
npm run test

# Run all tests once
npm run test -- --run

# Visual UI dashboard
npm run test:ui

# Code coverage report
npm run test:coverage

# Run specific test file
npm run test -- Button.test.tsx

# Filter tests by name
npm run test -- -t "should render"
```

## 🧪 Writing Your First Test

Create a file: `src/components/MyComponent/MyComponent.test.tsx`

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders with text', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles clicks', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<MyComponent onClick={handleClick} />)
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalled()
  })
})
```

## 🔍 Common Testing Patterns

### Testing Clicks
```typescript
it('should handle button click', async () => {
  const handleClick = vi.fn()
  const user = userEvent.setup()
  
  render(<MyButton onClick={handleClick}>Click me</MyButton>)
  await user.click(screen.getByRole('button'))
  
  expect(handleClick).toHaveBeenCalledOnce()
})
```

### Testing Forms
```typescript
it('should submit form', async () => {
  const handleSubmit = vi.fn()
  const user = userEvent.setup()
  
  render(<MyForm onSubmit={handleSubmit} />)
  
  await user.type(screen.getByLabelText('Name'), 'John')
  await user.click(screen.getByRole('button', { name: /submit/i }))
  
  expect(handleSubmit).toHaveBeenCalled()
})
```

### Testing Async Operations
```typescript
it('should load data', async () => {
  vi.mock('./api', () => ({
    fetchData: vi.fn(() => Promise.resolve({ id: 1 }))
  }))
  
  render(<DataComponent />)
  
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument()
  })
})
```

### Mocking Props & Functions
```typescript
const mockCallback = vi.fn()
render(<Component onEvent={mockCallback} disabled={true} />)

expect(mockCallback).toHaveBeenCalledWith('expected-value')
```

### Testing Visibility
```typescript
it('should show/hide element', async () => {
  const user = userEvent.setup()
  
  render(<ToggleComponent />)
  expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  
  await user.click(screen.getByRole('button'))
  expect(screen.getByText('Hidden')).toBeInTheDocument()
})
```

## 🎨 Using Accessibility Queries (Best Practice)

```typescript
// ✅ GOOD - Test what users see
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText('Email')
screen.getByPlaceholderText('Enter name')
screen.getByText('Welcome')

// ❌ AVOID - Implementation details
screen.getByTestId('submit-button')
screen.getByClassName('form-input')
```

## 🧩 Mocking APIs

### Mock a module
```typescript
vi.mock('@/api/service', () => ({
  fetchUsers: vi.fn(() => Promise.resolve([
    { id: 1, name: 'John' }
  ]))
}))
```

### Mock a function
```typescript
const mockFn = vi.fn()
mockFn.mockReturnValue('default')
mockFn.mockResolvedValue({ data: 'test' })
```

### Clear mocks between tests
```typescript
afterEach(() => {
  vi.clearAllMocks()
})
```

## 📊 Code Coverage

```bash
# Generate coverage report
npm run test:coverage

# Reports generated:
# - Terminal output
# - coverage/index.html (open in browser)
# - coverage/lcov.info (for CI/CD tools)
```

Target thresholds (configurable in `vitest.config.ts`):
- Lines: 80%
- Functions: 80%
- Branches: 80%
- Statements: 80%

## 🐛 Debugging Tests

### Debug in terminal
```bash
npm run test -- --inspect-brk
```

### Add console logs
```typescript
it('debug test', () => {
  const value = getValue()
  console.log('Value:', value) // View in test output
  expect(value).toBe('expected')
})
```

### VS Code debugging
Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "test"],
  "console": "integratedTerminal"
}
```

## 📋 Test Checklist

Before committing tests:

- [ ] All tests pass: `npm run test -- --run`
- [ ] No console errors or warnings
- [ ] Code coverage acceptable: `npm run test:coverage`
- [ ] Used accessibility queries (getByRole, getByLabelText)
- [ ] Mocked external dependencies
- [ ] Tests are isolated (no shared state)
- [ ] Edge cases covered (error, loading, empty states)
- [ ] Clear descriptive test names
- [ ] No hardcoded selectors (getByTestId)

## 🛠️ Configuration Files

- `vitest.config.ts` - Main configuration
- `vitest.setup.ts` - Global setup and mocks
- `src/test/setup.ts` - Custom render function
- `tsconfig.app.json` - TypeScript config with Vitest types

## 📚 Resources

- [Full Testing Guide](./TESTING.md)
- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://testing-library.com/docs/queries/about/)

## ❓ FAQ

**Q: Why Vitest over Jest?**
A: Vitest is faster, uses your existing Vite config, and has better ESM support.

**Q: Do I need test IDs?**
A: No! Use accessible queries first (getByRole, getByLabelText). Only use testId as a last resort.

**Q: How do I test loading states?**
A: Mock the API to return a promise, then use `waitFor()` to wait for the component to update.

**Q: Can I test custom hooks?**
A: Yes! Use `@testing-library/react` with `renderHook()` - see [React Testing Library docs](https://testing-library.com/docs/react-testing-library/example-intro).

**Q: How do I test Redux/Context?**
A: Wrap your component with the provider in the test's render function.

---

**Ready to test?** Start with: `npm run test:watch`
