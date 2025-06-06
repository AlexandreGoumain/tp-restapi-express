import { S3 } from '@aws-sdk/client-s3';
import logger from '../utils/logger';
import { env } from './env';

if (!env.AWS_REGION || !env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY) {
    logger.warn(
        'Configuration S3 incomplète - certaines fonctionnalités peuvent ne pas fonctionner'
    );
}

export const s3 = new S3({
    region: env.AWS_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
});

export const testS3Connection = async (): Promise<boolean> => {
    try {
        await s3.listBuckets();
        logger.info('Connexion S3 établie avec succès');
        return true;
    } catch (error: any) {
        logger.error(`Erreur de connexion S3: ${error.message}`);
        return false;
    }
};
