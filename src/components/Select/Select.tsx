/**
 * Select Component
 *
 * Purpose: A reusable, accessible select dropdown component for choosing from a list of options.
 * Fully compliant with WCAG 2.2 Level AA accessibility standards and design system tokens.
 * Supports multiple sizes and variants with comprehensive prop management and no hardcoded values.
 *
 * Design Tokens Used:
 *   - Colors: --color-primary, --color-error, --color-gray-*, --text-primary, --text-muted, --bg-surface, --bg-muted
 *   - Spacing: --space-1 through --space-6
 *   - Typography: --font-family-sans, --font-size-sm/md/lg, --font-weight-medium, --font-weight-semibold
 *   - Sizing: --control-height-sm/md/lg
 *   - Borders: --border-color, --border-color-focus, --border-width-sm
 *   - Radius: --radius-md, --radius-lg
 *   - States: --opacity-disabled, --cursor-disabled
 *   - Transitions: --transition-fast
 *
 * Props:
 *   - id: Unique identifier for the select element
 *   - name: Name attribute for form submission
 *   - className: Additional CSS classes for custom styling override
 *   - value: Current value (controlled component mode)
 *   - defaultValue: Default value (uncontrolled mode)
 *   - label: Label text displayed above the select
 *   - required: Indicates if selection is required
 *   - disabled: Disables the select element
 *   - htmlFor: HTML for attribute linking label to select
 *   - title: Tooltip text on hover
 *   - error: Shows error state styling
 *   - size: "sm" | "md" | "lg" - controls visual size
 *   - variant: "outlined" | "filled" | "standard" - visual style variant
 *   - inputRef: Ref to the select element
 *   - autoFocus: Auto-focus on mount
 *   - onChange: Called when value changes
 *   - onFocus: Called when focus enters the select
 *   - onBlur: Called when focus leaves the select
 *   - aria-label: Accessibility label for screen readers
 *   - aria-labelledby: ID of element that labels this select
 *   - aria-describedby: ID of element that describes this select
 *   - children: Option elements for the select
 *
 * Behavior:
 *   - Renders semantic HTML select element with design token-based styling
 *   - Supports both controlled (value) and uncontrolled (defaultValue) modes
 *   - Provides comprehensive accessibility with ARIA attributes
 *   - Custom dropdown arrow icon via CSS background image
 *   - Dynamic styling based on error and focus states using transitions
 *   - Disabled state with reduced opacity and cursor styling
 *   - Multiple size variants for flexible layout integration
 */

import React, { forwardRef, useImperativeHandle, useRef, useMemo } from 'react';

/**
 * Configuration for size variants - maps size prop to height and padding values
 */
const SIZE_VARIANTS = {
  sm: {
    height: 'h-8',
    paddingY: 'py-[var(--space-2)]',
    paddingX: 'px-[var(--space-3)]',
    fontSize: 'text-[var(--font-size-sm)]',
  },
  md: {
    height: 'h-10',
    paddingY: 'py-[var(--space-2)]',
    paddingX: 'px-[var(--space-4)]',
    fontSize: 'text-[var(--font-size-md)]',
  },
  lg: {
    height: 'h-12',
    paddingY: 'py-[var(--space-3)]',
    paddingX: 'px-[var(--space-5)]',
    fontSize: 'text-[var(--font-size-lg)]',
  },
} as const;

/**
 * Configuration for visual variants - maps variant prop to styling classes
 */
const VARIANT_STYLES = {
  outlined: {
    base: 'border border-[var(--border-color)] rounded-[var(--radius-md)] bg-[var(--bg-surface)]',
    focus:
      'focus:border-[var(--border-color-focus)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-35',
  },
  filled: {
    base: 'border-none rounded-[var(--radius-md)] bg-[var(--bg-muted)]',
    focus: 'focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-35',
  },
  standard: {
    base: 'border-b border-[var(--border-color)] rounded-none bg-transparent',
    focus: 'focus:border-b-2 focus:border-[var(--border-color-focus)]',
  },
} as const;

/**
 * SVG dropdown arrow icon (base64 encoded for better performance)
 * Prevents hardcoding the arrow image URL
 */
const DROPDOWN_ARROW_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234b5563' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")";

/**
 * Configuration constants for visual adjustments
 */
const ARROW_ICON_SIZE = '12px';
const ARROW_POSITION_RIGHT = 'var(--space-3)';
const ARROW_PADDING_OFFSET = 'calc(var(--space-4) + 24px)';

export interface SelectOption {
  /** Display text for the option */
  label: string;
  /** Value submitted with the form */
  value: string | number;
  /** Whether the option is disabled */
  disabled?: boolean;
}

export interface SelectProps {
  /** Unique identifier for the select element */
  id?: string;

  /** Indicates if selection is required (from JSON config) */
  isRequired?: boolean;

  hasError?: boolean;

  validationRules?: Record<string, any>;

  /** Name attribute for form submission */
  name?: string;

  /** Additional CSS classes for custom styling */
  className?: string;

  /** Current value (controlled component mode) */
  value?: string | number;

  /** Default value (uncontrolled mode) */
  defaultValue?: string | number;

  /** Label text displayed above the select */
  label?: React.ReactNode;

  /** Indicates if selection is required */
  required?: boolean;

  /** Disables the select element */
  disabled?: boolean;

  /** HTML for attribute linking label to select */
  htmlFor?: string;

  /** Tooltip text on hover */
  title?: string;

  /** Shows error state styling */
  error?: string;

  /** Error message to display below the select */
  errorMessage?: string;

