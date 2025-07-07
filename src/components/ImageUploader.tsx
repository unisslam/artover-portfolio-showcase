import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { uploadImage, validateImageFile, resizeImage, deleteImage } from '@/lib/storage'

interface ImageUploaderProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  className?: string
}

interface UploadingFile {
  file: File
  progress: number
  url?: string
  error?: string
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  images = [],
  onImagesChange,
  maxImages = 5,
  className = ''
}) => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null)
    
    // التحقق من عدد الصور
    if (images.length + acceptedFiles.length > maxImages) {
      setError(`يمكن رفع ${maxImages} صور كحد أقصى`)
      return
    }

    // التحقق من صحة الملفات
    const validFiles: File[] = []
    for (const file of acceptedFiles) {
      const validation = validateImageFile(file)
      if (!validation.isValid) {
        setError(validation.message || 'ملف غير صالح')
        return
      }
      validFiles.push(file)
    }

    // إعداد ملفات الرفع
    const newUploadingFiles = validFiles.map(file => ({
      file,
      progress: 0
    }))

    setUploadingFiles(prev => [...prev, ...newUploadingFiles])

    // رفع الملفات واحداً تلو الآخر
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i]
      const index = uploadingFiles.length + i
      
      try {
        // تحسين الصورة
        const resizedFile = await resizeImage(file)
        
        // محاكاة تقدم الرفع
        setUploadingFiles(prev => 
          prev.map((item, idx) => 
            idx === index ? { ...item, progress: 50 } : item
          )
        )

        // رفع الصورة
        const url = await uploadImage(resizedFile)
        
        setUploadingFiles(prev => 
          prev.map((item, idx) => 
            idx === index ? { ...item, progress: 100, url } : item
          )
        )

        // إضافة URL للصور
        onImagesChange([...images, url])

      } catch (err) {
        setUploadingFiles(prev => 
          prev.map((item, idx) => 
            idx === index ? { ...item, error: 'فشل في رفع الصورة' } : item
          )
        )
      }
    }

    // مسح ملفات الرفع بعد انتهاء العملية
    setTimeout(() => {
      setUploadingFiles([])
    }, 2000)

  }, [images, maxImages, onImagesChange, uploadingFiles.length])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    maxFiles: maxImages - images.length,
    disabled: images.length >= maxImages
  })

  const removeImage = async (index: number) => {
    const imageUrl = images[index]
    
    try {
      // حذف الصورة من التخزين
      await deleteImage(imageUrl)
      
      // إزالة الصورة من القائمة
      const newImages = images.filter((_, i) => i !== index)
      onImagesChange(newImages)
    } catch (err) {
      console.error('Error removing image:', err)
      setError('فشل في حذف الصورة')
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* منطقة رفع الصور */}
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive 
              ? 'border-primary bg-primary/10' 
              : 'border-border hover:border-primary/50'
            }
          `}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">
            {isDragActive ? 'أفلت الصور هنا' : 'اسحب الصور هنا أو انقر للتحديد'}
          </p>
          <p className="text-sm text-muted-foreground">
            PNG، JPG، WebP، GIF حتى 50 ميجابايت ({images.length}/{maxImages})
          </p>
        </div>
      )}

      {/* رسائل الخطأ */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* ملفات قيد الرفع */}
      {uploadingFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">جاري الرفع...</h4>
          {uploadingFiles.map((uploadingFile, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{uploadingFile.file.name}</p>
                    <Progress value={uploadingFile.progress} className="mt-2" />
                  </div>
                  {uploadingFile.error && (
                    <p className="text-sm text-red-500">{uploadingFile.error}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* الصور المرفوعة */}
      {images.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">الصور المرفوعة ({images.length})</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((imageUrl, index) => (
              <Card key={index} className="relative group overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <img
                      src={imageUrl}
                      alt={`صورة ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeImage(index)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {index === 0 && (
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        رئيسية
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* معلومات إضافية */}
      <div className="text-xs text-muted-foreground">
        <p>• الصورة الأولى ستكون الصورة الرئيسية للمشروع</p>
        <p>• يمكن رفع حتى {maxImages} صور لكل مشروع</p>
        <p>• سيتم تحسين الصور تلقائياً لتوفير مساحة التخزين</p>
      </div>
    </div>
  )
}

export default ImageUploader
