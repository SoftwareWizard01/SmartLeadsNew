import { LeadStatus, LeadSource, ILead } from './lead.model';
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
export declare const mapLeadToDto: (lead: ILead) => LeadDto;
//# sourceMappingURL=lead.types.d.ts.map