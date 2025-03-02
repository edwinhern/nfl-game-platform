import { CleanedEnvAccessors } from "envalid";

export interface Environment extends CleanedEnvAccessors {
	// Server Configuration
	NODE_ENV: "development" | "production" | "test";
	PORT: number;
	HOST: string;

	// Database Configuration
	DATABASE_URL: string;
	POSTGRES_DB: string;
	POSTGRES_USER: string;
	POSTGRES_PASSWORD: string;

	// Redis Configuration
	REDIS_URL: string;
	REDIS_HOST: string;
	REDIS_PORT: number;
	REDIS_PASSWORD: string;
	REDIS_DB: number;
	CACHE_TTL: number;

	// API Configuration
	TICKETMASTER_API_KEY: string;

	// Scheduler Configuration
	SYNC_SCHEDULE: string;
}