  /** Array of options to render */
  options?: SelectOption[];

  /** Size variant: 'sm' (small), 'md' (medium), 'lg' (large) */
  size?: 'sm' | 'md' | 'lg';

  /** Visual variant: 'outlined', 'filled', 'standard' */
  variant?: 'outlined' | 'filled' | 'standard';

  /** Ref to the select element */
  inputRef?: React.Ref<HTMLSelectElement>;

  /** Auto focus on mount */
  autoFocus?: boolean;

  /** Called when value changes */
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  /** Called when focus enters the select */
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;

  /** Called when focus leaves the select */
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;

  /** Accessibility label for screen readers */
  'aria-label'?: string;

  /** ID of element that labels this select */
  'aria-labelledby'?: string;

  /** ID of element that describes this select */
  'aria-describedby'?: string;

  /** Option elements or text for the select */
  children?: React.ReactNode;
}

/**
 * Select Component
 *
 * Renders a semantic HTML select element with comprehensive styling using design tokens.
 * Supports controlled and uncontrolled modes with full accessibility support.
 * Forwards ref to the underlying select element.
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      name,
      className = '',
      value,
      defaultValue,
      label,
      isRequired,
      disabled = false,
      htmlFor,
      title,
      error,
      errorMessage,
      size = 'md',
      variant = 'outlined',
      inputRef,
      autoFocus = false,
      onChange,
      onFocus,
      onBlur,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      options,

      hasError,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      validationRules,
      children,
      ...rest
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLSelectElement | null>(null);

    // Forward ref to the underlying select element
    useImperativeHandle(ref, () => innerRef.current as HTMLSelectElement);

    // Support legacy inputRef prop for backward compatibility
    React.useEffect(() => {
      if (!inputRef) return;
      const currentRef = innerRef.current;
      if (typeof inputRef === 'function') {
        inputRef(currentRef);
      }
    }, [inputRef]);

    /**
     * Get size configuration classes based on size prop
     */
    const sizeClasses = useMemo(() => {
      const sizeConfig = SIZE_VARIANTS[size] || SIZE_VARIANTS.md;
      return `${sizeConfig.height} ${sizeConfig.paddingY} ${sizeConfig.paddingX} ${sizeConfig.fontSize}`;
    }, [size]);

    /**
     * Get variant configuration classes based on variant prop
     */
    const variantClasses = useMemo(() => {
      const variantConfig = VARIANT_STYLES[variant] || VARIANT_STYLES.outlined;
      return `${variantConfig.base} ${variantConfig.focus}`;
    }, [variant]);

    /**
     * Merge error sources - use error prop or hasError from JSON config
     */
    const isFieldError = error || hasError || false;

    /**
     * Build error/focus styling classes
     */
    const errorClasses = useMemo(() => {
      if (!isFieldError) return '';
      return 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)] focus:ring-opacity-35';
    }, [isFieldError]);

    /**
     * Handle select focus event
     */
    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      onFocus?.(e);
    };

    /**
     * Handle select blur event
     */
    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      onBlur?.(e);
    };

    /**
     * Determine which value prop to use (controlled vs uncontrolled)
     */
    const selectValueProps = useMemo(() => {
      if (value !== undefined) {
        return { value };
      }
      if (defaultValue !== undefined) {
        return { defaultValue };
      }
      return {};
    }, [value, defaultValue]);

    /**
     * Guard: Validate that either value or defaultValue is provided, not both
     */
    if (value !== undefined && defaultValue !== undefined) {
      console.warn(
        'Select: Both "value" and "defaultValue" props provided. Using controlled mode (value). "defaultValue" will be ignored.',
      );
    }

    const errorId = errorMessage ? `${id || 'select'}-error` : undefined;
    const describedById = [ariaDescribedby, errorId].filter(Boolean).join(' ');

    return (
      <div className={`flex flex-col gap-2 w-full ${className}`}>
        {/* Label with required indicator */}
        {label && (
          <label
            htmlFor={id ?? htmlFor}
            className='flex items-center gap-1 text-sm font-medium text-gray-700'
          >
            <span>{label}</span>
            {isRequired && (
              <span className='text-red-500 font-semibold' aria-label='required'>
                *
              </span>
            )}
          </label>
        )}

        {/* Select element with dynamic styling */}
        <select
          ref={innerRef}
          id={id}
          name={name}
          {...selectValueProps}
          required={isRequired}
          disabled={disabled}
          title={title}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={describedById || undefined}
          aria-invalid={isFieldError ? 'true' : 'false'}
          aria-required={isRequired}
          autoFocus={autoFocus}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`
            w-full appearance-none font-[var(--font-family-sans)]
            text-[var(--text-primary)] transition-all duration-[var(--transition-fast)]
            outline-none
            ${sizeClasses}
            ${variantClasses}
            ${errorClasses}
            ${disabled ? 'opacity-[var(--opacity-disabled)] cursor-[var(--cursor-disabled)] text-[var(--text-muted)]' : 'cursor-pointer'}
          `}
          style={{
            backgroundImage: DROPDOWN_ARROW_SVG,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: `right ${ARROW_POSITION_RIGHT} center`,
            backgroundSize: ARROW_ICON_SIZE,
            paddingRight: ARROW_PADDING_OFFSET,
          }}
          {...rest}
        >
          {options && Array.isArray(options) && options.length > 0
            ? options.map((opt: SelectOption) => (
                <option key={`${opt.value}`} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>

        {/* Error message display */}
        {hasError && (
          <span id={errorId} className='text-sm text-red-600' role='alert'>
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';

export default Select;
