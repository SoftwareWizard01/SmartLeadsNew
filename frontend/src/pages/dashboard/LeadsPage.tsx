import { useState } from 'react';
import { useLeads, useDeleteLead, useExportCsv } from '../../hooks/useLeads';
import { useDebounce } from '../../hooks/useDebounce';
import LeadFilters from '../../components/leads/LeadFilters';
import LeadStatusBadge from '../../components/leads/LeadStatusBadge';
import Pagination from '../../components/ui/Pagination';
import Button from '../../components/ui/Button';
import LeadFormModal from '../../components/leads/LeadFormModal';
import RoleGuard from '../../layouts/RoleGuard';
import { Lead } from '../../types/lead.types';
import { Plus, Download, Edit2, Trash2, Inbox } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import { SOURCE_COLORS } from '../../lib/constants';

const LeadsPage = () => {
  // Local state for filters
  const [filters, setFilters] = useState({
    status: '',
    source: '',
    search: '',
    sort: 'latest' as 'latest' | 'oldest',
  });
  const [page, setPage] = useState(1);

  // Debounce search so we don't spam the API on every keystroke
  const debouncedSearch = useDebounce(filters.search, 350);

  // Query using derived state
  const { data, isLoading, isError, refetch } = useLeads({
    status: filters.status || undefined,
    source: filters.source || undefined,
    search: debouncedSearch || undefined,
    sort: filters.sort,
    page,
    limit: 10,
  });

  const deleteLead = useDeleteLead();
  const exportCsv = useExportCsv();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadToEdit, setLeadToEdit] = useState<Lead | null>(null);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset to page 1 on any filter change
  };

  const clearFilters = () => {
    setFilters({ status: '', source: '', search: '', sort: 'latest' });
    setPage(1);
  };

  const openEditModal = (lead: Lead) => {
    setLeadToEdit(lead);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setLeadToEdit(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      await deleteLead.mutateAsync(id);
    }
  };

  const handleExport = () => {
    exportCsv.mutate({
      status: filters.status || undefined,
      source: filters.source || undefined,
      search: debouncedSearch || undefined,
      sort: filters.sort,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Leads</h2>
          <p className="text-sm text-surface-400 mt-1">Manage and track your pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <RoleGuard allowedRoles={['admin']}>
            <Button
              variant="secondary"
              onClick={handleExport}
              isLoading={exportCsv.isPending}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </RoleGuard>
          <Button onClick={openCreateModal}>
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <LeadFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={clearFilters}
      />

      {/* Data Table */}
      <div className="glass-panel rounded-xl overflow-hidden border border-surface-700">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm text-surface-300">
            <thead className="bg-surface-900/50 text-xs uppercase text-surface-400 border-b border-surface-800">
              <tr>
                <th className="px-6 py-4 font-medium tracking-wider">Lead</th>
                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                <th className="px-6 py-4 font-medium tracking-wider">Source</th>
                <th className="px-6 py-4 font-medium tracking-wider">Added</th>
                <th className="px-6 py-4 font-medium tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-800">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                    </div>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-red-400">
                    Failed to load leads. <button onClick={() => refetch()} className="underline">Retry</button>
                  </td>
                </tr>
              ) : data?.data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <Inbox className="mx-auto h-12 w-12 text-surface-600 mb-3" />
                    <p className="text-surface-300 font-medium text-lg">No leads found</p>
                    <p className="text-surface-500 mt-1">Try adjusting your filters or create a new lead.</p>
                  </td>
                </tr>
              ) : (
                data?.data.map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface-800/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-white">{lead.name}</div>
                      <div className="text-xs text-surface-400 mt-0.5">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <LeadStatusBadge status={lead.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={`capitalize ${SOURCE_COLORS[lead.source]}`}>
                        {lead.source}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-surface-400">
                      {new Date(lead.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditModal(lead)}
                          className="p-1.5 text-surface-400 hover:text-blue-400 hover:bg-surface-700 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <RoleGuard allowedRoles={['admin']}>
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="p-1.5 text-surface-400 hover:text-red-400 hover:bg-surface-700 rounded-md transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </RoleGuard>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Wrapper */}
        {data?.pagination && (
          <Pagination pagination={data.pagination} onPageChange={setPage} />
        )}
      </div>

      {/* Form Modal */}
      <LeadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        leadToEdit={leadToEdit}
      />
    </div>
  );
};

export default LeadsPage;
