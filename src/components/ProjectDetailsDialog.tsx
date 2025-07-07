
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
  Target
} from 'lucide-react';

interface ProjectDetailsDialogProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailsDialog = ({ project, isOpen, onClose }: ProjectDetailsDialogProps) => {
  if (!project) return null;

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
            <img 
              src={project.images && project.images.length > 0 ? project.images[0] : project.image} 
              alt={project.title}
              className="w-full h-64 object-cover"
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
            {project.images && project.images.length > 1 && (
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {project.images.length} صور
              </div>
            )}
          </div>

          {/* معرض الصور الإضافية */}
          {project.images && project.images.length > 1 && (
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">صور إضافية</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {project.images.slice(1).map((imageUrl: string, index: number) => (
                  <div key={index} className="relative rounded-lg overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt={`${project.title} - صورة ${index + 2}`}
                      className="w-full h-32 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    />
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
    </Dialog>
  );
};

export default ProjectDetailsDialog;
