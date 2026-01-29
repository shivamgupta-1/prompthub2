import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

/**
 * Vitest Configuration
 * 
 * Configures Vitest for unit and integration testing of React components.
 * Includes:
 * - jsdom environment for DOM testing
 * - React Testing Library setup
 * - Global test utilities
 * - Code coverage configuration
 */
export default defineConfig({
  plugins: [react()],
  test: {
    // Use jsdom environment for DOM testing
    environment: 'jsdom',
    
    // Global test setup files
    setupFiles: ['./vitest.setup.ts'],
    
    // Enable global test APIs (describe, it, expect, etc.)
    globals: true,
    
    // Code coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        '.storybook/',
        '**/*.stories.tsx',
        '**/*.stories.ts',
      ],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
    
    // Test include patterns
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    
    // Test exclude patterns
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
