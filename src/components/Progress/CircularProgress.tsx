/**
 * CircularProgress Component
 *
 * A circular progress indicator component that displays progress as a rotating circle.
 * Supports both determinate (with value) and indeterminate (animated) variants.
 * Uses design tokens from tokens.css for consistent styling across the application.
 *
 * @example
 * ```tsx
 * // Determinate progress (50%)
 * <CircularProgress value={50} variant="determinate" size="md" />
 *
 * // Indeterminate loading state
 * <CircularProgress variant="indeterminate" size="lg" />
 * ```
 */

import React from 'react';
import '../../../src/styles/tokens.css';

export interface CircularProgressProps {
  /** Unique identifier for the component */
  id?: string;

  /** Additional CSS classes for custom styling */
  className?: string;

  /** Progress value (0-100) for determinate variant */
  value?: number;

  /** Current progress value for accessibility */
  'aria-valuenow'?: number;

  /** Text description of current progress for accessibility */
  'aria-valuetext'?: string;

  /** Size of the circular progress - 'sm' (24px), 'md' (40px), 'lg' (56px) */
  size?: 'sm' | 'md' | 'lg';

  /** Progress variant: 'determinate' shows actual value, 'indeterminate' shows animated loading */
  variant?: 'determinate' | 'indeterminate';

  /** Color variant using design tokens */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';

  /** Accessibility label for screen readers */
  'aria-label'?: string;

  /** ID of element that labels this component */
  'aria-labelledby'?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;

  /** Stroke thickness (in pixels) */
  thickness?: number;
}

const sizeConfig: Record<'sm' | 'md' | 'lg', number> = {
  sm: 24,
  md: 40,
  lg: 56,
};

const colorMap: Record<string, string> = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  error: 'var(--color-error)',
  info: 'var(--color-info)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  inherit: 'inherit',
};

/**
 * CircularProgress Component
 *
 * Renders a circular progress indicator that can display both determinate progress
 * and indeterminate (loading) states. Uses SVG for sharp rendering and supports
 * accessibility attributes for screen readers.
 */
const CircularProgress: React.FC<CircularProgressProps> = ({
  id,
  value = 0,
  size = 'md',
  variant = 'indeterminate',
  color = 'primary',
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-valuenow': ariaValueNow,
  'aria-valuetext': ariaValueText,
  style,
  thickness = 4,
}) => {
  // Resolve size to numeric value
  const numericSize = sizeConfig[size] || 40;
  const radius = (numericSize - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke dash offset based on variant and value
  const offset =
    variant === 'determinate'
      ? circumference - (value / 100) * circumference
      : circumference * 0.7;

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    ...style,
  };

  const svgStyle: React.CSSProperties = {
    animation: variant === 'indeterminate' ? `spin var(--transition-slow) linear infinite` : undefined,
  };

  const circleStyle: React.CSSProperties = {
    stroke: colorMap[color],
    strokeDasharray: circumference,
    strokeDashoffset: offset,
    strokeLinecap: 'round',
    transition: variant === 'determinate' ? `stroke-dashoffset var(--transition-normal)` : undefined,
  };

  const backgroundCircleStyle: React.CSSProperties = {
    stroke: 'var(--bg-muted)',
  };

  return (
    <div style={containerStyle} className={className}>
      {variant === 'determinate' ? (
        <progress
          id={id}
          value={value}
          max={100}
          style={style}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-valuetext={ariaValueText}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
        />
      ) : (
        <svg
          id={id}
          width={numericSize}
          height={numericSize}
          style={svgStyle}
          role="progressbar"
          aria-valuenow={ariaValueNow}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={ariaValueText}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          viewBox={`0 0 ${numericSize} ${numericSize}`}
        >
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>

          {/* Background circle */}
          <circle
            cx={numericSize / 2}
            cy={numericSize / 2}
            r={radius}
            fill="none"
            strokeWidth={thickness}
            style={backgroundCircleStyle}
          />

          {/* Progress circle */}
          <circle
            cx={numericSize / 2}
            cy={numericSize / 2}
            r={radius}
            fill="none"
            strokeWidth={thickness}
            style={circleStyle}
          />
        </svg>
      )}
    </div>
  );
};

export default CircularProgress;
