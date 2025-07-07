
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Users, 
  Code, 
  ExternalLink, 
  Github, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  Target,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProjectDetailsDialogProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailsDialog = ({ project, isOpen, onClose }: ProjectDetailsDialogProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  // التنقل بلوحة المفاتيح - يجب أن يكون دائماً في نفس المكان
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isImageDialogOpen) return;
      
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => {
          const allImages = project?.images && project.images.length > 0 ? project.images : [project?.image];
          return (prev + 1) % allImages.length;
        });
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => {
          const allImages = project?.images && project.images.length > 0 ? project.images : [project?.image];
          return (prev - 1 + allImages.length) % allImages.length;
        });
      } else if (e.key === 'Escape') {
        setIsImageDialogOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isImageDialogOpen, project?.images, project?.image]);

  if (!project) return null;

  // الحصول على جميع الصور
  const allImages = project.images && project.images.length > 0 ? project.images : [project.image];

  const openImageDialog = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageDialogOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const closeImageDialog = () => {
    setIsImageDialogOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary mb-4">
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Image */}
          <div className="relative rounded-lg overflow-hidden">
            <div className="aspect-square w-full relative cursor-pointer" onClick={() => openImageDialog(0)}>
              <img 
                src={allImages[0]} 
                alt={project.title}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
              <div className="absolute top-4 right-4">
                <Badge className={
                  project.status === 'مكتمل' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }>
                  {project.status}
                </Badge>
              </div>
              {/* عداد الصور إذا كان هناك أكثر من صورة */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {allImages.length} صور
                </div>
              )}
              {/* أيقونة للدلالة على إمكانية النقر */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="opacity-0 hover:opacity-100 transition-opacity bg-black/50 rounded-full p-2">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* معرض الصور الإضافية */}
          {allImages.length > 1 && (
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">صور إضافية</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allImages.slice(1).map((imageUrl: string, index: number) => (
                  <div key={index} className="relative rounded-lg overflow-hidden cursor-pointer" onClick={() => openImageDialog(index + 1)}>
                    <div className="aspect-square w-full">
                      <img 
                        src={imageUrl} 
                        alt={`${project.title} - صورة ${index + 2}`}
                        className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="opacity-0 hover:opacity-100 transition-opacity bg-black/50 rounded-full p-1">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="mt-6" />
            </div>
          )}

          {/* Project Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-secondary/30 p-4 rounded-lg text-center">
              <Calendar className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="font-semibold text-primary">السنة</div>
              <div className="text-muted-foreground">{project.year}</div>
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg text-center">
              <Users className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="font-semibold text-primary">الفريق</div>
              <div className="text-muted-foreground">{project.team}</div>
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg text-center">
              <Code className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="font-semibold text-primary">المدة</div>
              <div className="text-muted-foreground">{project.duration}</div>
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg text-center">
              <Target className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="font-semibold text-primary">العميل</div>
              <div className="text-muted-foreground text-sm">{project.client}</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-accent" />
              وصف المشروع
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          <Separator />

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
              <Code className="w-5 h-5 text-accent" />
              التقنيات المستخدمة
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech: string, index: number) => (
                <Badge key={index} variant="outline" className="px-3 py-1 text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent" />
              المميزات الرئيسية
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Challenges & Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                التحديات
              </h3>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                الحلول
              </h3>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {(project.demo_url || project.github_url) && (
            <>
              <Separator />
              <div className="flex flex-wrap gap-4 justify-center">
                {project.demo_url && (
                  <Button 
                    asChild
                    className="bg-accent hover:bg-accent/90"
                  >
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 ml-2" />
                      معاينة المشروع
                    </a>
                  </Button>
                )}
                {project.github_url && (
                  <Button 
                    asChild
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 ml-2" />
                      الكود المصدري
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>

      {/* Image Viewer Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={closeImageDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black/95">
          <div className="relative">
            {/* زر الإغلاق */}
            <Button
              variant="ghost"
              size="sm"
              onClick={closeImageDialog}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white border-0"
            >
              <X className="w-4 h-4" />
            </Button>

            {/* عداد الصور */}
            <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded text-sm">
              {currentImageIndex + 1} / {allImages.length}
            </div>

            {/* الصورة الحالية */}
            <div className="flex items-center justify-center min-h-[60vh] max-h-[80vh]">
              <img 
                src={allImages[currentImageIndex]} 
                alt={`${project.title} - صورة ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* أزرار التنقل */}
            {allImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* المصغرات في الأسفل */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex gap-2 bg-black/50 p-2 rounded">
                  {allImages.map((imageUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-white scale-110' 
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={imageUrl} 
                        alt={`صورة ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default ProjectDetailsDialog;
