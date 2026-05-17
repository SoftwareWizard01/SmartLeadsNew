import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { LEAD_STATUSES, LEAD_SOURCES } from '../../lib/constants';

interface LeadFiltersProps {
  filters: {
    status: string;
    source: string;
    search: string;
    sort: 'latest' | 'oldest';
  };
  onChange: (key: string, value: string) => void;
  onClear: () => void;
}

const LeadFilters: React.FC<LeadFiltersProps> = ({ filters, onChange, onClear }) => {
  const hasActiveFilters = filters.status !== '' || filters.source !== '' || filters.search !== '';

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between bg-surface-900/50 p-4 rounded-xl border border-surface-700">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-surface-400" />
        </div>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange('search', e.target.value)}
          placeholder="Search by name or email..."
          className="block w-full pl-10 pr-3 py-2 border border-surface-600 rounded-lg leading-5 bg-surface-800 text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
        />
      </div>

      {/* Dropdowns */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-surface-400" />
          <select
            value={filters.status}
            onChange={(e) => onChange('status', e.target.value)}
            className="block w-32 py-1.5 pl-3 pr-8 border border-surface-600 bg-surface-800 text-white rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 capitalize"
          >
            <option value="">All Statuses</option>
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <select
          value={filters.source}
          onChange={(e) => onChange('source', e.target.value)}
          className="block w-32 py-1.5 pl-3 pr-8 border border-surface-600 bg-surface-800 text-white rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 capitalize"
        >
          <option value="">All Sources</option>
          {LEAD_SOURCES.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(e) => onChange('sort', e.target.value)}
          className="block w-32 py-1.5 pl-3 pr-8 border border-surface-600 bg-surface-800 text-white rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="latest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="inline-flex items-center text-sm text-surface-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default LeadFilters;
