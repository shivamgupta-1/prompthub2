/**
 * Stepper Component
 *
 * A visual indicator component that displays progress through a sequence of steps.
 * Supports both horizontal and vertical orientations with customizable styling.
 * Uses design tokens from tokens.css for consistent theming and sizing.
 *
 * @example
 * ```tsx
 * const steps: StepperStep[] = [
 *   { label: 'Step 1', description: 'First step' },
 *   { label: 'Step 2', description: 'Second step' },
 *   { label: 'Step 3', description: 'Third step' },
 * ];
 * <Stepper steps={steps} value={0} type="linear" />
 * ```
 */

import React, { useState } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import '../../../src/styles/tokens.css';

export interface StepperStep {
  /**
   * Label or title for the step
   */
  label: React.ReactNode;

  /**
   * Content to display for this step
   */
  content?: React.ReactNode;

  /**
   * Indicates if step is completed
   */
  completed?: boolean;

  /**
   * Describes the step (for accessibility)
   */
  description?: React.ReactNode;

  /**
   * Whether step is disabled
   */
  disabled?: boolean;

  /**
   * Optional icon or custom element for the step
   */
  icon?: React.ReactNode;
}

export interface StepperProps {
  /**
   * Array of step objects defining the stepper flow
   */
  steps: StepperStep[];

  /**
   * Unique identifier for the component
   */
  id?: string;

  /**
   * Additional CSS classes for custom styling
   */
  className?: string;

  /**
   * Stepper type: 'linear' requires steps in order, 'non-linear' allows any order
   */
  type?: 'linear' | 'non-linear';

  /**
   * Current step value (controlled)
   */
  value?: number;

  /**
   * Initial step value (uncontrolled)
   */
  defaultValue?: number;

  /**
   * Disables all interactions with the stepper
   */
  disabled?: boolean;

  /**
   * Minimum step index
   */
  min?: number;

  /**
   * Maximum step index
   */
  max?: number;

  /**
   * Step increment value
   */
  step?: number;

  /**
   * Tooltip or title text displayed on hover
   */
  title?: string;

  /**
   * Currently active/highlighted step (for uncontrolled usage)
   */
  activeStep?: number;

  /**
   * Stepper orientation: horizontal or vertical
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Whether to show alternative labels below steps
   */
  alternativeLabel?: boolean;

  /**
   * Connector element between steps
   */
  connector?: React.ReactNode;

  /**
   * Color variant using design tokens
   */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';

  /**
   * Size variant: small, medium, large
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Callback when a step is clicked
   */
  onClick?: (stepIndex: number) => void;

  /**
   * Callback when a step receives focus
   */
  onFocus?: (stepIndex: number) => void;

  /**
   * Callback when a step loses focus
   */
  onBlur?: (stepIndex: number) => void;

  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;

  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;

  /**
   * ID of element that labels this component
   */
  'aria-labelledby'?: string;

  /**
   * ID of element that describes this component
   */
  'aria-describedby'?: string;

  /**
   * Indicates if component is disabled
   */
  'aria-disabled'?: boolean;

  /**
   * ID of element controlled by this stepper
   */
  'aria-controls'?: string;

  /**
   * Marks the current/active step
   */
  'aria-current'?: 'step' | 'page' | 'location' | 'date' | 'time' | boolean;

  /**
   * Live region announcement mode
   */
  'aria-live'?: 'off' | 'polite' | 'assertive';
}

/**
 * Color config using CSS custom properties from tokens.css
 * Maps component color prop values to token-based inline styles
 */
const colorConfig: Record<'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit', { color: string }> = {
  primary: { color: 'var(--color-primary)' },
  secondary: { color: 'var(--color-secondary)' },
  error: { color: 'var(--color-error)' },
  info: { color: 'var(--color-info)' },
  success: { color: 'var(--color-success)' },
  warning: { color: 'var(--color-warning)' },
  inherit: { color: 'inherit' },
};

/**
 * Background color config for active step using design tokens
 */
const bgColorConfig: Record<'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit', { backgroundColor: string }> = {
  primary: { backgroundColor: 'var(--color-primary)' },
  secondary: { backgroundColor: 'var(--color-secondary)' },
  error: { backgroundColor: 'var(--color-error)' },
  info: { backgroundColor: 'var(--color-info)' },
  success: { backgroundColor: 'var(--color-success)' },
  warning: { backgroundColor: 'var(--color-warning)' },
  inherit: { backgroundColor: 'inherit' },
};

/**
 * Size config for step indicator dimensions
 * Maps size prop values to design token values
 */
