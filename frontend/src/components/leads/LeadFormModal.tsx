import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { leadFormSchema, LeadFormData } from '../../schemas/lead.schema';
import { useCreateLead, useUpdateLead } from '../../hooks/useLeads';
import { Lead } from '../../types/lead.types';
import { LEAD_STATUSES, LEAD_SOURCES } from '../../lib/constants';
import { useAuthStore } from '../../store/authStore';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadToEdit?: Lead | null;
}

const LeadFormModal: React.FC<LeadFormModalProps> = ({ isOpen, onClose, leadToEdit }) => {
  const { user } = useAuthStore();
  const createLead = useCreateLead();
  const updateLead = useUpdateLead();
  const isSales = user?.role === 'sales';
  const isEdit = !!leadToEdit;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      status: 'new',
      source: 'website',
      notes: '',
    },
  });

  // Reset form when modal opens/closes or leadToEdit changes
  useEffect(() => {
    if (isOpen) {
      if (leadToEdit) {
        reset({
          name: leadToEdit.name,
          email: leadToEdit.email,
          status: leadToEdit.status,
          source: leadToEdit.source,
          notes: leadToEdit.notes,
        });
      } else {
        reset({ status: 'new', source: 'website', notes: '' });
      }
    }
  }, [isOpen, leadToEdit, reset]);

  const onSubmit = async (data: LeadFormData) => {
    if (isEdit) {
      // Sales can only update status
      const payload = isSales ? { status: data.status } : data;
      await updateLead.mutateAsync({ id: leadToEdit.id, data: payload });
    } else {
      await createLead.mutateAsync(data);
    }
    onClose();
  };

  const isPending = createLead.isPending || updateLead.isPending || isSubmitting;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Lead' : 'Create New Lead'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* If Sales User is editing, they can only see/edit status */}
        {isEdit && isSales ? (
          <div className="p-4 rounded-lg bg-surface-900 border border-surface-700 mb-4">
            <p className="text-sm text-surface-400 mb-1">Editing status for:</p>
            <p className="font-medium text-white">{leadToEdit.name} ({leadToEdit.email})</p>
          </div>
        ) : (
          <>
            <Input
              label="Name"
              placeholder="John Doe"
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              error={errors.email?.message}
              {...register('email')}
            />
          </>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-200 mb-1.5">Status</label>
            <select
              className="flex h-10 w-full rounded-md border border-surface-600 bg-surface-800 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              {...register('status')}
            >
              {LEAD_STATUSES.map(status => (
                <option key={status} value={status} className="capitalize">
                  {status}
                </option>
              ))}
            </select>
            {errors.status && <p className="mt-1 text-xs text-red-400">{errors.status.message}</p>}
          </div>

          {(!isEdit || !isSales) && (
            <div>
              <label className="block text-sm font-medium text-surface-200 mb-1.5">Source</label>
              <select
                className="flex h-10 w-full rounded-md border border-surface-600 bg-surface-800 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                {...register('source')}
              >
                {LEAD_SOURCES.map(source => (
                  <option key={source} value={source} className="capitalize">
                    {source}
                  </option>
                ))}
              </select>
              {errors.source && <p className="mt-1 text-xs text-red-400">{errors.source.message}</p>}
            </div>
          )}
        </div>

        {(!isEdit || !isSales) && (
          <div>
            <label className="block text-sm font-medium text-surface-200 mb-1.5">Notes</label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-surface-600 bg-surface-800 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 placeholder:text-surface-500"
              placeholder="Add any additional notes here..."
              {...register('notes')}
            />
            {errors.notes && <p className="mt-1 text-xs text-red-400">{errors.notes.message}</p>}
          </div>
        )}

        <div className="pt-4 flex justify-end gap-3 border-t border-surface-700">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isPending}>
            {isEdit ? 'Save Changes' : 'Create Lead'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default LeadFormModal;
