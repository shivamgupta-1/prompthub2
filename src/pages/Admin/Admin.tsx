import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import { DeleteModal, CustomModal } from '../../components/Modal';
import ToastMessage from '../../components/ToastMessage/ToastMessage';
import CreateEditService, { type ServiceFormValues } from './createEditService';
import {
  useGetDashboardQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from '../../redux/api';

type Service = {
  id: number;
  serviceName: string;
  endpoint: string;
  status: 'Operational' | 'Latency Warning' | 'Maintenance' | 'Service Down';
  environment: string;
  category?: string | null;
};

interface ServiceType {
  serviceId: number;
  serviceName: string;
  baseUrl: string;
  status: string;
  categoryName?: string | null;
  categoryId?: string | number;
  description?: string;
  environmentId: string | number;
  environmentName: string;
}

export default function Admin() {

  const [services, setServices] = useState<ServiceType[]>([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceType | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'default'>('default');

  // Helper function to show toast with type
  const showToast = (message: string, type: 'success' | 'error' | 'default' = 'default') => {
    setToastMessage(message);
    setToastType(type);
  };

  const getEnvironmentID = (env: string) => {
    switch (env) {
      case 'DEV': return "1";
      case 'QA': return "2";
      case 'PROD': return "3";
      default: return "1";
    }
  };
  const applicationLists = [{
    "id": 2,
    "name": "Slide Tool"
  },
  {
    "id": 1,
    "name": "PNC Insurance"
  },
  {
    "id": 3,
    "name": "Test Application"
  }
  ];

  const getApplicationId = (appName: string) => {

    const appId = applicationLists.filter((app) => app.name === appName);
    return appId[0]?.id;
  };

  const PAGE_SIZE = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(services.length / PAGE_SIZE);

  const paginatedServices = services.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  function handleEdit(item: ServiceType) {
    console.log('Editing service:', item);
    setEditingService(item);
    setIsFormOpen(true);
  }

  // initialize services from API dashboard data (applications with urls)
  const { data: dashboardData } = useGetDashboardQuery();
  const [createService] = useCreateServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  useEffect(() => {
    if (!dashboardData || dashboardData.length === 0) return;
    const updateDashboardData = dashboardData.map((item, i) => ({
      serviceId: item.id,
      serviceName: item.tile,
      categoryName: item.applicationName ?? 'Uncategorized',
      categoryId: item.applicationId ?? `${100 - i}`,
      baseUrl: item.baseUrl,
      status: item.status ?? '200',
      environmentName: item.environmentName ?? 'QA',
      environmentId: item.environmentId ?? "1",
      description: item.description,
    }));
    setServices(updateDashboardData);
  }, [dashboardData]);

  function openDeleteModal(item: ServiceType) {
    setSelectedService(item);
    setIsDeleteOpen(true);
  }

  function confirmDelete() {
    if (!selectedService) return;
    (async () => {
      try {
        await deleteService(selectedService.serviceId).unwrap();
        showToast(`✓ Service "${selectedService.serviceName}" deleted successfully!`, 'success');
      } catch (err) {
        showToast('✗ Failed to delete service. Please try again.', 'error');
      }
      setServices((prev) => prev.filter((s) => s.serviceId !== selectedService.serviceId));
      setSelectedService(null);
      setIsDeleteOpen(false);
    })();
  }

  function openCreateModal() {
    setEditingService(null);
    setIsFormOpen(true);
  }

  async function handleSaveService(values: ServiceFormValues) {
    // If editing, update existing service via API; otherwise create new one
    console.log('Saving service with values:', values);
    try {
      if (editingService) {
        const payload = {
          id: editingService.serviceId,
          baseUrl: values.endpoint,
          tile: values.serviceName,
          description: values.description,
          applicationId: getApplicationId(values.category),
          applicationName: values.category,
          environmentId: getEnvironmentID(values.environment),
          environmentName: values.environment,
          status: "400",
        } as any;
        const res = await updateService(payload).unwrap();
        setServices((prev) => prev.map((s) => (s.serviceId === res.serviceId ? { ...s, serviceName: res.tile ?? s.serviceName, endpoint: res.baseUrl ?? s.baseUrl, categoryName: res.applicationName ?? s.categoryName, environmentName: res.environmentName ?? s.environmentName } : s)));
        showToast(`✓ Service "${values.serviceName}" updated successfully!`, 'success');
      } else {
        const payload = {
          "application": {
            "id": getApplicationId(values.category)
          },
          "environment": {
            "id": getEnvironmentID(values.environment)|| "1"
          },
          "baseUrl": values.endpoint,
          "tile": values.serviceName,
          "description": values.description,
          "status": "400",
        } as any;
        const res = await createService(payload).unwrap();
        setServices((prev) => [...prev, { serviceId: res.id, serviceName: res.serviceName ?? values.serviceName, endpoint: res.baseUrl ?? values.endpoint, status: 'Operational', environmentName: res.environmentName ?? values.environment, categoryName: res.applicationName ?? values.category }]);
        showToast(`✓ Service "${values.serviceName}" created successfully!`, 'success');
      }
    } catch (err) {
      showToast('✗ Failed to save service. Please try again.', 'error');
    }

    setEditingService(null);
    setIsFormOpen(false);
  }

  return (
    <>
      <ToastMessage message={toastMessage} setMessage={setToastMessage} type={toastType} />
      <div>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <div className="flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-100 h-screen sticky top-0">

              <div className="px-4 mt-2">
                <nav aria-label="Main navigation">
                  <ul className="space-y-2">
                    <li>
                      <button className="flex items-center gap-3 w-full px-3 py-4 rounded-lg text-md font-medium text-violet-600 bg-violet-50">
                        <span className="ml-1">Endpoints</span>
                      </button>
                    </li>
                    <li>
                      <button className="flex items-center gap-3 w-full px-3 py-4 rounded-lg text-md font-medium text-slate-700 hover:bg-slate-50">
                        Categories
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>

            </aside>

            {/* Main content */}
            <main className="flex-1 p-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-semibold">Service Health Dashboard</h1>
                  <p className="mt-1 text-sm text-slate-500">Manage and monitor endpoints, services, and their health status.</p>
                </div>

                <div>
                  <Button
                    onClick={openCreateModal}
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-lg shadow-sm transition"
                  >
                    <span className="mr-2">+</span> Create Endpoint
                  </Button>
                </div>
              </div>

              {/* Registered Microservices card */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Registered Services</h2>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-100">
                  {/* Scrollable body */}
                  <div className="max-h-[450px]">
                    <table className="min-w-full text-left">
                      <caption className="sr-only">List of registered microservices</caption>
                      <thead>
                        <tr className="text-xs text-slate-500 border-b border-slate-100">
                          <th className="py-3 px-4">Service Name</th>
                          <th className="py-3 px-4">Endpoint URL</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Environment</th>
                          <th className="py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {paginatedServices?.map((s) => (
                          <tr key={s.serviceId} className="align-top bg-white">
                            <td className="py-4 px-4 text-sm font-medium text-slate-900">{s.serviceName}</td>
                            <td className="py-4 px-4 text-sm text-violet-600">{s.baseUrl}</td>
                            <td className="py-4 px-4 text-sm">{s.categoryName ?? '-'}</td>
                            <td className="py-4 px-4">{s.status}</td>
                            <td className="py-4 px-4"><span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700">{s.environmentName}</span></td>
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <button onClick={() => handleEdit(s)} aria-label={`Edit ${s.serviceName}`} className="text-sm text-violet-600 hover:underline"><button
                                  className="inline-flex items-center justify-center rounded-md p-1.5 text-violet-600 hover:bg-violet-50 hover:text-violet-700 transition"
                                  aria-label="Edit"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M16.862 3.487a2.25 2.25 0 013.182 3.182L7.5 19.213
         3 21l1.787-4.5L16.862 3.487z"
                                    />
                                  </svg>
                                </button></button>
                                <button onClick={() => openDeleteModal(s)} aria-label={`Delete ${s.serviceName}`} className="text-sm text-red-600 hover:underline"><button
                                  className="inline-flex items-center justify-center rounded-md p-1.5 text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                                  aria-label="Delete"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="h-5 w-5 text-slate-500 hover:text-red-600 transition"
                                  >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-1 14H6L5 6" />
                                    <path d="M10 11v6" />
                                    <path d="M14 11v6" />
                                    <path d="M9 6V4h6v2" />
                                  </svg>
                                </button></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-slate-500">
                    Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                    {Math.min(currentPage * PAGE_SIZE, services.length)} of {services.length}
                  </p>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm rounded border bg-white disabled:opacity-50"
                    >
                      Previous
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToPage(i + 1)}
                        className={`px-3 py-1 text-sm rounded border transition ${currentPage === i + 1
                            ? 'bg-violet-600 text-white'
                            : 'bg-white hover:bg-slate-100'
                          }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm rounded border bg-white disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        <DeleteModal
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          onDelete={confirmDelete}
          data={selectedService?.serviceName ?? ''}
          handleClose={() => {
            setSelectedService(null);
            setIsDeleteOpen(false);
          }}
        />

        {/* Create / Edit Service modal */}
        <CustomModal
          isOpen={isFormOpen}
          title={editingService ? `Edit ${editingService.serviceName} Service` : 'Create Service'}
          setIsopen={setIsFormOpen}
          handleClose={() => {
            setEditingService(null);
            setIsFormOpen(false);
          }}
        >
          <CreateEditService
            initialValues={editingService ? {
              serviceName: editingService.serviceName,
              category: editingService.categoryName ?? '',
              endpoint: editingService.baseUrl,
              description: editingService.description ?? '',
              environment: editingService.environmentName,
            } : undefined}
            onCancel={() => {
              setEditingService(null);
              setIsFormOpen(false);
            }}
            onSave={handleSaveService}
            categoryDisabled={!!editingService}
            categoryOptions={applicationLists.map((app) => app.name)}
          />
        </CustomModal>
      </div>
    </>
  );
}
