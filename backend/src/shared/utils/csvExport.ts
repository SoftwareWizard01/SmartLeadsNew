import { format } from 'fast-csv';
import { Response } from 'express';
import { ILead } from '../../modules/leads/lead.model';

interface CsvRow {
  Name: string;
  Email: string;
  Status: string;
  Source: string;
  'Created At': string;
}

/**
 * Streams an array of leads as a CSV file download to the HTTP response.
 */
export const streamLeadsAsCsv = (res: Response, leads: ILead[]): void => {
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');

  const csvStream = format<CsvRow, CsvRow>({ headers: true });
  csvStream.pipe(res);

  leads.forEach((lead) => {
    csvStream.write({
      Name: lead.name,
      Email: lead.email,
      Status: lead.status,
      Source: lead.source,
      'Created At': new Date(lead.createdAt).toISOString(),
    });
  });

  csvStream.end();
};
