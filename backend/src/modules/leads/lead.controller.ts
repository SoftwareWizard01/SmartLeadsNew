import { Request, Response } from 'express';
import { LeadService } from './lead.service';
import { CreateLeadDto, UpdateLeadDto, LeadFilterDto } from './lead.types';
import { LeadQueryInput } from './lead.schema';
import { sendSuccess, sendPaginated } from '../../shared/utils/apiResponse';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { streamLeadsAsCsv } from '../../shared/utils/csvExport';

const leadService = new LeadService();

export const getLeads = asyncHandler(async (req: Request, res: Response) => {
  const filters = req.query as unknown as LeadQueryInput;
  const { leads, pagination } = await leadService.getLeads(filters as LeadFilterDto);
  sendPaginated(res, leads, pagination, 'Leads retrieved successfully.');
});

export const getLeadById = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.getLeadById(req.params.id);
  sendSuccess(res, lead, 'Lead retrieved successfully.');
});

export const createLead = asyncHandler(async (req: Request, res: Response) => {
  const dto: CreateLeadDto = {
    ...req.body,
    createdBy: req.user!.userId,
  };
  const lead = await leadService.createLead(dto);
  sendSuccess(res, lead, 'Lead created successfully.', 201);
});

export const updateLead = asyncHandler(async (req: Request, res: Response) => {
  const dto = req.body as UpdateLeadDto;
  const role = req.user!.role;
  const lead = await leadService.updateLead(req.params.id, dto, role);
  sendSuccess(res, lead, 'Lead updated successfully.');
});

export const deleteLead = asyncHandler(async (req: Request, res: Response) => {
  await leadService.deleteLead(req.params.id);
  sendSuccess(res, null, 'Lead deleted successfully.');
});

export const exportLeadsCsv = asyncHandler(async (req: Request, res: Response) => {
  const { status, source, search } = req.query as {
    status?: string;
    source?: string;
    search?: string;
  };

  const leads = await leadService.getLeadsForExport({
    status: status as LeadFilterDto['status'],
    source: source as LeadFilterDto['source'],
    search,
  });

  streamLeadsAsCsv(res, leads);
});
