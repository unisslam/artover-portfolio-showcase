import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { X, Plus, Upload } from 'lucide-react';
import { Project } from '@/contexts/ProjectContext';

interface ProjectFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: Omit<Project, 'id'>) => void;
  project?: Project | null;
  mode: 'add' | 'edit';
}

interface ProjectFormData {
  title: string;
  description: string;
  technologies: string[];
  status: string;
  image: string;
  duration: string;
  team: string;
  client: string;
  year: string;
  features: string[];
  challenges: string;
  solution: string;
  demoUrl: string;
  githubUrl: string;
}

const ProjectFormDialog = ({ isOpen, onClose, onSubmit, project, mode }: ProjectFormDialogProps) => {
  const [newTechnology, setNewTechnology] = useState('');
  const [newFeature, setNewFeature] = useState('');

  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProjectFormData>({
    defaultValues: {
      title: '',
      description: '',
      technologies: [],
      status: 'قيد التطوير',
      image: '',
      duration: '',
      team: '',
      client: '',
      year: new Date().getFullYear().toString(),
      features: [],
      challenges: '',
      solution: '',
      demoUrl: '',
      githubUrl: ''
    }
  });

  const technologies = watch('technologies');
  const features = watch('features');

  useEffect(() => {
    if (project && mode === 'edit') {
      reset({
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        status: project.status,
        image: project.image,
        duration: project.duration,
        team: project.team,
        client: project.client,
        year: project.year,
        features: project.features,
        challenges: project.challenges,
        solution: project.solution,
        demoUrl: project.demoUrl || '',
        githubUrl: project.githubUrl || ''
      });
    } else if (mode === 'add') {
      reset({
        title: '',
        description: '',
        technologies: [],
        status: 'قيد التطوير',
        image: '',
        duration: '',
        team: '',
        client: '',
        year: new Date().getFullYear().toString(),
        features: [],
        challenges: '',
        solution: '',
        demoUrl: '',
        githubUrl: ''
      });
    }
  }, [project, mode, reset]);

  const addTechnology = () => {
    if (newTechnology.trim() && !technologies.includes(newTechnology.trim())) {
      setValue('technologies', [...technologies, newTechnology.trim()]);
      setNewTechnology('');
    }
  };

  const removeTechnology = (tech: string) => {
    setValue('technologies', technologies.filter(t => t !== tech));
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setValue('features', [...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setValue('features', features.filter(f => f !== feature));
  };

  const onFormSubmit = (data: ProjectFormData) => {
    onSubmit({
      ...data,
      demoUrl: data.demoUrl || undefined,
      githubUrl: data.githubUrl || undefined
    });
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {mode === 'add' ? 'إضافة مشروع جديد' : 'تعديل المشروع'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-primary">المعلومات الأساسية</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">عنوان المشروع *</Label>
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: 'عنوان المشروع مطلوب' }}
                    render={({ field }) => (
                      <Input {...field} id="title" placeholder="أدخل عنوان المشروع" />
                    )}
                  />
                  {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                </div>

                <div>
                  <Label htmlFor="status">حالة المشروع *</Label>
                  <Controller
                    name="status"
                    control={control}
                    rules={{ required: 'حالة المشروع مطلوبة' }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر حالة المشروع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="مكتمل">مكتمل</SelectItem>
                          <SelectItem value="قيد التطوير">قيد التطوير</SelectItem>
                          <SelectItem value="متوقف">متوقف</SelectItem>
                          <SelectItem value="ملغي">ملغي</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
                </div>
              </div>

              <div>
                <Label htmlFor="description">وصف المشروع *</Label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: 'وصف المشروع مطلوب' }}
                  render={({ field }) => (
                    <Textarea {...field} id="description" placeholder="أدخل وصفاً مفصلاً للمشروع" rows={3} />
                  )}
                />
                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
              </div>

              <div>
                <Label htmlFor="image">رابط الصورة *</Label>
                <Controller
                  name="image"
                  control={control}
                  rules={{ required: 'رابط الصورة مطلوب' }}
                  render={({ field }) => (
                    <Input {...field} id="image" placeholder="https://example.com/image.jpg" />
                  )}
                />
                {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-primary">تفاصيل المشروع</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="duration">مدة المشروع *</Label>
                  <Controller
                    name="duration"
                    control={control}
                    rules={{ required: 'مدة المشروع مطلوبة' }}
                    render={({ field }) => (
                      <Input {...field} id="duration" placeholder="مثال: 6 أشهر" />
                    )}
                  />
                  {errors.duration && <span className="text-red-500 text-sm">{errors.duration.message}</span>}
                </div>

                <div>
                  <Label htmlFor="team">حجم الفريق *</Label>
                  <Controller
                    name="team"
                    control={control}
                    rules={{ required: 'حجم الفريق مطلوب' }}
                    render={({ field }) => (
                      <Input {...field} id="team" placeholder="مثال: 5 مطورين" />
                    )}
                  />
                  {errors.team && <span className="text-red-500 text-sm">{errors.team.message}</span>}
                </div>

                <div>
                  <Label htmlFor="client">العميل *</Label>
                  <Controller
                    name="client"
                    control={control}
                    rules={{ required: 'اسم العميل مطلوب' }}
                    render={({ field }) => (
                      <Input {...field} id="client" placeholder="اسم العميل أو الشركة" />
                    )}
                  />
                  {errors.client && <span className="text-red-500 text-sm">{errors.client.message}</span>}
                </div>

                <div>
                  <Label htmlFor="year">سنة التنفيذ *</Label>
                  <Controller
                    name="year"
                    control={control}
                    rules={{ required: 'سنة التنفيذ مطلوبة' }}
                    render={({ field }) => (
                      <Input {...field} id="year" placeholder="2024" />
                    )}
                  />
                  {errors.year && <span className="text-red-500 text-sm">{errors.year.message}</span>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="demoUrl">رابط العرض التوضيحي</Label>
                  <Controller
                    name="demoUrl"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="demoUrl" placeholder="https://demo.example.com" />
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="githubUrl">رابط GitHub</Label>
                  <Controller
                    name="githubUrl"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="githubUrl" placeholder="https://github.com/username/repo" />
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-primary">التقنيات المستخدمة</h3>
              
              <div className="flex gap-2">
                <Input
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  placeholder="أضف تقنية جديدة"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                />
                <Button type="button" onClick={addTechnology} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="ml-2 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-primary">المميزات الرئيسية</h3>
              
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="أضف ميزة جديدة"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <Button type="button" onClick={addFeature} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between bg-secondary/30 p-2 rounded">
                    <span>{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(feature)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Challenges and Solutions */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-primary">التحديات والحلول</h3>
              
              <div>
                <Label htmlFor="challenges">التحديات *</Label>
                <Controller
                  name="challenges"
                  control={control}
                  rules={{ required: 'وصف التحديات مطلوب' }}
                  render={({ field }) => (
                    <Textarea {...field} id="challenges" placeholder="اذكر التحديات التي واجهتها في المشروع" rows={3} />
                  )}
                />
                {errors.challenges && <span className="text-red-500 text-sm">{errors.challenges.message}</span>}
              </div>

              <div>
                <Label htmlFor="solution">الحلول *</Label>
                <Controller
                  name="solution"
                  control={control}
                  rules={{ required: 'وصف الحلول مطلوب' }}
                  render={({ field }) => (
                    <Textarea {...field} id="solution" placeholder="اشرح كيف تم التعامل مع التحديات" rows={3} />
                  )}
                />
                {errors.solution && <span className="text-red-500 text-sm">{errors.solution.message}</span>}
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              إلغاء
            </Button>
            <Button type="submit" className="bg-accent hover:bg-accent/90">
              {mode === 'add' ? 'إضافة المشروع' : 'حفظ التغييرات'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
