/**
 * CategoryManagement Page
 *
 * Purpose:
 * - Presents a Category Management view for organizing system services by domain.
 * - Provides a "New Category" action that opens an accessible `CustomModal`.
 *
 * Behavior:
 * - Renders a header with page title and a primary "New Category" button.
 * - Clicking "New Category" opens `CustomModal` containing a simple form
 *   with an image header, category name, and description fields.
 * - The modal is keyboard accessible and follows app modal patterns (uses `CustomModal`).
 *
 * Accessibility notes:
 * - Uses semantic headings and form labels.
 * - Focus is managed by `CustomModal` when opened; Escape closes the dialog.
 * - Form fields are associated with labels and aria-describedby where appropriate.
 */

import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField';
import CustomModal from '../../components/Modal/CustomModal';
import Typography from '../../components/Typography/Typography';

const CategoryManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook up create-category API call here
    console.log('Create category', { categoryName, description });
    closeModal();
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <Typography variant="h2">Category Management</Typography>
          <p className="mt-1 text-sm text-slate-500">Organize and monitor your system services by operational domains.</p>
        </div>

        <div>
          <Button onClick={openModal} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-lg shadow-sm transition">
            + New Category
          </Button>
        </div>
      </div>

      {/* Placeholder for category cards grid (kept simple) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <h3 className="text-lg font-medium">Infrastructure</h3>
          <p className="mt-2 text-sm text-slate-500">Core hardware, server clusters, and networking components.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <h3 className="text-lg font-medium">API Services</h3>
          <p className="mt-2 text-sm text-slate-500">External and internal REST gateways and microservices.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <h3 className="text-lg font-medium">Security</h3>
          <p className="mt-2 text-sm text-slate-500">Firewall logs, encryption status, and access control management.</p>
        </div>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        setIsopen={setIsModalOpen}
        handleClose={closeModal}
        title={"Add New Category"}
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="w-full h-28 bg-gradient-to-r from-slate-800 via-slate-600 to-slate-400 rounded-md overflow-hidden flex items-end p-3">
            <span className="text-white text-sm opacity-90">&nbsp;</span>
          </div>

          <div>
            <label htmlFor="category-name" className="text-sm font-medium text-slate-700">Category Name</label>
            <TextField
              id="category-name"
              placeholder="e.g. Analytics"
              value={categoryName}
              onChange={(e) => setCategoryName(String(e.target.value))}
              size="medium"
            />
          </div>

          <div>
            <label htmlFor="category-description" className="text-sm font-medium text-slate-700">Description</label>
            <textarea
              id="category-description"
              placeholder="Briefly describe the services in this group"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-3 text-sm min-h-[110px]"
              aria-describedby="category-description-help"
            />
            <p id="category-description-help" className="text-xs text-slate-400 mt-1">Optional</p>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button type="button" onClick={closeModal} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-md">Cancel</Button>
            <Button type="submit" className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md">Create Category</Button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default CategoryManagement;
