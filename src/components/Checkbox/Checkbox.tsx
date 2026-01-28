import React, { useState } from 'react';
import '../../../src/styles/tokens.css';

/**
 * Checkbox Component
 *
 * A reusable, accessible Checkbox component with full design token integration.
 * Supports both controlled and uncontrolled modes with complete ARIA accessibility.
 * Uses CSS variables from tokens.css for consistent styling across the application.
 *
 * @example
 * <Checkbox
 *   id="agree"
 *   label="I agree to terms"
 *   onChange={(e) => console.log(e.target.checked)}
 *   size="md"
 *   variant="outline"
 * />
 */
export interface CheckboxProps {
  /** Unique identifier for the checkbox */
  id?: string;
  /** HTML name attribute */
  name?: string;
  /** Additional CSS classes for style extension */
  className?: string;
  /** HTML value attribute */
  value?: string | number;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Checked state (controlled) */
  checked?: boolean;
  /** Label text displayed next to checkbox */
  label?: string;
  /** Mark checkbox as required */
  required?: boolean;
  /** Disable user interaction */
  disabled?: boolean;
  /** Checkbox size - affects visual dimensions */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant - outline or filled */
  variant?: 'outline' | 'filled';
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** Click event handler */
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  /** Change event handler */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Focus event handler */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /** Blur event handler */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  // ARIA attributes for accessibility
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean;
  'aria-disabled'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      name,
      className = '',
      value,
      defaultChecked,
      checked,
      label,
      required = false,
      disabled = false,
      size = 'md',
      variant = 'outline',
      tabIndex,
      onClick,
      onChange,
      onFocus,
      onBlur,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-hidden': ariaHidden,
      'aria-disabled': ariaDisabled,
      'aria-live': ariaLive,
      'aria-invalid': ariaInvalid,
      'aria-required': ariaRequired,
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked || false);

    // Support both controlled and uncontrolled modes
    const isChecked = checked ?? uncontrolledChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setUncontrolledChecked(e.target.checked);
      }
      onChange?.(e);
    };

    // Size configuration using design tokens
    const sizeConfig = {
      sm: {
        width: '20px',
        height: '20px',
        fontSize: 'var(--font-size-xs)',
      },
      md: {
        width: '24px',
        height: '24px',
        fontSize: 'var(--font-size-sm)',
      },
      lg: {
        width: '28px',
        height: '28px',
        fontSize: 'var(--font-size-md)',
      },
    };

    // Variant configuration using design tokens
    const variantConfig = {
      outline: {
        border: `var(--border-width-sm) solid var(--border-color)`,
        backgroundColor: 'var(--bg-surface)',
      },
      filled: {
        border: 'none',
        backgroundColor: 'var(--bg-muted)',
      },
    };

    const currentSize = sizeConfig[size];
    const currentVariant = variantConfig[variant];
    const checkboxId = id || 'checkbox';

    // Checkbox container styles
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      cursor: disabled ? 'var(--cursor-disabled)' : 'pointer',
    };

    // Custom checkbox display styles
    const checkboxDisplayStyles: React.CSSProperties = {
      width: currentSize.width,
      height: currentSize.height,
      borderRadius: 'var(--radius-md)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'var(--cursor-disabled)' : 'pointer',
      transition: `all var(--transition-normal)`,
      backgroundColor: isChecked ? 'var(--color-primary)' : currentVariant.backgroundColor,
      border: isChecked ? `var(--border-width-sm) solid var(--color-primary)` : currentVariant.border,
      flexShrink: 0,
    };

    // Label styles
    const labelStyles: React.CSSProperties = {
      fontSize: currentSize.fontSize,
      color: 'var(--text-primary)',
      cursor: disabled ? 'var(--cursor-disabled)' : 'pointer',
      userSelect: 'none',
      fontWeight: 'var(--font-weight-regular)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-1)',
    };

    const requiredIndicatorStyles: React.CSSProperties = {
      color: 'var(--color-error)',
      marginLeft: 'var(--space-1)',
      fontWeight: 'var(--font-weight-medium)',
    };

    const svgStyles: React.CSSProperties = {
      width: '60%',
      height: '60%',
      transition: `opacity var(--transition-fast)`,
    };

    return (
      <div style={containerStyles} className={className}>
        {/* Hidden native checkbox for accessibility */}
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          name={name}
          value={value}
          // defaultChecked={defaultChecked}
          checked={isChecked}
          disabled={disabled}
          required={required}
          tabIndex={tabIndex}
          onChange={handleChange}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          className="sr-only"
          aria-label={ariaLabel || label}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          aria-hidden={ariaHidden}
          aria-disabled={ariaDisabled ?? disabled}
          aria-live={ariaLive}
          aria-invalid={ariaInvalid}
          aria-required={ariaRequired ?? required}
        />

        {/* Custom checkbox display */}
        <label
          htmlFor={checkboxId}
          style={checkboxDisplayStyles}
          onMouseEnter={(e) => {
            if (!disabled) {
              (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
              if (!isChecked) {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color-hover)';
              }
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            if (!isChecked) {
              (e.currentTarget as HTMLElement).style.borderColor = `var(--border-color)`;
            }
          }}
          onFocus={(e) => {
            if (!disabled) {
              (e.currentTarget as HTMLElement).style.boxShadow = 'var(--focus-ring)';
            }
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          {isChecked && (
            <svg
              style={svgStyles}
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </label>

        {/* Label text */}
        {label && (
          <label htmlFor={checkboxId} style={labelStyles}>
            {label}
            {required && <span style={requiredIndicatorStyles}>*</span>}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
