import React from 'react';
import Badge from '../ui/Badge';
import { LeadStatus } from '../../types/lead.types';
import { STATUS_COLORS } from '../../lib/constants';

interface LeadStatusBadgeProps {
  status: LeadStatus;
}

const LeadStatusBadge: React.FC<LeadStatusBadgeProps> = ({ status }) => {
  const colorClass = STATUS_COLORS[status] || 'bg-surface-700 text-surface-200';
  
  return (
    <Badge className={`capitalize ${colorClass}`}>
      {status}
    </Badge>
  );
};

export default LeadStatusBadge;
