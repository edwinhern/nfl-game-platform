import { Injectable } from "@nestjs/common";
import { url, cleanEnv, host, num, port, str } from "envalid";
import { Environment } from "../interfaces/environment.interface";

@Injectable()
export class ConfigurationService {
	private readonly environmentConfiguration: Environment;
	private readonly DEFAULT_ROOT_URL: string = "https://localhost:4200";

	public constructor() {
		this.environmentConfiguration = cleanEnv(process.env, {
			CACHE_TTL: num({ default: 3600 }),
			DATABASE_URL: url({ default: this.DEFAULT_ROOT_URL }),
			HOST: host({ default: "localhost" }),
			NODE_ENV: str({
				default: "test",
				choices: ["development", "test", "production"],
			}),
			PORT: port({ default: 8080 }),
			POSTGRES_DB: str({ default: "" }),
			POSTGRES_PASSWORD: str({ default: "" }),
			POSTGRES_USER: str({ default: "" }),
			REDIS_DB: num({ default: 0 }),
			REDIS_HOST: str({ default: "localhost" }),
			REDIS_PASSWORD: str({ default: "" }),
			REDIS_PORT: num({ default: 6379 }),
			REDIS_URL: url({ default: this.DEFAULT_ROOT_URL }),
			SYNC_SCHEDULE: str({ default: "0 */12 * * *" }),
			TICKETMASTER_API_KEY: str({ default: "" }),
		});
	}

	public get<K extends keyof Environment>(key: K): Environment[K] {
		return this.environmentConfiguration[key];
	}
}
