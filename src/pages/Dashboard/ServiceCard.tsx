/**
 * ServiceCard Component
 * Displays individual service card with status indicator, name, number, and HTTP status
 * Features:
 * - Interactive hover effect with smooth zoom (1.2x scale)
 * - Status indicator with color coding
 * - Responsive design with proper accessibility
 */

import React, { useState } from 'react';
import Card from '../../components/Card/Card';
import Typography from '../../components/Typography/Typography';
import type { Service } from './types';

interface ServiceCardProps {
  service: Service;
  number: number;
  ariaLabel?: string;
}

const statusConfig = {
  '200': {
    color: 'bg-green-600',
    bgColor: 'bg-green-50',
    label: 'Running',
    borderColor: 'border-green-500',
  },
  'not-certain': {
    color: 'bg-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Not certain',
    borderColor: 'border-yellow-600',
  },
  '400': {
    color: 'bg-red-600',
    bgColor: 'bg-red-50',
    label: 'Down',
    borderColor: 'border-red-500',
  },
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service, number, ariaLabel }) => {
  const [isHovering, setIsHovering] = useState(false);
  const config = statusConfig[service?.status];

  const tileClasses = `w-full rounded-lg border ${config.borderColor || 'border-slate-700'} ${config.bgColor || 'bg-white'} py-[6px] px-2 shadow transition-transform duration-300 ease-in-out cursor-pointer ${
    isHovering ? 'scale-105' : 'scale-100'
  }`;

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Card
      variant="outlined"
      className={tileClasses}
      aria-label={ariaLabel || `${service.name} - ${config.label}`}
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex h-full flex-col justify-between gap-[10px]">
        <div className="flex items-start justify-between gap-1 min-w-0">
          <Typography
            variant="body2"
            className="flex-1 text-left font-semibold text-slate-900 min-w-0 whitespace-normal break-normal leading-tight !text-[11px]"
          >
            {service.name}
          </Typography>

          <Typography variant="caption" className="!text-[10px] text-slate-400 font-medium shrink-0 font-bold">
            {number}
          </Typography>
        </div>

        <div className="flex flex-col  justify-end gap-1">
          <div className="flex items-center gap-1">
            <span className={`inline-flex h-2.5 w-2.5 rounded-full ${config.color}`} aria-hidden="true" />
            <Typography variant="caption" className="text-slate-900 !text-[11px] font-semibold  text-left">
              {config.label}
            </Typography>
          </div>
          <Typography variant="caption" className="!text-[13px] text-slate-400 text-left">
            HTTP {service.status} <span className="mx-1">•</span> 427 ms
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
