import React from "react";
import { NavLink } from "react-router-dom";
import '../../../src/styles/tokens.css';

/**
 * Link Component
 *
 * A reusable link component built on React Router NavLink with full design token integration.
 * Supports flexible styling with color variants, sizes, and underline options.
 * Fully accessible with ARIA attributes and keyboard navigation.
 *
 * @example
 * <Link to="/about" color="primary" size="md" underline="hover">
 *   About Us
 * </Link>
 */
interface LinkProps {
  /** Route path for navigation (React Router) */
  to: string;
  /** HTML title attribute for tooltip */
  title?: string;
  /** Unique identifier for the link */
  id?: string;
  /** Additional CSS classes for style extension */
  className?: string;
  /** HTML target attribute for link behavior */
  target?: string;
  /** Color variant of the link */
  color?: "primary" | "secondary" | "success" | "error" | "info" | "inherit";
  /** Link size - affects font size and spacing */
  size?: "sm" | "md" | "lg";
  /** Underline behavior - none, hover, or always */
  underline?: "none" | "hover" | "always";
  /** Focus event handler */
  onFocus?: React.FocusEventHandler<HTMLAnchorElement>;
  /** Blur event handler */
  onBlur?: React.FocusEventHandler<HTMLAnchorElement>;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** Link content - text or React elements */
  children?: React.ReactNode;
  // ARIA attributes for accessibility
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-label'?: string;
  'aria-current'?: boolean | "page" | "step" | "location" | "date" | "time";
}

const Link: React.FC<LinkProps> = ({
  to,
  title,
  id,
  className = '',
  color = "primary",
  size = "md",
  underline = "hover",
  onFocus,
  tabIndex,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  target,
  'aria-current': ariaCurrent,
  onBlur,
  'aria-label': ariaLabel,
  children,
}) => {
  // Color configuration using design tokens
  const colorConfig: Record<string, string> = {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    success: 'var(--color-success)',
    error: 'var(--color-error)',
    info: 'var(--color-info)',
    inherit: 'inherit',
  };

  // Hover color configuration
  const hoverColorConfig: Record<string, string> = {
    primary: 'var(--color-primary-hover)',
    secondary: 'var(--color-secondary)',
    success: 'var(--color-success)',
    error: 'var(--color-error)',
    info: 'var(--color-info)',
    inherit: 'inherit',
  };

  // Size configuration using design tokens
  const sizeConfig = {
    sm: 'var(--font-size-sm)',
    md: 'var(--font-size-md)',
    lg: 'var(--font-size-lg)',
  };

  // Link styles using design tokens
  const linkStyles: React.CSSProperties = {
    color: colorConfig[color],
    fontSize: sizeConfig[size],
    textDecoration:
      underline === "always" ? "underline" : 
      underline === "none" ? "none" : 
      "none",
    transition: `all var(--transition-normal)`,
    fontWeight: 'var(--font-weight-regular)',
    cursor: 'pointer',
    display: 'inline-block',
  };

  return (
    <NavLink
      to={to}
      id={id}
      title={title}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      tabIndex={tabIndex}
      aria-current={ariaCurrent}
      target={target}
      className={className || ''}
      style={{
        ...linkStyles,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = hoverColorConfig[color];
        if (underline === "hover") {
          (e.currentTarget as HTMLElement).style.textDecoration = "underline";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = colorConfig[color];
        if (underline === "hover") {
          (e.currentTarget as HTMLElement).style.textDecoration = "none";
        }
      }}
      onFocus={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--focus-ring)';
        (e.currentTarget as HTMLElement).style.borderRadius = 'var(--radius-md)';
        (e.currentTarget as HTMLElement).style.outline = 'none';
        onFocus?.(e);
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        onBlur?.(e);
      }}
    >
      {children}
    </NavLink>
  );
};

export default Link;
