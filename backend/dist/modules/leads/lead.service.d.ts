import { CreateLeadDto, UpdateLeadDto, LeadFilterDto, LeadDto } from './lead.types';
import { PaginationMeta } from '../../shared/utils/apiResponse';
import { ILead } from './lead.model';
export interface PaginatedLeadDtos {
    leads: LeadDto[];
    pagination: PaginationMeta;
}
export declare class LeadService {
    private readonly repo;
    constructor();
    getLeads(filters: LeadFilterDto): Promise<PaginatedLeadDtos>;
    getLeadById(id: string): Promise<LeadDto>;
    createLead(dto: CreateLeadDto): Promise<LeadDto>;
    updateLead(id: string, dto: UpdateLeadDto, role: 'admin' | 'sales'): Promise<LeadDto>;
    deleteLead(id: string): Promise<void>;
    getLeadsForExport(filters: Omit<LeadFilterDto, 'page' | 'limit'>): Promise<ILead[]>;
}
//# sourceMappingURL=lead.service.d.ts.map