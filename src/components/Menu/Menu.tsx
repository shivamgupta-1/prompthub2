import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import '../../../src/styles/tokens.css';

/**
 * Menu Button Component
 *
 * A versatile menu button that triggers dropdown or context menus.
 * Supports multiple variants, sizes, and comprehensive accessibility features.
 *
 * @example
 * ```tsx
 * <Menu variant="primary" size="md">
 *   Open Menu
 * </Menu>
 * ```
 */

export interface MenuProps {
  /** Unique identifier for the menu button */
  id?: string;
  /** Additional CSS classes for custom styling */
  className?: string;
  /** Whether the menu button is disabled */
  disabled?: boolean;
  /** Tab order for keyboard navigation */
  tabIndex?: number;

  /** Visual variant of the menu button */
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'link';
  /** Size of the menu button */
  size?: 'sm' | 'md' | 'lg';
  /** Border radius style */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /** Click event handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Focus event handler */
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  /** Blur event handler */
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;

  /** HTML title attribute for tooltip */
  title?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** References element that labels this menu */
  'aria-labelledby'?: string;
  /** References element that describes this menu */
  'aria-describedby'?: string;
  /** Whether the menu is expanded */
  'aria-expanded'?: boolean;
  /** Whether the menu is disabled (for screen readers) */
  'aria-disabled'?: boolean;
  /** Whether this menu item is selected */
  'aria-selected'?: boolean;
  /** ID of the menu popup controlled by this button */
  'aria-controls'?: string;
  /** Current page/location context */
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
  /** Menu orientation */
  'aria-orientation'?: 'horizontal' | 'vertical';

  /** Content to display inside the menu button */
  children?: React.ReactNode;
}


const sizeConfig: Record<NonNullable<MenuProps['size']>, React.CSSProperties> = {
  sm: {
    padding: 'var(--space-1) var(--space-2)',
    fontSize: 'var(--font-size-sm)',
    height: 'var(--control-height-sm)',
  },
  md: {
    padding: 'var(--space-2) var(--space-4)',
    fontSize: 'var(--font-size-md)',
    height: 'var(--control-height-md)',
  },
  lg: {
    padding: 'var(--space-3) var(--space-6)',
    fontSize: 'var(--font-size-lg)',
    height: 'var(--control-height-lg)',
  },
};

const roundedConfig: Record<NonNullable<MenuProps['rounded']>, string> = {
  none: '0',
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  full: 'var(--radius-full)',
};

const variantConfig: Record<NonNullable<MenuProps['variant']>, {
  color: string;
  backgroundColor: string;
  borderColor: string;
  hoverColor: string;
  hoverBackgroundColor: string;
}> = {
  default: {
    color: 'var(--text-primary)',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    hoverColor: 'var(--color-primary)',
    hoverBackgroundColor: 'var(--bg-hover)',
  },
  primary: {
    color: 'var(--text-inverse)',
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    hoverColor: 'var(--text-inverse)',
    hoverBackgroundColor: 'var(--color-primary-hover)',
  },
  secondary: {
    color: 'var(--text-inverse)',
    backgroundColor: 'var(--color-secondary)',
    borderColor: 'var(--color-secondary)',
    hoverColor: 'var(--text-inverse)',
    hoverBackgroundColor: 'var(--color-secondary)',
  },
  danger: {
    color: 'var(--text-inverse)',
    backgroundColor: 'var(--color-error)',
    borderColor: 'var(--color-error)',
    hoverColor: 'var(--text-inverse)',
    hoverBackgroundColor: 'var(--color-error)',
  },
  link: {
    color: 'var(--color-primary)',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    hoverColor: 'var(--color-primary-hover)',
    hoverBackgroundColor: 'transparent',
  },
};

/* =========================
   COMPONENT
========================= */

const Menu = forwardRef<HTMLButtonElement, MenuProps>(
  (props, ref) => {
    const {
      id,
      className = '',
      disabled = false,
      tabIndex = 0,

      variant = 'default',
      size = 'md',
      rounded = 'md',

      onClick,
      onFocus,
      onBlur,
      title,

      children,
      ...ariaProps
    } = props;

    const innerRef = useRef<HTMLButtonElement | null>(null);
    useImperativeHandle(ref, () => innerRef.current!, []);

    const variantStyle = variantConfig[variant];
    const sizeStyle = sizeConfig[size];
    const radiusValue = roundedConfig[rounded];

    const baseStyle: React.CSSProperties = {
      fontFamily: 'var(--font-family-sans)',
      fontWeight: 'var(--font-weight-medium)',
      lineHeight: 'var(--line-height-normal)',
      border: '1px solid',
      borderRadius: radiusValue,
      transition: `all var(--transition-normal)`,
      cursor: disabled ? 'var(--cursor-disabled)' : 'pointer',
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      outline: 'none',
      ...sizeStyle,
      color: variantStyle.color,
      backgroundColor: variantStyle.backgroundColor,
      borderColor: variantStyle.borderColor,
    };

    return (
      <button
        ref={innerRef}
        id={id}
        type="button"
        disabled={disabled}
        tabIndex={disabled ? -1 : tabIndex}
        title={title}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={(e) => {
          if (!disabled) {
            (e.currentTarget as HTMLButtonElement).style.color = variantStyle.hoverColor;
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = variantStyle.hoverBackgroundColor;
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = variantStyle.color;
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = variantStyle.backgroundColor;
        }}
        style={{
          ...baseStyle,
          boxShadow: `var(--focus-ring)`,
        }}
        className={className}
        aria-disabled={disabled}
        {...ariaProps}
      >
        {children}
      </button>
    );
  }
);

Menu.displayName = 'Menu';

export default Menu;
