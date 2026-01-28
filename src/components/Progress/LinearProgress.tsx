/**
 * LinearProgress Component
 *
 * A linear (horizontal) progress bar component that displays progress as a filled bar.
 * Supports determinate (with value), indeterminate (animated), buffer, and query variants.
 * Uses design tokens from tokens.css for consistent color theming and sizing.
 *
 * @example
 * ```tsx
 * // Determinate progress (60%)
 * <LinearProgress value={60} variant="determinate" color="primary" />
 *
 * // Indeterminate loading state
 * <LinearProgress variant="indeterminate" size="md" />
 * ```
 */

import React from 'react';
import '../../../src/styles/tokens.css';

export interface LinearProgressProps {
  /** Unique identifier for the component */
  id?: string;

  /** Progress value (0-100) for determinate variant */
  value?: number;

  /** Progress variant type - determines animation and rendering style */
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';

  /** Color variant using design tokens */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';

  /** Additional CSS classes for custom styling */
  className?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;

  /** Current progress value for accessibility */
  'aria-valuenow'?: number;

  /** Text description of current progress for accessibility */
  'aria-valuetext'?: string;

  /** Height of the progress bar - 'sm' (4px), 'md' (8px), 'lg' (12px) */
  size?: 'sm' | 'md' | 'lg';

  /** Accessibility label for screen readers */
  'aria-label'?: string;

  /** ID of element that labels this component */
  'aria-labelledby'?: string;
}

const colorMap: Record<string, string> = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  error: 'var(--color-error)',
  info: 'var(--color-info)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  inherit: 'inherit',
};

const sizeConfig: Record<'sm' | 'md' | 'lg', number> = {
  sm: 4,
  md: 8,
  lg: 12,
};

/**
 * LinearProgress Component
 *
 * Renders a horizontal progress bar with support for multiple variants including
 * determinate (fixed progress value), indeterminate (animated loading),
 * buffer, and query states. Integrates with design tokens for colors and sizing.
 */
const LinearProgress: React.FC<LinearProgressProps> = ({
  id,
  value = 0,
  variant = 'indeterminate',
  color = 'primary',
  className,
  style,
  size = 'md',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-valuenow': ariaValueNow,
  'aria-valuetext': ariaValueText,
}) => {
  // Calculate percentage for determinate variant (0-100)
  const percent = Math.min(Math.max(value, 0), 100);

  // Resolve height from size prop
  const height = sizeConfig[size] || 8;

  const containerStyle: React.CSSProperties = {
    width: '100%',
    ...style,
  };

  const trackStyle: React.CSSProperties = {
    width: '100%',
    height: `${height}px`,
    backgroundColor: 'var(--bg-muted)',
    borderRadius: 'var(--radius-sm)',
    overflow: 'hidden',
    position: 'relative',
  };

  const barStyle: React.CSSProperties = {
    height: '100%',
    backgroundColor: colorMap[color],
    width: variant === 'determinate' ? `${percent}%` : '100%',
    transition: variant === 'determinate' ? `width var(--transition-normal)` : undefined,
    borderRadius: 'var(--radius-sm)',
  };

  const indeterminateAnimationStyle: React.CSSProperties = {
    ...barStyle,
    animation:
      variant === 'indeterminate' || variant === 'buffer'
        ? `progress-animation var(--transition-slow) infinite`
        : variant === 'query'
          ? `query-animation var(--transition-slow) infinite`
          : undefined,
    width: '30%',
  };

  const ariaProps = {
    'aria-valuenow': ariaValueNow,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-valuetext': ariaValueText,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
  };

  return (
    <div style={containerStyle} className={className} role="progressbar" {...ariaProps}>
      <style>{`
        @keyframes progress-animation {
          0% {
            left: -30%;
          }
          100% {
            left: 100%;
          }
        }
        @keyframes query-animation {
          0% {
            opacity: 0;
            left: -30%;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            left: 100%;
          }
        }
      `}</style>

      {variant === 'determinate' ? (
        <progress
          id={id}
          value={percent}
          max={100}
          style={trackStyle}
          title={`${percent}% complete`}
        />
      ) : (
        <div style={trackStyle} id={id}>
          <div style={indeterminateAnimationStyle} />
        </div>
      )}
    </div>
  );
};

export default LinearProgress;
