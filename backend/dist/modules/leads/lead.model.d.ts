import mongoose, { Document } from 'mongoose';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'lost';
export type LeadSource = 'website' | 'instagram' | 'referral';
export interface ILead extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    status: LeadStatus;
    source: LeadSource;
    notes?: string;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Lead: mongoose.Model<ILead, {}, {}, {}, mongoose.Document<unknown, {}, ILead, {}, {}> & ILead & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=lead.model.d.ts.map