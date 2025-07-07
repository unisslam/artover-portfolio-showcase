import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

export interface UploadProgress {
  progress: number;
  fileName: string;
}

export const uploadImageToSupabase = async (
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<string> => {
  try {
    // إنشاء اسم فريد للملف
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    // محاكاة تقدم الرفع
    if (onProgress) {
      onProgress({ progress: 0, fileName: file.name });
    }

    // رفع الملف إلى Supabase Storage
    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading file:', error);
      throw new Error(`فشل في رفع الصورة: ${error.message}`);
    }

    // محاكاة تقدم الرفع
    if (onProgress) {
      onProgress({ progress: 100, fileName: file.name });
    }

    // الحصول على الرابط العام للصورة
    const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error in uploadImageToSupabase:', error);
    throw error;
  }
};

export const deleteImageFromSupabase = async (imageUrl: string): Promise<void> => {
  try {
    // استخراج مسار الملف من الرابط
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/');
    const filePath = pathParts.slice(-2).join('/'); // projects/filename.ext

    const { error } = await supabase.storage
      .from('project-images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting file:', error);
      throw new Error(`فشل في حذف الصورة: ${error.message}`);
    }
  } catch (error) {
    console.error('Error in deleteImageFromSupabase:', error);
    throw error;
  }
};

export const uploadMultipleImages = async (
  files: File[],
  onProgress?: (fileName: string, progress: number, completed: number, total: number) => void
): Promise<string[]> => {
  const uploadedUrls: string[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    try {
      const url = await uploadImageToSupabase(file, (progress) => {
        if (onProgress) {
          onProgress(file.name, progress.progress, i, files.length);
        }
      });
      
      uploadedUrls.push(url);
      
      if (onProgress) {
        onProgress(file.name, 100, i + 1, files.length);
      }
    } catch (error) {
      console.error(`فشل في رفع ${file.name}:`, error);
      throw error;
    }
  }
  
  return uploadedUrls;
};

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  // التحقق من نوع الملف
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'نوع الملف غير مدعوم. الأنواع المدعومة: JPEG, PNG, WebP, GIF'
    };
  }

  // التحقق من حجم الملف (5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت'
    };
  }

  return { valid: true };
};
