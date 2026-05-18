import React, { useMemo, useState } from 'react';

export type ServiceFormValues = {
  serviceName: string;
  category?: string;
  endpoint: string;
  description?: string;
  targetUptime?: number | '';
  maxLatency?: number | '';
  throughput?: number | '';
  environment: 'Dev' | 'QA' | 'Production';
  status?: string;
};

export interface CreateEditServiceProps {
  initialValues?: Partial<ServiceFormValues>;
  onCancel?: () => void;
  onSave: (values: ServiceFormValues) => Promise<void> | void;
  applicationOptions?: string[];
  categoryDisabled?: boolean;
}

const defaultValues: ServiceFormValues = {
  serviceName: '',
  category: '',
  endpoint: '',
  description: '',
  targetUptime: '',
  maxLatency: '',
  throughput: '',
  environment: 'Dev',
  status: '200',
};

function isPositiveNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

function isInteger(value: unknown) {
  return Number.isInteger(value as number);
}

export default function CreateEditService({ initialValues, onCancel, onSave, applicationOptions, categoryDisabled }: CreateEditServiceProps) {
  const merged = useMemo(() => ({ ...defaultValues, ...(initialValues || {}) }), [initialValues]);

  const [values, setValues] = useState<ServiceFormValues>(merged as ServiceFormValues);
  // reset local form values when initialValues change (useful when reusing component)
  React.useEffect(() => {
    setValues(merged as ServiceFormValues);
  }, [merged]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!values.serviceName || values.serviceName.trim() === '') {
      e.serviceName = 'Service name is required.';
    }
    if (!values.endpoint || values.endpoint.trim() === '') {
      e.endpoint = 'Endpoint is required.';
    } else {
      try {
        // basic URL-like check
        // allow relative endpoints like /api/v1
        if (!(values.endpoint.startsWith('/') || /^https?:\/\//i.test(values.endpoint))) {
          e.endpoint = 'Endpoint must be a valid URL or start with `/`.';
        }
      } catch {
        e.endpoint = 'Endpoint looks invalid.';
      }
    }

    if (values.targetUptime !== '' && typeof values.targetUptime === 'number') {
      if (values.targetUptime < 0 || values.targetUptime > 100) {
        e.targetUptime = 'Target uptime must be between 0 and 100.';
      }
    }

    if (values.maxLatency !== '' && values.maxLatency !== undefined) {
      if (!(isPositiveNumber(values.maxLatency) || typeof values.maxLatency === 'number')) {
        e.maxLatency = 'Max latency must be a number >= 0.';
      }
    }

    if (values.throughput !== '' && values.throughput !== undefined) {
      const n = Number(values.throughput);
      if (!Number.isFinite(n) || n < 0 || !Number.isInteger(n)) {
        e.throughput = 'Throughput must be a non-negative integer.';
      }
    }

    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  function handleChange<K extends keyof ServiceFormValues>(key: K, raw: unknown) {
    setValues((v) => ({ ...v, [key]: raw }));
  }

  function handleBlur(key: string) {
    setTouched((t) => ({ ...t, [key]: true }));
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setTouched({
      serviceName: true,
      endpoint: true,
      description: true,
      targetUptime: true,
      maxLatency: true,
      throughput: true,
      environment: true,
      status: true,
    });

    if (!isValid) return;

    setSubmitting(true);
    try {
      // normalize numeric fields
      const payload: ServiceFormValues = {
        ...values,
        targetUptime: values.targetUptime === '' ? undefined : Number(values.targetUptime),
        maxLatency: values.maxLatency === '' ? undefined : Number(values.maxLatency),
        throughput: values.throughput === '' ? undefined : Number(values.throughput),
      } as ServiceFormValues;

      await onSave(payload);
    } finally {
      setSubmitting(false);
    }
  }

  const mode = initialValues ? 'Edit' : 'Create';

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby="service-form-title">
      <h2 id="service-form-title" className="text-lg font-semibold text-slate-900">{mode} Service</h2>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="serviceName" className="block text-xs font-semibold uppercase tracking-wide text-slate-600">Service Name</label>
          <input
            id="serviceName"
            name="serviceName"
            placeholder="e.g. Payments Microservice"
            value={values.serviceName}
            onChange={(e) => handleChange('serviceName', e.target.value)}
            onBlur={() => handleBlur('serviceName')}
            aria-describedby={errors.serviceName && touched.serviceName ? 'serviceName-error' : undefined}
            className="mt-2 block w-full rounded border border-slate-200 px-3 py-2 text-sm placeholder-slate-400 focus:border-blue-500 focus:outline-none"
          />
          {errors.serviceName && touched.serviceName && (
            <p id="serviceName-error" className="text-sm text-red-600 mt-1">{errors.serviceName}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-xs font-semibold uppercase tracking-wide text-slate-600">Category</label>
            {Array.isArray(applicationOptions) && applicationOptions.length > 0 ? (
              <select
                id="category"
                name="category"
                value={values.category ?? ''}
                onChange={(e) => handleChange('category', e.target.value)}
                onBlur={() => handleBlur('category')}
                disabled={!!categoryDisabled}
                aria-disabled={!!categoryDisabled}
                className="mt-2 block w-full rounded border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">Search categories...</option>
                {applicationOptions.map((app) => (
                  <option key={app} value={app}>{app}</option>
                ))}
              </select>
            ) : (
              <input
                id="category"
                name="category"
                placeholder="Search categories..."
                value={values.category ?? ''}
                onChange={(e) => handleChange('category', e.target.value)}
                className="mt-2 block w-full rounded border border-slate-200 px-3 py-2 text-sm placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            )}
            {errors.category && touched.category && (
              <p className="text-sm text-red-600 mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label htmlFor="endpoint" className="block text-xs font-semibold uppercase tracking-wide text-slate-600">Endpoint URL</label>
            <input
              id="endpoint"
              name="endpoint"
              placeholder="https:// api.service.com"
              value={values.endpoint}
              onChange={(e) => handleChange('endpoint', e.target.value)}
              onBlur={() => handleBlur('endpoint')}
              aria-describedby={errors.endpoint && touched.endpoint ? 'endpoint-error' : undefined}
              className="mt-2 block w-full rounded border border-slate-200 px-3 py-2 text-sm placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
            {errors.endpoint && touched.endpoint && (
              <p id="endpoint-error" className="text-sm text-red-600 mt-1">{errors.endpoint}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <fieldset>
            <legend className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-3">Target Environment</legend>
            <div className="flex gap-3">
              {(['Dev', 'QA', 'Production'] as const).map((env) => (
                <button
                  key={env}
                  type="button"
                  onClick={() => handleChange('environment', env)}
                  className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    values.environment === env
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {env}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="status" className="block text-xs font-semibold uppercase tracking-wide text-slate-600">Status</label>
            <input
              id="status"
              name="status"
              type="text"
              placeholder="e.g. 200, 201, 500"
              value={values.status ?? ''}
              onChange={(e) => handleChange('status', e.target.value)}
              onBlur={() => handleBlur('status')}
              disabled={!!initialValues}
              aria-disabled={!!initialValues}
              className={`mt-2 block w-full rounded border border-slate-200 px-3 py-2 text-sm placeholder-slate-400 focus:border-blue-500 focus:outline-none ${
                initialValues ? 'bg-slate-100 cursor-not-allowed' : ''
              }`}
            />
            {initialValues && (
              <p className="text-xs text-slate-500 mt-1">Status is read-only in edit mode</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wide text-slate-600">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Briefly describe the purpose of this service..."
            value={values.description ?? ''}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            className="mt-2 block w-full rounded border border-slate-200 px-3 py-2 text-sm placeholder-slate-400 focus:border-blue-500 focus:outline-none resize-none"
            rows={3}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => onCancel?.()}
            className="rounded px-6 py-2 text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid || submitting}
            aria-disabled={!isValid || submitting}
            className={`rounded px-6 py-2 text-sm font-medium text-white transition-colors ${
              !isValid || submitting 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {submitting ? 'Saving...' : mode === 'Edit' ? 'Save' : 'Create'}
          </button>
        </div>
      </div>
    </form>
  );
}
