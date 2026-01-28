import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import '../../../src/styles/tokens.css';

/**
 * List Component
 *
 * A reusable, accessible list component with full design token integration.
 * Renders a semantic `<ul>` element with customizable styling and ARIA support.
 * The `<ul>` element has implicit list role, no need to add role="list".
 *
 * @example
 * <List>
 *   <ListItem>Item 1</ListItem>
 *   <ListItem>Item 2</ListItem>
 * </List>
 */
export interface ListProps {
  /** Unique identifier for the list */
  id?: string;
  /** Additional CSS classes for style extension */
  className?: string;
  /** HTML title attribute for tooltip */
  title?: string;
  /** Disable the list (visual indicator) */
  disabled?: boolean;
  /** List content - typically ListItem components */
  children?: React.ReactNode;
  // ARIA attributes for accessibility
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-controls'?: string;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-disabled'?: boolean;
}

const List = forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  const {
    id,
    className = '',
    title,
    disabled = false,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-controls': ariaControls,
    'aria-live': ariaLive = 'off',
    'aria-disabled': ariaDisabled,
    children,
  } = props;

  const innerRef = useRef<HTMLUListElement | null>(null);
  useImperativeHandle<HTMLUListElement | null, HTMLUListElement | null>(ref, () => innerRef.current);

  // Styles using design tokens
  const listStyles: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
    backgroundColor: 'var(--bg-surface)',
    borderRadius: 'var(--radius-lg)',
    border: `var(--border-width-sm) solid var(--border-color)`,
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    transition: `all var(--transition-normal)`,
  };

  return (
    <ul
      ref={innerRef}
      id={id}
      style={listStyles}
      className={className}
      title={title}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-controls={ariaControls}
      aria-live={ariaLive}
      aria-disabled={ariaDisabled ?? disabled}
    >
      {children}
    </ul>
  );
});

List.displayName = 'List';

export default List;
