import React from 'react';
import '../../../src/styles/tokens.css';

/**
 * Card Component
 * 
 * A versatile container component for displaying content with consistent styling.
 * Supports interactive and non-interactive modes with full design token integration.
 * 
 * When onClick/tabIndex are present, card becomes interactive (role="button").
 * When interactive, aria-hidden should NOT be used.
 * 
 * @example
 * <Card size="md" variant="elevation">
 *   <h2>Card Title</h2>
 *   <p>Card content</p>
 * </Card>
 * 
 * @example
 * <Card size="md" variant="outlined" onClick={handleClick} tabIndex={0}>
 *   Clickable card
 * </Card>
 */
export interface CardProps {
  /** Unique identifier for the card */
  id?: string;
  /** Additional CSS classes for style extension */
  className?: string;
  /** Tab index for keyboard navigation (makes card interactive) */
  tabIndex?: number;
  /** Additional size handled via CSS classes; remove `size` prop. */
  /** Visual variant - elevation uses shadow, outlined uses border */
  variant?: 'elevation' | 'outlined' | 'outlined-raised';
  /** Click handler (makes card interactive) */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Focus event handler */
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  /** Blur event handler */
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  /** Mouse enter event handler */
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Mouse leave event handler */
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
  /** HTML title attribute for tooltip */
  title?: string;
  /** Card content */
  children?: React.ReactNode;
  // ARIA attributes
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  /** When true, do not apply the variant's background/border styles so callers can control them via classes */
  disableVariantStyles?: boolean;
}

// Note: size is now controlled via `className` (responsive classes).

// Variant configuration using design tokens
const variantConfig = {
  elevation: {
    backgroundColor: 'var(--bg-surface)',
    boxShadow: 'var(--shadow-md)',
    border: 'none',
  },
  outlined: {
    backgroundColor: 'var(--bg-surface)',
    border: `var(--border-width-sm) solid var(--border-color)`,
    boxShadow: 'none',
  },
  'outlined-raised': {
    backgroundColor: 'var(--bg-surface)',
    border: `var(--border-width-sm) solid var(--border-color)`,
    boxShadow: 'var(--shadow-sm)',
  },
};

const Card: React.FC<CardProps> = ({
  id,
  disableVariantStyles = true,
  className = '',
  tabIndex,
  variant = 'elevation',
  onClick,
  onFocus,
  onBlur,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave: onMouseLeaveProp,
  title,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-hidden': ariaHidden,
  'aria-current': ariaCurrent,
  'aria-live': ariaLive,
  'aria-haspopup': ariaHaspopup,
}) => {
  const currentVariant = variantConfig[variant];

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 'var(--radius-lg)',
    transition: `all var(--transition-normal)`,
    color: 'var(--text-primary)',
  };

  const cardStyles: React.CSSProperties = disableVariantStyles
    ? baseStyles
    : {
        ...baseStyles,
        ...currentVariant,
      };

  // Determine if card is interactive (has click handler or is focusable)
  const isInteractive = Boolean(onClick || tabIndex !== undefined);

  // Interactive card with hover and focus states
  const interactiveStyles: React.CSSProperties = {
    ...cardStyles,
    cursor: 'pointer',
  };

  const getInteractiveStateStyles = (state: 'hover' | 'focus'): React.CSSProperties => {
    switch (state) {
      case 'hover':
        return {
          // backgroundColor: 'var(--bg-hover)',
          boxShadow:
            variant === 'elevation' || variant === 'outlined-raised'
              ? 'var(--shadow-lg)'
              : undefined,
        };
      case 'focus':
        return {
          outline: 'none',
          boxShadow: `var(--focus-ring)`,
        };
      default:
        return {};
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!isInteractive) return;
    Object.assign(e.currentTarget.style, getInteractiveStateStyles('hover'));
    onMouseEnterProp?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (!isInteractive) return;
    Object.assign(e.currentTarget.style, interactiveStyles);
    onMouseLeaveProp?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (!isInteractive) return;
    Object.assign(e.currentTarget.style, getInteractiveStateStyles('focus'));
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (!isInteractive) return;
    Object.assign(e.currentTarget.style, interactiveStyles);
    onBlur?.(e);
  };

  const commonProps = {
    id,
    style: isInteractive ? interactiveStyles : cardStyles,
    title,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-current': ariaCurrent,
    'aria-live': ariaLive,
    'aria-haspopup': ariaHaspopup,
  };

  return (
    <>
      {isInteractive ? (
        <button
          {...commonProps}
          className={className}
          tabIndex={tabIndex ?? 0}
          onClick={onClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </button>
      ) : (
        <div
          {...commonProps}
          className={className}
          aria-hidden={ariaHidden}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Card;
