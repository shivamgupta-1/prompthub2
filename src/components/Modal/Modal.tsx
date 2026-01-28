import React, { useEffect, useRef } from 'react';
import '../../../src/styles/tokens.css';

/**
 * BackdropProps
 * Configuration for the modal backdrop overlay.
 */
export interface BackdropProps {
  /** Additional CSS classes applied to the backdrop element */
  className?: string;
}

/**
 * ModalProps
 * Configuration for the Modal component.
 *
 * @example
 * ```tsx
 * <Modal isOpen={true} onClose={() => setOpen(false)} title="Confirm Action">
 *   Are you sure you want to proceed?
 * </Modal>
 * ```
 */
export interface ModalProps {
  /** Unique identifier for the modal */
  id?: string;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback fired when modal should close (backdrop click or Escape press) */
  onClose?: (event?: unknown) => void;
  /** Modal body content */
  children?: React.ReactNode;
  /** Whether pressing Escape key closes the modal */
  disableEscapeKeyDown?: boolean;
  /** Whether to show the backdrop overlay */
  hideBackdrop?: boolean;
  /** Props to pass to the backdrop element */
  BackdropProps?: BackdropProps;
  /** Additional CSS classes for the modal wrapper */
  className?: string;
  /** Modal title/header text */
  title?: React.ReactNode;
  /** Named slots for custom content (header, footer, actions) */
  slots?: Record<string, React.ReactNode>;
  /** Maximum width of the modal content (CSS value, e.g. '600px' or '90vw') */
  maxWidth?: string;
  /** Maximum height of the modal content (CSS value, e.g. '80vh') */
  maxHeight?: string;
  /** ARIA label for the modal dialog */
  'aria-label'?: string;
  /** ID of element that labels the modal */
  'aria-labelledby'?: string;
  /** ID of element that describes the modal */
  'aria-describedby'?: string;
  /** IDs of elements controlled by this modal */
  'aria-controls'?: string;
  /** Whether this element is a modal (aria-modal) */
  'aria-modal'?: boolean;
  /** Announces changes to the modal region */
  'aria-live'?: 'off' | 'polite' | 'assertive';
}

/**
 * Modal Component
 *
 * A versatile modal dialog component following project conventions.
 * Supports keyboard navigation (Escape), backdrop dismissal, and comprehensive accessibility.
 * Uses design tokens from tokens.css for consistent styling.
 *
 * Features:
 * - Controlled component (isOpen/onClose)
 * - Escape key handling with disableEscapeKeyDown option
 * - Backdrop click to dismiss
 * - Flexible slot-based content architecture
 * - Full accessibility support (ARIA attributes, focus management)
 * - Design token-based styling (colors, spacing, shadows, z-index)
 */
const Modal: React.FC<ModalProps> = ({
  id,
  isOpen = false,
  onClose,
  children,
  disableEscapeKeyDown = false,
  hideBackdrop = false,
  BackdropProps,
  className = '',
  title,
  slots,
  maxWidth = '600px',
  maxHeight = '80vh',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-controls': ariaControls,
  'aria-modal': ariaModal = true,
  'aria-live': ariaLive = 'polite',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Handle Escape key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !disableEscapeKeyDown && isOpen) {
        onClose?.(undefined);
      }
    };
    if (isOpen) {
      globalThis.addEventListener('keydown', handleKeyDown);
      return () => globalThis.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, disableEscapeKeyDown, onClose]);

  // Focus the modal container when opened for accessibility
  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--z-modal')) || 1050,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const backdropStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'var(--overlay-backdrop)',
    cursor: 'pointer',
  };

  const dialogStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth,
    maxHeight,
    padding: 'var(--space-6)',
    backgroundColor: 'var(--bg-surface)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    outline: 'none',
    overflowY: 'auto',
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: 'var(--space-4)',
    fontWeight: 'var(--font-weight-semibold)',
    fontSize: 'var(--font-size-lg)',
    color: 'var(--text-primary)',
  };

  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'var(--space-4)',
    right: 'var(--space-4)',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: 'var(--font-size-2xl)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    padding: 'var(--space-1)',
    transition: `color var(--transition-normal)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  };

  return (
    <div id={id} style={containerStyle}>
      {/* Backdrop */}
      {!hideBackdrop && (
        <button
          type="button"
          aria-label="close modal"
          onClick={() => onClose?.(undefined)}
          style={backdropStyle}
          className={BackdropProps?.className}
        />
      )}

      {/* Modal Dialog */}
      <div
        ref={containerRef}
        role="dialog"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-controls={ariaControls}
        aria-modal={ariaModal}
        aria-live={ariaLive}
        tabIndex={-1}
        style={dialogStyle}
        className={className}
      >
        {/* Header/Title */}
        {slots?.header ?? (
          title ? (
            <div style={headerStyle}>
              {title}
            </div>
          ) : null
        )}

        {/* Body Content */}
        <div style={{ color: 'var(--text-primary)', lineHeight: 'var(--line-height-normal)' }}>
          {children}
        </div>

        {/* Footer */}
        {slots?.footer && (
          <div style={{ marginTop: 'var(--space-6)' }}>
            {slots.footer}
          </div>
        )}

        {/* Actions */}
        {slots?.actions && (
          <div style={{ marginTop: 'var(--space-4)' }}>
            {slots.actions}
          </div>
        )}

        {/* Close Button */}
        {onClose && (
          <button
            type="button"
            aria-label="close modal"
            onClick={() => onClose?.(undefined)}
            style={closeButtonStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
