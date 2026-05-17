import { FilterQuery } from 'mongoose';
import { Lead, ILead } from './lead.model';
import { CreateLeadDto, UpdateLeadDto, LeadFilterDto } from './lead.types';
import { PaginationMeta } from '../../shared/utils/apiResponse';

export interface PaginatedLeads {
  leads: ILead[];
  pagination: PaginationMeta;
}

export class LeadRepository {
  async findAll(filters: LeadFilterDto): Promise<PaginatedLeads> {
    const {
      status,
      source,
      search,
      sort = 'latest',
      page = 1,
      limit = 10,
    } = filters;

    const query: FilterQuery<ILead> = {};

    if (status) query.status = status;
    if (source) query.source = source;
    if (search) {
      // Use text index for full-text; fallback to regex if no text index yet
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOrder = sort === 'oldest' ? 1 : -1;
    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      Lead.find(query).sort({ createdAt: sortOrder }).skip(skip).limit(limit).lean<ILead[]>(),
      Lead.countDocuments(query),
    ]);

    return {
      leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<ILead | null> {
    return Lead.findById(id).lean<ILead>();
  }

  async create(data: CreateLeadDto): Promise<ILead> {
    const lead = await Lead.create(data);
    return lead.toObject() as ILead;
  }

  async updateById(id: string, data: UpdateLeadDto): Promise<ILead | null> {
    return Lead.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean<ILead>();
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await Lead.findByIdAndDelete(id);
    return result !== null;
  }

  async findAllForExport(filters: Omit<LeadFilterDto, 'page' | 'limit'>): Promise<ILead[]> {
    const query: FilterQuery<ILead> = {};
    if (filters.status) query.status = filters.status;
    if (filters.source) query.source = filters.source;
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { email: { $regex: filters.search, $options: 'i' } },
      ];
    }
    return Lead.find(query).sort({ createdAt: -1 }).lean<ILead[]>();
  }
}
