/**
 * RadioGroup Component
 *
 * A container component for managing a group of radio button inputs.
 * Supports proper accessibility through ARIA attributes and semantic HTML structure.
 * Radio button children should be wrapped in label elements with input[type="radio"] elements.
 *
 * @example
 * ```tsx
 * <RadioGroup label="Choose an option" size="md">
 *   <label>
 *     <input type="radio" name="options" value="option1" />
 *     Option 1
 *   </label>
 *   <label>
 *     <input type="radio" name="options" value="option2" />
 *     Option 2
 *   </label>
 * </RadioGroup>
 * ```
 */

import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import '../../../src/styles/tokens.css';

export interface RadioGroupProps {
  /** Unique identifier for the component */
  id?: string;

  /** Additional CSS classes for custom styling */
  className?: string;

  /** Label text displayed above or beside the radio group */
  label?: React.ReactNode;

  /** Indicates if this radio group is required */
  required?: boolean;

  /** Disables all radio buttons in the group */
  disabled?: boolean;

  /** Shows error state styling */
  error?: boolean;

  /** Size of the radio group - 'sm' (small), 'md' (medium), 'lg' (large) */
  size?: 'sm' | 'md' | 'lg';

  /** Ref to the container div element */
  inputRef?: React.Ref<HTMLDivElement>;

  /** Called when focus enters the radio group */
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;

  /** Called when focus leaves the radio group */
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;

  /** Accessibility label for screen readers */
  'aria-label'?: string;

  /** ID of element that labels this radio group */
  'aria-labelledby'?: string;

  /** ID of element that describes this radio group */
  'aria-describedby'?: string;

  /** Orientation of the radio group - horizontal or vertical */
  'aria-orientation'?: 'horizontal' | 'vertical';

  /** Radio button items - typically label elements containing input[type="radio"] */
  children?: React.ReactNode;
}

const sizeConfig: Record<'sm' | 'md' | 'lg', { gap: number; fontSize: string }> = {
  sm: { gap: 8, fontSize: 'var(--font-size-sm)' },
  md: { gap: 12, fontSize: 'var(--font-size-md)' },
  lg: { gap: 16, fontSize: 'var(--font-size-lg)' },
};

/**
 * RadioGroup Component
 *
 * Container for radio button inputs with built-in accessibility support.
 * Manages focus state and provides consistent styling using design tokens.
 * Children should be label elements containing radio input elements.
 */
const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      id,
      className,
      label,
      required = false,
      disabled = false,
      error = false,
      size = 'md',
      inputRef,
      onFocus,
      onBlur,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-orientation': ariaOrientation,
      children,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    React.useEffect(() => {
      if (!inputRef) return;
      if (typeof inputRef === 'function') {
        inputRef(containerRef.current);
      }
    }, [inputRef]);

    const sizeConfig_value = sizeConfig[size] || sizeConfig.md;

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: `${sizeConfig_value.gap}px`,
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      cursor: disabled ? 'var(--cursor-disabled)' : 'pointer',
    };

    const groupStyle: React.CSSProperties = {
      display: 'flex',
      gap: `${sizeConfig_value.gap}px`,
      alignItems: 'center',
      fontSize: sizeConfig_value.fontSize,
      outline: error ? `var(--border-width-sm) solid var(--color-error)` : 'none',
      borderRadius: 'var(--radius-md)',
      padding: error ? 'var(--space-2)' : 0,
      pointerEvents: disabled ? 'none' : 'auto',
    };

    const labelStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: `${sizeConfig_value.gap / 2}px`,
      fontSize: sizeConfig_value.fontSize,
      color: 'var(--text-primary)',
      fontWeight: 'var(--font-weight-medium)',
      marginBottom: label ? `${sizeConfig_value.gap}px` : 0,
    };

    const requiredIndicatorStyle: React.CSSProperties = {
      marginLeft: 'var(--space-1)',
      color: 'var(--color-error)',
      fontWeight: 'var(--font-weight-semibold)',
    };

    return (
      <div style={containerStyle} className={className} ref={containerRef}>
        {label && (
          <label style={labelStyle}>
            {label}
            {required && <span style={requiredIndicatorStyle}>*</span>}
          </label>
        )}
        <div
          id={id}
          role="radiogroup"
          style={groupStyle}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          aria-disabled={disabled}
          aria-required={required}
          aria-orientation={ariaOrientation || 'vertical'}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {children}
        </div>
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
