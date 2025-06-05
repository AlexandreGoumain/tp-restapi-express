import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '../config/s3.config'; // Ajustez le chemin selon votre structure
import { env } from '../config/env';

export interface UploadOptions {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
}

/**
 * Upload un fichier sur S3 et retourne l'URL publique
 */
export async function uploadToS3(options: UploadOptions): Promise<string> {
  const { buffer, fileName, mimeType } = options;
  
  // Générer un nom unique
  const uniqueFileName = `${Date.now()}_${fileName}`;
  
  // Configuration de l'upload
  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET!,
    Key: uniqueFileName,
    Body: buffer,
    ContentType: mimeType
  });
  
  // Upload vers S3
  await s3.send(command);
  
  // Retourner l'URL publique
  return `https://${env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;
}