const sizeConfig: Record<'sm' | 'md' | 'lg', { width: string; height: string; fontSize: string; iconSize: string }> = {
  sm: {
    width: 'var(--control-height-sm)',
    height: 'var(--control-height-sm)',
    fontSize: 'var(--font-size-xs)',
    iconSize: '14px',
  },
  md: {
    width: 'var(--control-height-md)',
    height: 'var(--control-height-md)',
    fontSize: 'var(--font-size-md)',
    iconSize: '18px',
  },
  lg: {
    width: 'var(--control-height-lg)',
    height: 'var(--control-height-lg)',
    fontSize: 'var(--font-size-lg)',
    iconSize: '24px',
  },
};

/**
 * Stepper Component
 *
 * A comprehensive stepper component for guiding users through multi-step processes.
 * Supports both controlled and uncontrolled usage with full accessibility features.
 * Integrates with design tokens for colors, sizing, and theming.
 *
 * @component
 * @param props - StepperProps
 * @returns JSX.Element
 */
const Stepper: React.FC<StepperProps> = ({
  steps,
  id,
  className,
  type = 'linear',
  value: controlledValue,
  defaultValue = 0,
  disabled = false,
  min = 0,
  max = steps.length - 1,
  step: stepIncrement = 1,
  title,
  activeStep: legacyActiveStep,
  orientation = 'horizontal',
  alternativeLabel = false,
  connector,
  color = 'primary',
  size = 'md',
  onClick,
  onFocus,
  onBlur,
  style,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-disabled': ariaDisabled,
  'aria-controls': ariaControls,
  'aria-current': ariaCurrent,
  'aria-live': ariaLive = 'polite',
}) => {
  // Determine active step - prioritize controlled value, then legacy prop, then uncontrolled
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(Math.max(min ?? 0, defaultValue));
  const currentStep = isControlled ? Math.min(controlledValue, max ?? steps.length - 1) : (legacyActiveStep ?? uncontrolledValue);

  /**
   * Handle step click with validation and callbacks
   */
  const handleStepClick = (stepIndex: number) => {
    if (disabled || steps[stepIndex]?.disabled) return;

    // Validate step index is within bounds
    const validatedIndex = Math.max(min ?? 0, Math.min(stepIndex, max ?? steps.length - 1));

    // In linear mode, only allow navigating to completed or current/next steps
    if (type === 'linear' && validatedIndex > currentStep) {
      // Check if all previous steps are completed
      const canProceed = steps.slice(0, validatedIndex).every((s) => s.completed);
      if (!canProceed) return;
    }

    if (!isControlled) {
      setUncontrolledValue(validatedIndex);
    }

    onClick?.(validatedIndex);
  };

  /**
   * Handle step focus
   */
  const handleStepFocus = (stepIndex: number) => {
    onFocus?.(stepIndex);
  };

  /**
   * Handle step blur
   */
  const handleStepBlur = (stepIndex: number) => {
    onBlur?.(stepIndex);
  };

  /**
   * Handle keyboard navigation for step increment/decrement
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, stepIndex: number) => {
    if (disabled) return;

    let nextStep: number | null = null;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextStep = Math.min(currentStep + (stepIncrement ?? 1), max ?? steps.length - 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextStep = Math.max(currentStep - (stepIncrement ?? 1), min ?? 0);
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextStep = min ?? 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextStep = max ?? steps.length - 1;
    }

    if (nextStep !== null && nextStep !== stepIndex) {
      handleStepClick(nextStep);
    }
  };

  /**
   * Get accessibility properties for current step
   */
  const getCurrentStepAriaProps = (stepIndex: number) => {
    const isCurrentStep = stepIndex === currentStep;
    return {
      'aria-current': isCurrentStep ? (ariaCurrent || 'step') : undefined,
      'aria-selected': isCurrentStep,
    };
  };

  /**
   * Get the button style object for a step
   */
  const getStepButtonStyle = (
    isActive: boolean,
    isCompleted: boolean,
    isDisabled: boolean | undefined
  ): React.CSSProperties => {
    const sizeConfig_value = sizeConfig[size] || sizeConfig.md;
    const colorValue = color as 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
    
    let backgroundColor = 'var(--bg-surface)';
    let borderColor = 'var(--color-secondary)';
    let textColor = colorConfig[colorValue]?.color || colorConfig.primary.color;

    if (isActive) {
      backgroundColor = bgColorConfig[colorValue]?.backgroundColor || bgColorConfig.primary.backgroundColor;
      borderColor = 'transparent';
      textColor = 'white';
    } else if (isCompleted) {
      backgroundColor = 'var(--color-success)';
      borderColor = 'var(--color-success)';
      textColor = 'white';
    }

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-full)',
      border: `var(--border-width-md) solid ${borderColor}`,
      transition: 'all var(--transition-fast)',
      width: sizeConfig_value.width,
      height: sizeConfig_value.height,
      fontWeight: 'var(--font-weight-semibold)',
      backgroundColor,
      color: textColor,
      cursor: isDisabled ? 'var(--cursor-disabled)' : 'pointer',
      opacity: isDisabled ? 'var(--opacity-disabled)' : 1,
    };
  };

  /**
   * Get the step indicator content (icon, checkmark, or number)
   */
  const getStepIndicatorContent = (stepData: StepperStep, stepIndex: number, isCompleted: boolean): React.ReactNode => {
    if (stepData.icon) return stepData.icon;
    if (isCompleted) return <span className="text-lg">✓</span>;
    return <span>{stepIndex + 1}</span>;
  };

  const sizeConfig_value = sizeConfig[size] || sizeConfig.md;
  const colorValue = color as 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';

  const stepperContent = (
    <div
      id={id}
      style={{
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        justifyContent: alternativeLabel && orientation === 'horizontal' ? 'space-between' : undefined,
        gap: 'var(--space-4)',
        ...style,
      }}
      className={className}
      role="tablist"
      aria-orientation={orientation}
      aria-label={ariaLabel || `Stepper with ${steps.length} steps`}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-disabled={ariaDisabled ?? disabled}
      aria-controls={ariaControls}
      aria-live={ariaLive}
    >
      {steps.map((stepData, stepIndex) => {
        const isActive = stepIndex === currentStep;
        const isCompleted = stepData.completed ?? stepIndex < currentStep;
        const isDisabled = disabled || stepData.disabled;
        const canNavigate =
          type === 'non-linear' || stepIndex <= currentStep || (isCompleted && stepIndex === currentStep + 1);
        const stepKey = `step-${typeof stepData.label === 'string' ? stepData.label.toLowerCase().replaceAll(/\s+/g, '-') : stepIndex}`;
        const stepLabel = typeof stepData.label === 'string' ? stepData.label : `Step ${stepIndex + 1}`;
        const stepAriaLabel = ariaLabel || stepLabel;

        return (
          <div
            key={stepKey}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: orientation === 'vertical' ? 'var(--space-4)' : undefined,
              flexDirection: alternativeLabel && orientation === 'horizontal' ? 'column' : undefined,
              position: orientation === 'horizontal' ? 'relative' : undefined,
            }}
          >
            {/* Step indicator button */}
            <button
              type="button"
              style={getStepButtonStyle(isActive, isCompleted, isDisabled)}
              aria-label={stepAriaLabel}
              onClick={() => handleStepClick(stepIndex)}
              onKeyDown={(e) => handleKeyDown(e, stepIndex)}
              onFocus={() => handleStepFocus(stepIndex)}
              onBlur={() => handleStepBlur(stepIndex)}
              disabled={isDisabled || !canNavigate}
              tabIndex={isActive ? 0 : -1}
              {...getCurrentStepAriaProps(stepIndex)}
            >
              {getStepIndicatorContent(stepData, stepIndex, isCompleted)}
            </button>

            {/* Step label and description */}
            <div
              style={{
                marginTop: alternativeLabel && orientation === 'horizontal' ? 'var(--space-2)' : undefined,
                marginLeft: !alternativeLabel && orientation !== 'vertical' ? 'var(--space-3)' : undefined,
                textAlign: alternativeLabel ? 'center' : undefined,
              }}
            >
              <p
                style={{
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: sizeConfig_value.fontSize,
                  color: isActive ? colorConfig[colorValue]?.color || colorConfig.primary.color : 'var(--color-gray-700)',
                  margin: 0,
                }}
              >
                {stepData.label}
              </p>
              {stepData.description && (
                <p
                  style={{
                    color: 'var(--color-gray-600)',
                    fontSize: 'var(--font-size-xs)',
                    marginTop: 'var(--space-1)',
                    margin: 'var(--space-1) 0 0 0',
                  }}
                >
                  {stepData.description}
                </p>
              )}
            </div>

            {/* Connector between steps */}
            {stepIndex < steps.length - 1 && (
              <div
                style={{
                  marginLeft: orientation === 'vertical' ? 'var(--space-5)' : undefined,
                  marginTop: orientation === 'vertical' ? 'var(--space-1)' : undefined,
                  marginBottom: orientation === 'vertical' ? 'var(--space-1)' : undefined,
                  height: orientation === 'vertical' ? '32px' : '2px',
                  width: orientation === 'vertical' ? '2px' : '48px',
                  position: orientation !== 'vertical' ? 'absolute' : undefined,
                  top: orientation !== 'vertical' ? '20px' : undefined,
                  left: orientation !== 'vertical' ? 'calc(100% + 8px)' : undefined,
                  backgroundColor: isCompleted ? 'var(--color-success)' : 'var(--color-secondary)',
                }}
              >
                {connector}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return title ? (
    <Tooltip title={title}>{stepperContent}</Tooltip>
  ) : (
    stepperContent
  );
};

export default Stepper;
