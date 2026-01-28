import React, { forwardRef } from 'react';

/**
 * FormInput Component
 *
 * Purpose: A reusable, accessible form input component using React, TailwindCSS, and design tokens.
 * Supports various input types with validation error display, required field indicators, and full ARIA accessibility.
 *
 * Props:
 * - id, name, className, type, placeholder, value: Basic HTML input attributes
 * - label: Label text displayed above the input
 * - required, disabled, readOnly: Form states
 * - size: sm | md | lg (controls visual size)
 * - variant: outlined | filled | standard (visual style)
 * - error, helperText: Error state and optional helper message
 * - onChange, onFocus, onBlur, onClick: Event handlers
 * - ARIA fields: aria-label, aria-labelledby, aria-describedby, aria-disabled, aria-invalid, aria-required, aria-live
 *
 * Behavior:
 * - Renders a native HTML input with custom styling using Tailwind
 * - Displays label above input with required asterisk if needed
 * - Shows error message with red styling when error prop is true
 * - Supports helper text for additional input guidance
 * - Full keyboard accessibility and ARIA support
 * - Dynamic styling based on focus, error, and disabled states
 */

export interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text displayed above the input */
  label?: React.ReactNode;
  /** Whether the field is required */
  required?: boolean;
  /** Error state of the input */
  error?: boolean;
  /** Helper text displayed below the input */
  helperText?: React.ReactNode;
  /** Size of the input field */
  size?: 'sm' | 'md' | 'lg';
  /** Visual style variant */
  variant?: 'outlined' | 'filled' | 'standard';
  /** Reference to the input element */
  inputRef?: React.Ref<HTMLInputElement>;
  /** ARIA label for screen readers */
  'aria-label'?: string;
  /** ID of element that labels this input */
  'aria-labelledby'?: string;
  /** ID of element that describes this input */
  'aria-describedby'?: string;
  /** Whether the input is disabled */
  'aria-disabled'?: boolean;
  /** Whether the input value is invalid */
  'aria-invalid'?: boolean;
  /** Whether the input is required */
  'aria-required'?: boolean;
  /** Live region announcement level */
  'aria-live'?: 'off' | 'polite' | 'assertive';
}

const sizeMap: Record<string, string> = {
  sm: 'text-sm px-3 py-2',
  md: 'text-base px-4 py-3',
  lg: 'text-lg px-4 py-3',
};

const variantMap: Record<string, string> = {
  outlined: 'border border-gray-300 rounded-lg',
  filled: 'bg-gray-100 border-0 rounded-lg',
  standard: 'border-0 border-b border-gray-300 rounded-0',
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      name,
      className = '',
      type = 'text',
      placeholder,
      value,
      label,
      required = false,
      disabled = false,
      readOnly = false,
      error = false,
      helperText,
      size = 'md',
      variant = 'outlined',
      inputRef,
      onChange,
      onFocus,
      onBlur,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-disabled': ariaDisabled,
      'aria-invalid': ariaInvalid,
      'aria-required': ariaRequired,
      'aria-live': ariaLive,
      ...rest
    },
    ref,
  ) => {
    const inputRef_ = ref || inputRef;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <input
          ref={inputRef_}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={helperText ? `${id}-helper` : ariaDescribedby}
          aria-disabled={ariaDisabled || disabled}
          aria-invalid={ariaInvalid || error}
          aria-required={ariaRequired || required}
          aria-live={ariaLive}
          className={`w-full transition-all duration-200 text-gray-900 placeholder-gray-400 focus:outline-none
            ${sizeMap[size]}
            ${variantMap[variant]}
            ${
              error
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-gray-400'
            }
            ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
            ${className}`}
          {...rest}
        />

        {helperText && (
          <p
            id={`${id}-helper`}
            className={`text-xs mt-1 font-medium ${
              error ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';

export default FormInput;
