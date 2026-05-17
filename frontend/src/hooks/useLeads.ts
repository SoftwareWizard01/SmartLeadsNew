import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsApi } from '../api/leads.api';
import { LeadQueryFilters } from '../types/lead.types';
import toast from 'react-hot-toast';

// ── GET Leads (Paginated & Filtered) ──────────────────────────────────────────
export const useLeads = (filters: LeadQueryFilters) => {
  return useQuery({
    queryKey: ['leads', filters],
    queryFn: () => leadsApi.getLeads(filters),
    placeholderData: (previousData) => previousData, // keep old data while fetching new (avoids flicker)
  });
};

// ── CREATE Lead ──────────────────────────────────────────────────────────────
export const useCreateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: leadsApi.createLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead created successfully');
    },
  });
};

// ── UPDATE Lead ──────────────────────────────────────────────────────────────
export const useUpdateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: leadsApi.updateLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead updated successfully');
    },
  });
};

// ── DELETE Lead ──────────────────────────────────────────────────────────────
export const useDeleteLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: leadsApi.deleteLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead deleted successfully');
    },
  });
};

// ── EXPORT CSV ───────────────────────────────────────────────────────────────
export const useExportCsv = () => {
  return useMutation({
    mutationFn: leadsApi.exportCsv,
    onSuccess: (data) => {
      // Create a blob link to download
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      toast.success('Export started');
    },
  });
};
