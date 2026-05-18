import React from 'react';
import Typography from '../../components/Typography/Typography';
import ServiceCard from './ServiceCard';
import type { ServiceCategory } from './types';

interface ServiceCategoryProps {
  category: ServiceCategory;
  startServiceNumber: number;
}

const ServiceCategory: React.FC<ServiceCategoryProps> = ({
  category,
  startServiceNumber,
}) => {
  const headingId = `${category.categoryId}-heading`;

  return (
    <div className="rounded-3xl bg-sky-100 border border-slate-200 p-2 shadow-sm">
      {/* Category Header */}
      <div className="mb-2 pb-2">
        <Typography
          id={headingId}
          variant="h6"
          className="mb-1 font-bold uppercase text-slate-950"
        >
          {category.categoryName}
        </Typography>

        <div className="border-b border-dashed border-slate-300 mb-2" />

        <Typography
          variant="caption"
          className="text-slate-600"
        >
          {category.services[0]?.description || "Description here"}
        </Typography>
      </div>

      {/* Services Grid */}
      <div
        className="grid grid-cols-1 gap-2 sm:grid-cols-2"
        role="list"
        aria-labelledby={headingId}
      >
        {category.services.map((service, index) => (
          <div key={service.id} role="listitem">
            <ServiceCard
              service={service}
              number={startServiceNumber + index}
              ariaLabel={`Service ${startServiceNumber + index}: ${service.name}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategory;