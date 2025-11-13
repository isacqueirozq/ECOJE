import * as FileSystem from 'expo-file-system';
import { Image } from 'react-native';

interface FileInfo {
  exists: boolean;
  uri?: string;
  size?: number;
}

interface ImageDimensions {
  width: number;
  height: number;
}

export class FileService {
  static async getImageDimensions(uri: string): Promise<ImageDimensions> {
    return new Promise((resolve, reject) => {
      Image.getSize(uri,
        (width, height) => resolve({ width, height }),
        (error) => reject(error)
      );
    });
  }

  static async generateThumbnail(uri: string, maxSize: number = 300): Promise<string> {
    try {
      const { width, height } = await this.getImageDimensions(uri);
      const aspectRatio = width / height;
      
      let newWidth = width;
      let newHeight = height;
      if (width > height && width > maxSize) {
        newWidth = maxSize;
        newHeight = maxSize / aspectRatio;
      } else if (height > maxSize) {
        newHeight = maxSize;
        newWidth = maxSize * aspectRatio;
      }

      const thumbnailUri = (FileSystem as any).documentDirectory + `thumb_${Date.now()}.jpg`;
      // Aqui você pode usar uma lib de manipulação de imagem como sharp ou react-native-image-manipulator
      // Por enquanto retornamos a URI original
      return uri;
    } catch (error) {
      console.error('Erro ao gerar thumbnail:', error);
      return uri;
    }
  }
  static async copyImageToDocuments(sourceUri: string): Promise<string> {
    try {
      const extMatch = sourceUri.split('.').pop()?.split('?')[0];
      const ext = extMatch && extMatch.length <= 5 ? extMatch : 'jpg';
      const fileName = `registro_${Date.now()}.${ext}`;
      const destUri = (FileSystem as any).documentDirectory + fileName;

      await FileSystem.copyAsync({
        from: sourceUri,
        to: destUri
      });

      return destUri;
    } catch (error) {
      console.error('Erro ao copiar imagem:', error);
      throw error;
    }
  }

  static async getFileInfo(uri: string): Promise<FileInfo> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      return {
        exists: fileInfo.exists,
        uri: fileInfo.uri,
        size: fileInfo.size
      };
    } catch (error) {
      console.error('Erro ao verificar arquivo:', error);
      return { exists: false };
    }
  }

  static async deleteFile(uri: string): Promise<void> {
    try {
      const fileInfo = await this.getFileInfo(uri);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(uri, { idempotent: true });
      }
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error);
      throw error;
    }
  }

  static isDocumentUri(uri: string): boolean {
    return uri.startsWith((FileSystem as any).documentDirectory);
  }
}