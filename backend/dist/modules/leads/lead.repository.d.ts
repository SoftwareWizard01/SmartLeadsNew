import { ILead } from './lead.model';
import { CreateLeadDto, UpdateLeadDto, LeadFilterDto } from './lead.types';
import { PaginationMeta } from '../../shared/utils/apiResponse';
export interface PaginatedLeads {
    leads: ILead[];
    pagination: PaginationMeta;
}
export declare class LeadRepository {
    findAll(filters: LeadFilterDto): Promise<PaginatedLeads>;
    findById(id: string): Promise<ILead | null>;
    create(data: CreateLeadDto): Promise<ILead>;
    updateById(id: string, data: UpdateLeadDto): Promise<ILead | null>;
    deleteById(id: string): Promise<boolean>;
    findAllForExport(filters: Omit<LeadFilterDto, 'page' | 'limit'>): Promise<ILead[]>;
}
//# sourceMappingURL=lead.repository.d.ts.map