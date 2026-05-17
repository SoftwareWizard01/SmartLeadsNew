"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const app_1 = __importDefault(require("./app"));
const bootstrap = async () => {
    await (0, db_1.connectDB)();
    const server = app_1.default.listen(env_1.env.PORT, () => {
        console.log(`🚀 Server running on http://localhost:${env_1.env.PORT} [${env_1.env.NODE_ENV}]`);
    });
    const shutdown = (signal) => {
        console.log(`\n⚡ ${signal} received. Shutting down gracefully...`);
        server.close(() => {
            console.log('✅ HTTP server closed.');
            process.exit(0);
        });
    };
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('unhandledRejection', (reason) => {
        console.error('💥 Unhandled Rejection:', reason);
        server.close(() => process.exit(1));
    });
};
bootstrap();
//# sourceMappingURL=server.js.map