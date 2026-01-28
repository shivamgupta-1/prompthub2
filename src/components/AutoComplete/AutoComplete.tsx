/**
 * AutoComplete Component
 *
 * Purpose: A reusable, accessible AutoComplete component with search functionality,
 * dropdown suggestions, and full WCAG 2.2 Level AA compliance.
 *
 * Design Tokens Used:
 *   - Colors: --color-primary, --color-primary-hover, --color-error, --color-gray-*
 *   - Text: --text-primary, --text-secondary, --text-muted
 *   - Backgrounds: --bg-surface, --bg-muted, --bg-hover
 *   - Borders: --border-color, --border-color-focus, --border-width-sm
 *   - Spacing: --space-2, --space-3, --space-4
 *   - Sizing: --control-height-sm, --control-height-md, --control-height-lg
 *   - Typography: --font-size-sm, --font-size-md, --font-weight-medium
 *   - Border Radius: --radius-md, --radius-lg
 *   - Shadows: --shadow-sm, --shadow-md
 *   - Z-Index: --z-dropdown
 *   - States: --opacity-disabled, --cursor-disabled
 *
 * Props:
 *   - id: Unique identifier for the input
 *   - name: HTML name attribute for form submission
 *   - className: Additional CSS classes for styling override
 *   - value: Current input/selected value
 *   - placeholder: Placeholder text for the input
 *   - required: Whether the field is required
 *   - disabled: Disables the input and dropdown
 *   - readOnly: Makes input read-only but still focusable
 *   - title: Title/tooltip text
 *   - size: "sm" | "md" | "lg" (controls visual size)
 *   - autoFocus: Auto-focus on mount
 *   - autoComplete: HTML autocomplete attribute
 *   - options: Array of suggestion options (string[] or {label, value}[])
 *   - onChange: Called when input value changes
 *   - onFocus: Called when input receives focus
 *   - onBlur: Called when input loses focus
 *   - onSelect: Called when an option is selected
 *   - aria-label: ARIA label for screen readers
 *   - aria-labelledby: ID of element that labels this input
 *   - aria-describedby: ID of element that describes this input
 *   - aria-disabled: Programmatic disabled state
 *   - aria-controls: ID of popup the input controls
 *   - aria-live: Live region announcement level
 *   - aria-invalid: Whether the input value is invalid
 *   - aria-required: Whether the input is required
 *
 * Behavior:
 *   - Renders semantic input with dropdown suggestion list
 *   - Shows/hides dropdown on focus/blur with proper timing
 *   - Filters suggestions based on input value
 *   - Keyboard navigation: Arrow keys to select, Enter to confirm, Escape to close
 *   - Full ARIA support: listbox role, option role, aria-expanded, aria-activedescendant
 *   - Accessible focus management with visible focus indicator
 *   - Screen reader announcements for suggestion counts and selections
 */

import React, { useState, useRef, useId, useMemo, useCallback } from 'react';
import '../../styles/tokens.css';

interface Option {
  label: string;
  value: string;
}

type AutoCompleteSize = 'sm' | 'md' | 'lg';

