"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lead_controller_1 = require("./lead.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const rbac_middleware_1 = require("../../middlewares/rbac.middleware");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const lead_schema_1 = require("./lead.schema");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', (0, validate_middleware_1.validate)(lead_schema_1.leadQuerySchema, 'query'), lead_controller_1.getLeads);
router.get('/export/csv', (0, rbac_middleware_1.authorize)('admin'), lead_controller_1.exportLeadsCsv);
router.get('/:id', lead_controller_1.getLeadById);
router.post('/', (0, rbac_middleware_1.authorize)('admin', 'sales'), (0, validate_middleware_1.validate)(lead_schema_1.createLeadSchema), lead_controller_1.createLead);
router.put('/:id', (0, rbac_middleware_1.authorize)('admin', 'sales'), (0, validate_middleware_1.validate)(lead_schema_1.updateLeadSchema), lead_controller_1.updateLead);
router.delete('/:id', (0, rbac_middleware_1.authorize)('admin'), lead_controller_1.deleteLead);
exports.default = router;
//# sourceMappingURL=lead.routes.js.map