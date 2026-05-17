import { LeadStatus, LeadSource, ILead } from './lead.model';
import mongoose from 'mongoose';

export interface CreateLeadDto {
  name: string;
  email: string;
  status?: LeadStatus;
  source: LeadSource;
  notes?: string;
  createdBy: string;
}

export interface UpdateLeadDto {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
  notes?: string;
}

export interface LeadFilterDto {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: 'latest' | 'oldest';
  page?: number;
  limit?: number;
}

export interface LeadDto {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  notes: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const mapLeadToDto = (lead: ILead): LeadDto => ({
  id: lead._id.toString(),
  name: lead.name,
  email: lead.email,
  status: lead.status,
  source: lead.source,
  notes: lead.notes ?? '',
  createdBy: (lead.createdBy as mongoose.Types.ObjectId).toString(),
  createdAt: lead.createdAt.toISOString(),
  updatedAt: lead.updatedAt.toISOString(),
});
