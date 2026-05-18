/**
 * DeleteModal
 *
 * Purpose:
 * - A small wrapper around `CustomModal` for delete confirmations.
 * - Shows a title `Delete ${data}` and a confirmation message with Cancel/Delete actions.
 *
 * Props:
 * - `isDeleteOpen: boolean` — Controlled open state for the delete modal.
 * - `setIsDeleteOpen?: (open: boolean) => void` — Optional setter to keep caller state in sync.
 * - `onDelete: () => void` — Callback invoked when the user confirms deletion.
 * - `data: string` — Name or identifier used in the title (e.g. item name).
 * - `handleClose?: () => void` — Optional additional close handler.
 *
 * Behavior:
 * - Uses `CustomModal` for keyboard and focus handling.
 * - Clicking the backdrop does NOT close the modal.
 * - Modal closes when clicking the close icon, Cancel, Delete (after invoking `onDelete`), or pressing Escape.
 */

import React from 'react';
import CustomModal from './CustomModal';

export interface DeleteModalProps {
  isDeleteOpen: boolean;
  setIsDeleteOpen?: (open: boolean) => void;
  onDelete: () => void;
  data: string;
  handleClose?: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isDeleteOpen,
  setIsDeleteOpen,
  onDelete,
  data,
  handleClose,
}) => {
  const close = () => {
    handleClose?.();
    setIsDeleteOpen?.(false);
  };

  const confirmDelete = () => {
    try {
      onDelete();
    } finally {
      setIsDeleteOpen?.(false);
      handleClose?.();
    }
  };

  return (
    <CustomModal
      isOpen={isDeleteOpen}
      setIsopen={setIsDeleteOpen}
      handleClose={close}
      title={`Delete ${data}`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ margin: 0, color: 'var(--text-secondary, #6b7280)' }}>
          Are you sure you want to delete {data}?
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
          <button
            onClick={close}
            type="button"
            style={{
              padding: '8px 12px',
              background: 'transparent',
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              cursor: 'pointer',
              color: 'var(--text-primary)'
            }}
          >
            Cancel
          </button>

          <button
            onClick={confirmDelete}
            type="button"
            style={{
              padding: '8px 12px',
              background: 'var(--color-error, #ef4444)',
              color: 'var(--text-inverse, #fff)',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default DeleteModal;
