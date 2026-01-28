import React, { useState } from 'react';
import '../../../src/styles/tokens.css';

/**
 * Accordion Component (Updated with Tokens)
 * 
 * A collapsible section component that expands/collapses to show/hide content.
 * Features smooth animations, customizable sizing and styling, with full design token integration.
 * 
 * @example
 * <Accordion title="Section 1" size="md" variant="outlined">
 *   <p>Content goes here</p>
 * </Accordion>
 */
export interface AccordionProps {
  /** Unique identifier for the accordion */
  id?: string;
  /** Additional CSS classes for style extension */
  className?: string;
  /** Title/header text for the accordion */
  children?: React.ReactNode;
  /** Header title text */
  title?: string;
  /** Control state - whether accordion is open */
  isOpen?: boolean;
  /** Callback triggered when accordion state changes */
  onChange?: (isOpen: boolean) => void;
  /** Component size - affects padding and text size */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant - elevation uses shadow, outlined uses border */
  variant?: 'elevation' | 'outlined';
  /** Disable user interaction */
  disabled?: boolean;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** ARIA labelledby for accessibility */
  'aria-labelledby'?: string;
  /** ARIA describedby for accessibility */
  'aria-describedby'?: string;
  /** ARIA hidden from accessibility tree */
  'aria-hidden'?: boolean;
  /** ARIA live region announcement */
  'aria-live'?: 'off' | 'polite' | 'assertive';
  /** ARIA invalid state */
  'aria-invalid'?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  id,
  className = '',
  title = 'Accordion Title',
  size = 'md',
  variant = 'outlined',
  isOpen: controlledIsOpen,
  onChange,
  disabled = false,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-hidden': ariaHidden,
  'aria-invalid': ariaInvalid,
  'aria-live': ariaLive,
}) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);

  // Support both controlled and uncontrolled modes
  const isOpen = controlledIsOpen ?? uncontrolledIsOpen;

  const handleToggle = () => {
    if (disabled) return;
    const newState = !isOpen;
    setUncontrolledIsOpen(newState);
    onChange?.(newState);
  };

  // Size configuration - maps to design tokens
  const sizeConfig: Record<'sm' | 'md' | 'lg', { padding: string; fontSize: string }> = {
    sm: {
      padding: 'var(--space-2) var(--space-3)',
      fontSize: 'var(--font-size-sm)',
    },
    md: {
      padding: 'var(--space-3) var(--space-4)',
      fontSize: 'var(--font-size-md)',
    },
    lg: {
      padding: 'var(--space-4) var(--space-5)',
      fontSize: 'var(--font-size-lg)',
    },
  };

  // Variant configuration - uses design tokens
  const variantConfig: Record<'elevation' | 'outlined', { boxShadow: string; border: string }> = {
    elevation: {
      boxShadow: 'var(--shadow-md)',
      border: 'none',
    },
    outlined: {
      border: 'var(--border-width-sm) solid var(--border-color)',
      boxShadow: 'none',
    },
  };

  const contentId = `${id || 'accordion'}-content`;
  const currentSize = sizeConfig[size] || sizeConfig.md;
  const currentVariant = variantConfig[variant] || variantConfig.outlined;

  const headerStyles: React.CSSProperties = {
    padding: currentSize.padding,
    fontSize: currentSize.fontSize,
    backgroundColor: 'var(--bg-muted)',
    color: 'var(--text-primary)',
    fontWeight: 'var(--font-weight-medium)',
    borderBottom: 'var(--border-width-sm) solid var(--border-color)',
    transition: `background-color var(--transition-normal)`,
    cursor: disabled ? 'var(--cursor-disabled)' : 'pointer',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
  };

  const contentWrapperStyles: React.CSSProperties = {
    overflow: 'hidden',
    transition: `all var(--transition-normal)`,
    maxHeight: isOpen ? 'var(--accordion-max-height)' : '0',
  };

  const contentStyles: React.CSSProperties = {
    padding: currentSize.padding,
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-secondary)',
  };

  const containerStyles: React.CSSProperties = {
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    ...currentVariant,
  };

  return (
    <div
      id={id}
      className={className}
      style={containerStyles}
      aria-live={ariaLive}
      aria-hidden={ariaHidden}
      aria-invalid={ariaInvalid}
    >
      {/* Header */}
      <button
        onClick={handleToggle}
        disabled={disabled}
        style={{
          ...headerStyles,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'left',
          outline: 'none',
        }}
        aria-expanded={isOpen}
        aria-controls={contentId} 
        aria-label={ariaLabel || title}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--bg-muted)';
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = 'var(--focus-ring)';
          e.currentTarget.style.borderRadius = 'var(--radius-lg)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <span>{title}</span>
        <svg
          style={{
            width: 'var(--space-5)',
            height: 'var(--space-5)',
            transition: `transform var(--transition-normal)`,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
            stroke: 'var(--text-primary)',
          }}
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {/* Content */}
      <div
        id={contentId}
        style={contentWrapperStyles}
        role="region"
        aria-labelledby={id ? `${id}-button` : undefined}
      >
        <div style={contentStyles}>
          {children || <p>Accordion content goes here.</p>}
        </div>
      </div>
    </div>
  );
};

export default Accordion;