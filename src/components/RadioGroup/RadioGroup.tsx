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

  /** Name attribute for form submission */
  name?: string;

  /** Additional CSS classes for custom styling */
  className?: string;

  /** Label text displayed above or beside the radio group */
  label?: React.ReactNode;

  /** Current selected value */
  value?: string;

  /** Indicates if this radio group is required */
  required?: boolean;

  /** Disables all radio buttons in the group */
  disabled?: boolean;

  /** Shows error state styling */
  hasError?: boolean;

  /** Error message to display below the radio group */
  errorMessage?: string;

  /** Size of the radio group - 'sm' (small), 'md' (medium), 'lg' (large) */
  size?: 'sm' | 'md' | 'lg';

  /** Array of options for radio buttons */
  options?: Array<{ value: string; label: string }>;

  /** Ref to the container div element */
  inputRef?: React.Ref<HTMLDivElement>;

  /** Called when a radio button is selected */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

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
      name,
      className,
      label,
      value = '',
      required = false,
      disabled = false,
      hasError = false,
      errorMessage = '',
      size = 'md',
      options,
      inputRef,
      onChange,
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
      gap: 0,
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      cursor: disabled ? 'var(--cursor-disabled)' : 'pointer',
    };

    const groupStyle: React.CSSProperties = {
      display: 'flex',
      gap: `${sizeConfig_value.gap}px`,
      alignItems: 'center',
      fontSize: sizeConfig_value.fontSize,
      outline: hasError ? `var(--border-width-sm) solid var(--color-error)` : 'none',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-2)',
      pointerEvents: disabled ? 'none' : 'auto',
    };

    const labelStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: `${sizeConfig_value.gap / 2}px`,
      fontSize: sizeConfig_value.fontSize,
      color: 'var(--text-primary)',
      fontWeight: 'var(--font-weight-medium)',
      marginBottom: '0.3rem',
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
          {options ? (
            options.map((opt) => (
              <label key={opt.value} className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='radio'
                  name={name || id}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={onChange}
                  disabled={disabled}
                  id={`${id}-${opt.value}`}
                />
                <span className='text-sm'>{opt.label}</span>
              </label>
            ))
          ) : (
            children
          )}
        </div>
        {hasError && errorMessage && (
          <span style={{ display: 'block', marginTop: 'var(--space-1)', fontSize: 'var(--font-size-sm)', color: 'var(--color-error)' }} role="alert">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
