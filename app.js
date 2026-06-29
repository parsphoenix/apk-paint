/**
 * cPanel Node.js Application Entry Point
 * 
 * This file serves as the main entry point for cPanel's Node.js Application Manager.
 * After running `npm run build`, cPanel will execute this file to start the server.
 * 
 * The production build output is located in .output/server/index.mjs
 * Nitro's node-server preset creates a standalone Node.js server.
 */

// Load environment variables from .env file (cPanel may inject these differently)
import { config } from "dotenv";
config();

// Import and start the production Nitro server
import "./.output/server/index.mjs";