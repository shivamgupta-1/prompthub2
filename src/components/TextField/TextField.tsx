import React, { useMemo, useId } from 'react';
import '../../styles/tokens.css';

type TextFieldSize = 'small' | 'medium' | 'large';
type TextFieldVariant = 'default' | 'outlined' | 'filled';

export interface Props {
  id?: string;
  name?: string;
  className?: string;
  type?: string;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  endDecorator?: React.ReactNode;
  error?: string;
  size?: TextFieldSize;
  startDecorator?: React.ReactNode;
  variant?: TextFieldVariant;
  autoFocus?: boolean;
  isRequired?: boolean;
  isValid?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  validationRules?: Record<string, any>;
  autoComplete?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
  tooltip?: string;
}

const TextField = ({
  id,
  name,
  className = '',
  type = 'text',
  value,
  defaultValue,
  placeholder,
  label,
  required = false,
  disabled = false,
  readOnly = false,
  maxLength,
  minLength,
  endDecorator,
  error,
  size = 'medium',
  startDecorator,
  variant = 'default',
  autoFocus = false,
  isRequired,
  isValid,
  hasError,
  errorMessage,
  validationRules,
  autoComplete,
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
  'aria-required': ariaRequired,
  tooltip,
  ...rest
}: Props) => {
  // Map isRequired from JSON config to required prop
  const isFieldRequired = required || isRequired || false;
  // Use error prop, or fallback to errorMessage from JSON config
  const fieldError = error || errorMessage || '';
  // Use ariaInvalid or fallback to hasError from JSON config
  const isFieldInvalid = ariaInvalid || hasError || false;
  const generatedId = useId();
  const fieldId = id || `textfield-${generatedId}`;
  const labelId = label ? `${fieldId}-label` : undefined;
  const errorId = fieldError ? `${fieldId}-error` : undefined;

  const sizeClasses = useMemo(() => {
    const sizes = {
      small: 'px-2 py-1 text-sm h-8',
      medium: 'px-3 py-2 text-base h-10',
      large: 'px-4 py-3 text-lg h-12',
    };
    return sizes[size];
  }, [size]);

  const variantClasses = useMemo(() => {
    const variants = {
      default: 'border border-gray-300 bg-white hover:border-gray-400 focus:border-blue-500',
      outlined:
        'border-2 border-gray-300 bg-white hover:border-gray-400 focus:border-blue-500',
      filled: 'border-b-2 border-gray-300 bg-gray-50 hover:bg-gray-100 focus:border-blue-500',
    };
    return variants[variant];
  }, [variant]);

  const descriptionIds = useMemo(() => {
    return [ariaLabelledby, ariaDescribedby, errorId].filter(Boolean).join(' ');
  }, [ariaLabelledby, ariaDescribedby, errorId]);

  const isInvalid = fieldError || isFieldInvalid;

  const inputClasses = [
    'w-full',
    'rounded-lg',
    'font-medium',
    'transition-all',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-blue-500',
    'focus-visible:ring-offset-2',
    sizeClasses,
    variantClasses,
    isInvalid ? 'border-red-500 focus:border-red-600' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    readOnly ? 'cursor-default bg-gray-50' : '',
    startDecorator || endDecorator ? 'px-0' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`flex flex-col gap-2 w-full ${disabled ? 'opacity-50' : ''}`}>
      {label && (
        <label
          id={labelId}
          htmlFor={fieldId}
          className={`text-sm font-medium ${
            isInvalid ? 'text-red-600' : 'text-gray-700'
          } ${isFieldRequired ? 'after:content-["*"] after:ml-1 after:text-red-500' : ''}`}
        >
          {label}
        </label>
      )}

      <div className="flex items-center w-full">
        {startDecorator && (
          <div className={`flex items-center px-3 py-2 text-gray-600 ${size === 'small' ? 'text-sm' : 'text-base'}`}>
            {startDecorator}
          </div>
        )}

        <input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          maxLength={maxLength}
          minLength={minLength}
          disabled={disabled}
          readOnly={readOnly}
          className={inputClasses}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-label={ariaLabel}
          aria-labelledby={labelId || ariaLabelledby}
          aria-describedby={descriptionIds || undefined}
          aria-invalid={isInvalid ? 'true' : 'false'}
          aria-required={ariaRequired || isFieldRequired}
          {...rest}
        />

        {endDecorator && (
          <div className={`flex items-center px-3 py-2 text-gray-600 ${size === 'small' ? 'text-sm' : 'text-base'}`}>
            {endDecorator}
          </div>
        )}
      </div>

      {fieldError && (
        <span id={errorId} className="text-sm text-red-600" role="alert">
          {fieldError}
        </span>
      )}
    </div>
  );
};

export default TextField;
