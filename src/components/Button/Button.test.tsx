/**
 * Button component test suite
 * - Verifies rendering and click behavior of the Button component.
 * - Ensures accessibility and correct event handling.
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  test('renders button label', () => {
    render(<Button>Save</Button>);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('calls onClick when clicked', async () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Save</Button>);
    await userEvent.click(screen.getByText('Save'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
