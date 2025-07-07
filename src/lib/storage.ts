import { supabase } from './supabase'

/**
 * رفع صورة إلى Supabase Storage
 */
export async function uploadImage(file: File, projectId?: string): Promise<string> {
  try {
    // إنشاء اسم فريد للملف
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const fileName = `${projectId ? `project-${projectId}` : 'temp'}-${timestamp}-${randomString}.${fileExtension}`

    // رفع الملف
    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      throw error
    }

    // الحصول على URL العام
    const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(data.path)

    return urlData.publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error('فشل في رفع الصورة')
  }
}

/**
 * حذف صورة من Supabase Storage
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    // استخراج اسم الملف من URL
    const url = new URL(imageUrl)
    const pathParts = url.pathname.split('/')
    const fileName = pathParts[pathParts.length - 1]

    const { error } = await supabase.storage
      .from('project-images')
      .remove([fileName])

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error deleting image:', error)
    throw new Error('فشل في حذف الصورة')
  }
}

/**
 * رفع صور متعددة
 */
export async function uploadMultipleImages(files: File[], projectId?: string): Promise<string[]> {
  const uploadPromises = files.map(file => uploadImage(file, projectId))
  return Promise.all(uploadPromises)
}

/**
 * التحقق من نوع الملف
 */
export function validateImageFile(file: File): { isValid: boolean; message?: string } {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  const maxSize = 50 * 1024 * 1024 // 50MB

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      message: 'نوع الملف غير مدعوم. يُسمح فقط بـ JPEG، PNG، WebP، GIF'
    }
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      message: 'حجم الملف كبير جداً. الحد الأقصى 50 ميجابايت'
    }
  }

  return { isValid: true }
}

/**
 * تحسين حجم الصورة قبل الرفع
 */
export function resizeImage(file: File, maxWidth = 1920, maxHeight = 1080, quality = 0.8): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const img = new Image()

    img.onload = () => {
      // حساب الأبعاد الجديدة
      let { width, height } = img
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }

      canvas.width = width
      canvas.height = height

      // رسم الصورة المحسنة
      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            })
            resolve(resizedFile)
          } else {
            resolve(file)
          }
        },
        file.type,
        quality
      )
    }

    img.src = URL.createObjectURL(file)
  })
}
