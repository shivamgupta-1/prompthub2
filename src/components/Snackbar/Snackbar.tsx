/**
 * Snackbar Component
 *
 * A dismissible notification component that appears at the bottom or top of the screen.
 * Automatically disappears after a configurable duration or when user closes it.
 * Renders using React Portal and uses design tokens from tokens.css for consistent styling.
 *
 * @example
 * ```tsx
 * <Snackbar open={true} onClose={() => setOpen(false)} autoHideDuration={3000}>
 *   Success! Your changes have been saved.
 * </Snackbar>
 * ```
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../../../src/styles/tokens.css';

export type SnackbarSize = 'sm' | 'md' | 'lg';
export type SnackbarVariant = 'filled' | 'outlined' | 'standard';
export type SnackbarPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'top-right'
  | 'top-left'
  | 'top-center';

export interface SnackbarProps {
  /** Unique identifier for the snackbar element */
  id?: string;

  /** Additional CSS classes for the portal container */
  className?: string;

  /** Custom classes for the snackbar box */
  snackbarClassName?: string;

  /** Custom classes for the close button */
  closeButtonClassName?: string;

  /** Optional element displayed before the message */
  startDecorator?: React.ReactNode;

  /** Optional element displayed after the message */
  endDecorator?: React.ReactNode;

  /** Size variant - 'sm' (small), 'md' (medium), 'lg' (large) */
  size?: SnackbarSize;

  /** Visual variant - 'filled', 'outlined', 'standard' */
  variant?: SnackbarVariant;

  /** Duration in milliseconds before auto-closing (0 or undefined = no auto-close) */
  autoHideDuration?: number;

  /** Position on screen */
  position?: SnackbarPosition;

  /** Controls visibility of the snackbar */
  open?: boolean;

  /** Called when snackbar is closed */
  onClose?: () => void;

  /** Message content */
  children?: React.ReactNode;

  /** CSS animation classes for enter animation */
  enterAnimation?: string;

  /** CSS animation classes for exit animation */
  exitAnimation?: string;

  /** Accessibility label for screen readers */
  'aria-label'?: string;

  /** ID of element that labels this snackbar */
  'aria-labelledby'?: string;

  /** ID of element that describes this snackbar */
  'aria-describedby'?: string;

  /** ARIA live region politeness level */
  'aria-live'?: 'off' | 'polite' | 'assertive';
}

const sizeConfig: Record<SnackbarSize, { padding: string; fontSize: string }> = {
  sm: {
    padding: 'var(--space-2) var(--space-3)',
    fontSize: 'var(--font-size-sm)',
  },
  md: {
    padding: 'var(--space-3) var(--space-4)',
    fontSize: 'var(--font-size-md)',
  },
  lg: {
    padding: 'var(--space-4) var(--space-5)',
    fontSize: 'var(--font-size-lg)',
  },
};

const variantConfig: Record<
  SnackbarVariant,
  {
    backgroundColor: string;
    color: string;
    border?: string;
  }
> = {
  filled: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--text-inverse)',
  },
  outlined: {
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--color-primary)',
    border: `var(--border-width-sm) solid var(--color-primary)`,
  },
  standard: {
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-primary)',
  },
};

const positionConfig: Record<SnackbarPosition, { bottom?: string; top?: string; left?: string; right?: string; transform?: string }> = {
  'bottom-right': { bottom: 'var(--space-6)', right: 'var(--space-6)' },
  'bottom-left': { bottom: 'var(--space-6)', left: 'var(--space-6)' },
  'bottom-center': { bottom: 'var(--space-6)', left: '50%', transform: 'translateX(-50%)' },
  'top-right': { top: 'var(--space-6)', right: 'var(--space-6)' },
  'top-left': { top: 'var(--space-6)', left: 'var(--space-6)' },
  'top-center': { top: 'var(--space-6)', left: '50%', transform: 'translateX(-50%)' },
};

/**
 * Snackbar Component
 *
 * A dismissible notification that appears at the bottom or top of the screen.
 * Uses React Portal to render outside the component tree and supports customizable
 * animations, sizes, and variants with full accessibility support.
 */
export const Snackbar: React.FC<SnackbarProps> = ({
  id,
  className = '',
  snackbarClassName = '',
  closeButtonClassName = '',
  size = 'md',
  variant = 'standard',
  position = 'bottom-right',
  startDecorator,
  endDecorator,
  autoHideDuration = 3000,
  open = true,
  onClose,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-live': ariaLive = 'polite',
}) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const handleClose = useCallback(() => {
    setIsAnimatingOut(true);
    globalThis.setTimeout(() => onClose?.(), 200);
  }, [onClose]);

  // Auto-hide
  useEffect(() => {
    if (!open || isAnimatingOut) return;
    if (autoHideDuration && autoHideDuration > 0) {
      if (timerRef.current) globalThis.clearTimeout(timerRef.current);
      timerRef.current = globalThis.setTimeout(handleClose, autoHideDuration);
    }
    return () => {
      if (timerRef.current) {
        globalThis.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [open, isAnimatingOut, autoHideDuration, handleClose]);

  // Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    globalThis.addEventListener('keydown', handleKey);
    return () => globalThis.removeEventListener('keydown', handleKey);
  }, [handleClose]);

  if (!open && !isAnimatingOut) return null;

  const role = ariaLive === 'assertive' ? 'alert' : 'status';
  const isVisible = open && !isAnimatingOut;

  const sizeConfig_value = sizeConfig[size] || sizeConfig.md;
  const variantConfig_value = variantConfig[variant] || variantConfig.standard;
  const positionConfig_value = positionConfig[position] || positionConfig['bottom-right'];

  const portalStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 'var(--z-toast)',
    pointerEvents: 'none',
  };

  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'auto',
    ...positionConfig_value,
  };

  const snackbarStyle: React.CSSProperties = {
    minWidth: '260px',
    maxWidth: '448px',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    ...sizeConfig_value,
    backgroundColor: variantConfig_value.backgroundColor,
    color: variantConfig_value.color,
    border: variantConfig_value.border,
    fontFamily: 'var(--font-family-sans)',
    transition: `opacity var(--transition-fast), transform var(--transition-fast)`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.95)',
  };

  const closeButtonStyle: React.CSSProperties = {
    marginLeft: 'var(--space-2)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-2)',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    border: 'none',
    color: 'inherit',
    transition: `background-color var(--transition-fast)`,
  };

  const startDecoratorStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const endDecoratorStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  };

  return createPortal(
    <div style={portalStyle} className={className}>
      <style>{`
        @keyframes snackbarEnter {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes snackbarExit {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.95); }
        }
      `}</style>
      <div style={positionStyle}>
        <div
          id={id}
          role={role}
          aria-live={ariaLive}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          style={snackbarStyle}
          className={snackbarClassName}
        >
          {startDecorator && <span style={startDecoratorStyle}>{startDecorator}</span>}
          <div style={contentStyle}>{children}</div>
          {endDecorator && <span style={endDecoratorStyle}>{endDecorator}</span>}

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close snackbar"
            style={closeButtonStyle}
            className={closeButtonClassName}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Snackbar;
