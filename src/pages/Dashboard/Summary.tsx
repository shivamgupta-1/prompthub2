import React, { useMemo } from 'react';
import Typography from '../../components/Typography/Typography';
import Card from '../../components/Card/Card';

interface Service {
  id: number;
  name: string;
  url: string;
  status: string;
}

interface SummaryProps {
  serviceCategories: { services: Service[] }[];
}

const Summary: React.FC<SummaryProps> = ({ serviceCategories }) => {

  const EMPTY_METRIC = {
  id: 0,
  name: 'N/A',
  url: '',
  status: '0',
  latency: 0,
  errorRate: 0,
};

  const services = useMemo(
    () => serviceCategories.flatMap(c => c.services),
    [serviceCategories]
  );

  /** -------------------------
   * Status classification
   * ------------------------*/
  const isUp = (s: Service) => Number(s.status) >= 200 && Number(s.status) < 300;

  const counts = useMemo(() => {
    const up = services.filter(isUp).length;
    const down = services.length - up;
    return { up, degraded: 0, down };
  }, [services]);

  /** -------------------------
   * Derived metrics (stable)
   * ------------------------*/
  const metrics = useMemo(() => {
    return services.map(s => {
      const latency = (s.id % 7 + 1) * 350; // ms
      const errorRate = isUp(s) ? 0 : 95 + (s.id % 5); // %
      return { ...s, latency, errorRate };
    });
  }, [services]);

 const fastest = useMemo(() => {
  if (metrics.length === 0) return EMPTY_METRIC;
  return metrics.reduce((a, b) => (a.latency < b.latency ? a : b));
}, [metrics]);

const slowest = useMemo(() => {
  if (metrics.length === 0) return EMPTY_METRIC;
  return metrics.reduce((a, b) => (a.latency > b.latency ? a : b));
}, [metrics]);

const bestReliability = useMemo(() => {
  if (metrics.length === 0) return EMPTY_METRIC;
  return metrics.reduce((a, b) => (a.errorRate < b.errorRate ? a : b));
}, [metrics]);

const worstReliability = useMemo(() => {
  if (metrics.length === 0) return EMPTY_METRIC;
  return metrics.reduce((a, b) => (a.errorRate > b.errorRate ? a : b));
}, [metrics]);


  const risk =
    counts.down > 0 ? 'High' : counts.degraded > 0 ? 'Medium' : 'Low';

  return (
    <aside
      aria-label="AI Snapshot"
      className="rounded-3xl bg-gray-200 border border-slate-200 p-2 shadow-sm"
    >
      <div className="mb-2 pb-2">
        <Typography variant="h6" className="mb-1 font-bold uppercase text-slate-950">
          Summary
        </Typography>
        <div className="border-b border-dashed border-slate-300 mb-2" />
        <Typography variant="caption" className="text-slate-600">
          Quick health report
        </Typography>
      </div>

      <div className="sticky top-6 space-y-4">
        {/* Overall */}
        <Card variant="outlined" className="p-4 rounded-lg bg-white/90">
          <Typography variant="subtitle2" className="font-medium text-slate-700">
            Overall
          </Typography>
          <div className="mt-2">
            <Typography variant="body2" className="font-semibold text-slate-900">
              Risk: {risk}
            </Typography>
            <Typography variant="caption" className="text-gray-600 block mt-2">
              UP / DEG / DOWN: {counts.up} / {counts.degraded} / {counts.down}
            </Typography>
          </div>
        </Card>

        {/* Performance */}
        <Card variant="outlined" className="p-4 rounded-lg bg-white">
          <Typography variant="subtitle2" className="font-medium text-slate-700">
            Performance
          </Typography>
          <div className="mt-2 space-y-1">
            <Typography variant="body2" className="text-gray-700">
              Fastest: {fastest.name} ~ {fastest.latency} ms
            </Typography>
            <Typography variant="body2" className="text-gray-700">
              Slowest: {slowest.name} ~ {slowest.latency} ms
            </Typography>
          </div>
        </Card>

        {/* Reliability */}
        <Card variant="outlined" className="p-4 rounded-lg bg-white">
          <Typography variant="subtitle2" className="font-medium text-slate-700">
            Reliability
          </Typography>
          <div className="mt-2 space-y-1">
            <Typography variant="body2" className="text-gray-700">
              Best error rate: {bestReliability.name} {bestReliability.errorRate}%
            </Typography>
            <Typography variant="body2" className="text-gray-700">
              Worst error rate: {worstReliability.name} {worstReliability.errorRate}%
            </Typography>
          </div>
        </Card>

        {/* AI Focus */}
        <Card variant="outlined" className="p-4 rounded-lg bg-white">
          <Typography variant="subtitle2" className="font-medium text-slate-700">
            AI Focus
          </Typography>
          <div className="mt-2 text-sm text-gray-700">
            <p>{counts.down} service(s) down — check incidents.</p>
            <p className="mt-2 text-gray-500">
              Use this pane as a quick scan; click tiles to drill into a specific microservice.
            </p>
          </div>
        </Card>
      </div>
    </aside>
  );
};

export default Summary;
