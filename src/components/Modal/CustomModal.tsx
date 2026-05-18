/**
 * CustomModal
 *
 * Purpose:
 * - A lightweight, accessible modal component that opens when `isOpen` is true.
 * - The main content is provided via `children` so the modal is fully dynamic.
 *
 * Props:
 * - `isOpen: boolean` — Controlled open state. When false the modal is not rendered.
 * - `setIsopen?: (open: boolean) => void` — Optional setter for controlled state.
 * - `handleClose: () => void` — Callback invoked when the modal should close (close icon or Escape key).
 * - `title?: string` — Optional title shown in the modal header.
 * - `children?: React.ReactNode` — Main content rendered inside the modal body.
 *
 * Accessibility & Behavior notes:
 * - Uses `role="dialog"` and `aria-modal="true"` and links `aria-labelledby` to the title.
 * - Focus is moved to the close button when the modal opens.
 * - Pressing `Escape` closes the modal via `handleClose`.
 * - Clicking the backdrop does NOT close the modal (per requirements).
 * - While open, page scrolling is disabled (`document.body.style.overflow = 'hidden'`).
 *
 * This component was implemented with accessibility considerations in mind, but it
 * should still be tested with assistive technology and automated tools.
 */

import React, { useEffect, useRef } from 'react';

export interface CustomModalProps {
  isOpen: boolean;
  setIsopen?: (open: boolean) => void;
  handleClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  setIsopen,
  handleClose,
  title,
  children,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Disable background scroll
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the close button for keyboard users
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
        // If consumer provided setter, keep them in sync
        setIsopen?.(false);
      }
    };

    globalThis.addEventListener('keydown', handleKey);

    return () => {
      globalThis.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, handleClose, setIsopen]);

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'var(--overlay-backdrop, rgba(0,0,0,0.35))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1200,
  };

  const dialogStyle: React.CSSProperties = {
    background: 'var(--bg-surface, #fff)',
    color: 'var(--text-primary, #111827)',
    borderRadius: 8,
    width: 'min(720px, 96vw)',
    maxHeight: '95vh',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    position: 'relative',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid var(--border-color)',
  };

  const bodyStyle: React.CSSProperties = {
    padding: '16px 20px',
    overflow: 'auto',
    width: 'min(720px, 96vw)',
    maxHeight: '85vh',
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 8,
    fontSize: 18,
    lineHeight: 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const titleId = 'custom-modal-title';

  return (
    <div style={overlayStyle} aria-hidden={false}>
      <div
        role="dialog"
        aria-modal={true}
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        style={dialogStyle}
      >
        <div style={headerStyle}>
          {title ? (
            <h2 id={titleId} style={{ margin: 0, fontSize: 18 }}>
              {title}
            </h2>
          ) : (
            <div />
          )}

          <button
            ref={closeButtonRef}
            onClick={() => {
              handleClose();
              setIsopen?.(false);
            }}
            aria-label="Close dialog"
            title="Close"
            style={closeButtonStyle}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div style={bodyStyle}>{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
