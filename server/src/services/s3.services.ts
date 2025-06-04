import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '../config/s3.config'; // Ajustez le chemin selon votre structure

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
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: uniqueFileName,
    Body: buffer,
    ContentType: mimeType,
    ACL: 'public-read'
  });
  
  // Upload vers S3
  await s3.send(command);
  
  // Retourner l'URL publique
  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;
}