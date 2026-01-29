/**
 * Test Utilities Setup
 * 
 * Provides common test utilities and helpers for React component testing.
 * Includes render function wrapper and custom matchers.
 */

import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

/**
 * Custom render function wrapper
 * 
 * Wraps React Testing Library's render to include common providers/wrappers
 * such as Redux, theme providers, etc. (Add as needed)
 * 
 * @param ui - Component to render
 * @param options - RTL render options
 * @returns Render result with all testing utilities
 */
function render(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return rtlRender(ui, {
    ...options,
  })
}

export * from '@testing-library/react'
export { render }
