"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamLeadsAsCsv = void 0;
const fast_csv_1 = require("fast-csv");
const streamLeadsAsCsv = (res, leads) => {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');
    const csvStream = (0, fast_csv_1.format)({ headers: true });
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
exports.streamLeadsAsCsv = streamLeadsAsCsv;
//# sourceMappingURL=csvExport.js.map