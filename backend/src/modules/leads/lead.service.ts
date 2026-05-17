import { AppError } from '../../shared/utils/AppError';
import { LeadRepository } from './lead.repository';
import {
  CreateLeadDto,
  UpdateLeadDto,
  LeadFilterDto,
  LeadDto,
  mapLeadToDto,
} from './lead.types';
import { PaginationMeta } from '../../shared/utils/apiResponse';
import { ILead } from './lead.model';

export interface PaginatedLeadDtos {
  leads: LeadDto[];
  pagination: PaginationMeta;
}

export class LeadService {
  private readonly repo: LeadRepository;

  constructor() {
    this.repo = new LeadRepository();
  }

  async getLeads(filters: LeadFilterDto): Promise<PaginatedLeadDtos> {
    const { leads, pagination } = await this.repo.findAll(filters);
    return {
      leads: leads.map(mapLeadToDto),
      pagination,
    };
  }

  async getLeadById(id: string): Promise<LeadDto> {
    const lead = await this.repo.findById(id);
    if (!lead) throw new AppError('Lead not found.', 404);
    return mapLeadToDto(lead);
  }

  async createLead(dto: CreateLeadDto): Promise<LeadDto> {
    const lead = await this.repo.create(dto);
    return mapLeadToDto(lead);
  }

  /**
   * Admin: full update. Sales: status-only update.
   */
  async updateLead(
    id: string,
    dto: UpdateLeadDto,
    role: 'admin' | 'sales'
  ): Promise<LeadDto> {
    const exists = await this.repo.findById(id);
    if (!exists) throw new AppError('Lead not found.', 404);

    // Field guard: sales users may only change status
    const updatePayload: UpdateLeadDto =
      role === 'sales' ? { status: dto.status } : dto;

    const updated = await this.repo.updateById(id, updatePayload);
    if (!updated) throw new AppError('Failed to update lead.', 500);

    return mapLeadToDto(updated);
  }

  async deleteLead(id: string): Promise<void> {
    const deleted = await this.repo.deleteById(id);
    if (!deleted) throw new AppError('Lead not found.', 404);
  }

  async getLeadsForExport(
    filters: Omit<LeadFilterDto, 'page' | 'limit'>
  ): Promise<ILead[]> {
    return this.repo.findAllForExport(filters);
  }
}
