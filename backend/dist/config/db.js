"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const MAX_RETRIES = 5;
const RETRY_INTERVAL_MS = 5000;
const connectDB = async () => {
    let attempts = 0;
    while (attempts < MAX_RETRIES) {
        try {
            await mongoose_1.default.connect(env_1.env.MONGO_URI, {
                serverSelectionTimeoutMS: 5000,
            });
            console.log(`✅ MongoDB connected: ${mongoose_1.default.connection.host}`);
            return;
        }
        catch (error) {
            attempts++;
            console.error(`❌ MongoDB connection attempt ${attempts}/${MAX_RETRIES} failed.`, error instanceof Error ? error.message : error);
            if (attempts < MAX_RETRIES) {
                console.log(`⏳ Retrying in ${RETRY_INTERVAL_MS / 1000}s...`);
                await new Promise((res) => setTimeout(res, RETRY_INTERVAL_MS));
            }
            else {
                console.error('💥 All MongoDB connection attempts exhausted. Exiting.');
                process.exit(1);
            }
        }
    }
};
exports.connectDB = connectDB;
mongoose_1.default.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected.');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('MongoDB error:', err);
});
//# sourceMappingURL=db.js.map