export interface AutoCompleteProps {
  id?: string;
  name?: string;
  className?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  title?: string;
  size?: AutoCompleteSize;
  autoFocus?: boolean;
  autoComplete?: string;
  options?: (string | Option)[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onSelect?: (option: Option) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-controls'?: string;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
}

/**
 * Normalizes option format to consistent {label, value} structure
 */
const normalizeOption = (option: string | Option): Option => {
  if (typeof option === 'string') {
    return { label: option, value: option };
  }
  return option;
};

/**
 * Filters options based on input value
 */
const filterOptions = (inputValue: string, options: Option[]): Option[] => {
  const lowerInput = inputValue.toLowerCase().trim();
  if (!lowerInput) return options;
  return options.filter((opt) =>
    opt.label.toLowerCase().includes(lowerInput)
  );
};

const AutoComplete = React.forwardRef<HTMLInputElement, AutoCompleteProps>(
  (
    {
      id,
      name,
      className = '',
      value = '',
      placeholder = 'Search...',
      required = false,
      disabled = false,
      readOnly = false,
      title,
      size = 'md',
      autoFocus = false,
      autoComplete = 'off',
      options = [],
      onChange,
      onFocus,
      onBlur,
      onSelect,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-disabled': ariaDisabled,
      'aria-controls': ariaControls,
      'aria-live': ariaLive = 'polite',
      'aria-invalid': ariaInvalid = false,
      'aria-required': ariaRequired = required,
    },
    ref
  ) => {
    const generatedId = useId();
    const fieldId = id || `autocomplete-${generatedId}`;
    const listboxId = ariaControls || `${fieldId}-listbox`;
    const announcementId = `${fieldId}-announce`;

    const [inputValue, setInputValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    // Normalize and filter options
    const normalizedOptions = useMemo(
      () => options.map(normalizeOption),
      [options]
    );

    const filteredOptions = useMemo(
      () => filterOptions(inputValue, normalizedOptions),
      [inputValue, normalizedOptions]
    );

    // Size mapping
    const sizeClasses = useMemo(() => {
      const sizes: Record<AutoCompleteSize, string> = {
        sm: 'px-3 py-2 text-sm h-8',
        md: 'px-4 py-2 text-base h-10',
        lg: 'px-4 py-3 text-lg h-12',
      };
      return sizes[size];
    }, [size]);

    /**
     * Handle input change with filtering
     */
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setHighlightedIndex(null);
        setIsOpen(true);

        if (onChange) {
          onChange(e, newValue);
        }
      },
      [onChange]
    );

    /**
     * Handle input focus - show suggestions
     */
    const handleInputFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsOpen(true);
        setHighlightedIndex(null);

        if (onFocus) {
          onFocus(e);
        }
      },
      [onFocus]
    );

    /**
     * Handle input blur - close suggestions
     */
    const handleInputBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        // Delay to allow option click to register
        setTimeout(() => {
          setIsOpen(false);
          setHighlightedIndex(null);
        }, 100);

        if (onBlur) {
          onBlur(e);
        }
      },
      [onBlur]
    );

    /**
     * Handle keyboard navigation
     */
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen || filteredOptions.length === 0) {
          if (e.key === 'Enter' && inputValue) {
            setIsOpen(true);
          }
          return;
        }

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setHighlightedIndex((prev) =>
              prev === null
                ? 0
                : Math.min(prev + 1, filteredOptions.length - 1)
            );
            break;

          case 'ArrowUp':
            e.preventDefault();
            setHighlightedIndex((prev) =>
              prev === null || prev === 0 ? filteredOptions.length - 1 : prev - 1
            );
            break;

          case 'Enter':
            e.preventDefault();
            if (highlightedIndex !== null) {
              const selectedOption = filteredOptions[highlightedIndex];
              handleSelectOption(selectedOption);
            }
            break;

          case 'Escape':
            e.preventDefault();
            setIsOpen(false);
            setHighlightedIndex(null);
            break;

          default:
            break;
        }
      },
      [isOpen, filteredOptions, highlightedIndex, inputValue]
    );

    /**
     * Handle option selection
     */
    const handleSelectOption = useCallback(
      (option: Option) => {
        setInputValue(option.label);
        setIsOpen(false);
        setHighlightedIndex(null);

        if (onSelect) {
          onSelect(option);
        }

        inputRef.current?.focus();
      },
      [onSelect]
    );

    /**
     * Handle click outside to close dropdown
     */
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
          setHighlightedIndex(null);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const isFieldDisabled = disabled || ariaDisabled;
    const suggestionCount = filteredOptions.length;
    const hasResults = isOpen && suggestionCount > 0;

    return (
      <div
        ref={containerRef}
        className={`relative w-full ${className}`}
      >
        {/* Input Field */}
        <input
          ref={inputRef}
          id={fieldId}
          name={name}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          disabled={isFieldDisabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          title={title}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          aria-disabled={isFieldDisabled}
          aria-controls={isOpen ? listboxId : undefined}
          aria-expanded={isOpen && suggestionCount > 0}
          aria-activedescendant={
            isOpen && highlightedIndex !== null
              ? `${listboxId}-option-${highlightedIndex}`
              : undefined
          }
          aria-invalid={ariaInvalid}
          aria-required={ariaRequired}
          aria-autocomplete="list"
          role="combobox"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className={`
            w-full border border-[var(--border-color)] rounded-[var(--radius-md)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
            focus:border-[var(--border-color-focus)]
            transition-all duration-200 ease-in-out
            ${sizeClasses}
            ${isFieldDisabled ? 'bg-[var(--bg-muted)] text-[var(--text-muted)] cursor-[var(--cursor-disabled)] opacity-[var(--opacity-disabled)]' : 'bg-[var(--bg-surface)] text-[var(--text-primary)]'}
            ${ariaInvalid ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]' : ''}
            ${readOnly ? 'cursor-default' : ''}
          `}
        />

        {/* Live Region Announcements */}
        <div
          id={announcementId}
          role="status"
          aria-live={ariaLive}
          aria-atomic="true"
          className="sr-only"
        >
          {hasResults
            ? `${suggestionCount} suggestion${suggestionCount !== 1 ? 's' : ''} available`
            : isOpen && inputValue
              ? 'No suggestions found'
              : ''}
        </div>

        {/* Dropdown List */}
        {isOpen && filteredOptions.length > 0 && (
          <ul
            id={listboxId}
            role="listbox"
            className={`
              absolute top-full left-0 right-0 z-[var(--z-dropdown)]
              bg-[var(--bg-surface)] border border-[var(--border-color)]
              rounded-[var(--radius-md)] shadow-[var(--shadow-md)]
              max-h-64 overflow-y-auto mt-2
            `}
          >
            {filteredOptions.map((option, index) => (
              <li key={option.value} role="presentation">
                <button
                  id={`${listboxId}-option-${index}`}
                  role="option"
                  aria-selected={index === highlightedIndex}
                  onClick={() => handleSelectOption(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`
                    w-full px-4 py-2 text-left border-0
                    transition-colors duration-150 ease-in-out
                    font-[var(--font-weight-regular)] text-[var(--font-size-md)]
                    ${index === highlightedIndex
                      ? 'bg-[var(--bg-hover)] text-[var(--text-primary)]'
                      : 'bg-[var(--bg-surface)] text-[var(--text-primary)]'
                    }
                    hover:bg-[var(--bg-hover)]
                    focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)]
                    cursor-pointer
                  `}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Empty State Message */}
        {isOpen && filteredOptions.length === 0 && inputValue && (
          <div
            className={`
              absolute top-full left-0 right-0 z-[var(--z-dropdown)]
              bg-[var(--bg-surface)] border border-[var(--border-color)]
              rounded-[var(--radius-md)] shadow-[var(--shadow-md)]
              px-4 py-3 mt-2 text-[var(--text-muted)]
              text-center font-[var(--font-size-md)]
            `}
          >
            No results found for "{inputValue}"
          </div>
        )}
      </div>
    );
  }
);

AutoComplete.displayName = 'AutoComplete';

export default AutoComplete;