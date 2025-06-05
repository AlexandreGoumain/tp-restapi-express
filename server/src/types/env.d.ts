export interface EnvConfig {
    PORT: number;
    NODE_ENV: 'development' | 'production' | 'test';
    ORIGIN: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
    S3_BUCKET: string;
}
