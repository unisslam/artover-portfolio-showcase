import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Users, 
  ExternalLink, 
  Github,
  Settings,
  BarChart3
} from 'lucide-react';
import { useProjects } from '@/contexts/ProjectContext';
import ProjectFormDialog from '@/components/ProjectFormDialog';
import ProjectDetailsDialog from '@/components/ProjectDetailsDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

const ProjectsAdmin = () => {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

  // Filter projects based on search and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddProject = () => {
    setSelectedProject(null);
    setFormMode('add');
    setIsFormDialogOpen(true);
  };

  const handleEditProject = (project: any) => {
    setSelectedProject(project);
    setFormMode('edit');
    setIsFormDialogOpen(true);
  };

  const handleDeleteProject = (id: number) => {
    deleteProject(id);
    toast({
      title: "تم حذف المشروع",
      description: "تم حذف المشروع بنجاح",
    });
  };

  const handleViewProject = (project: any) => {
    setSelectedProject(project);
    setIsDetailsDialogOpen(true);
  };

  const handleFormSubmit = (projectData: any) => {
    if (formMode === 'add') {
      addProject(projectData);
      toast({
        title: "تم إضافة المشروع",
        description: "تم إضافة المشروع الجديد بنجاح",
      });
    } else {
      updateProject(selectedProject.id, projectData);
      toast({
        title: "تم تحديث المشروع",
        description: "تم تحديث بيانات المشروع بنجاح",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'قيد التطوير':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'متوقف':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'ملغي':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    }
  };

  const completedProjects = projects.filter(p => p.status === 'مكتمل');
  const inProgressProjects = projects.filter(p => p.status === 'قيد التطوير');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold gradient-text">لوحة إدارة المشاريع</h1>
                <p className="text-muted-foreground">إدارة وتحرير جميع المشاريع</p>
              </div>
            </div>
            <Button onClick={handleAddProject} className="bg-accent hover:bg-accent/90">
              <Plus className="w-4 h-4 ml-2" />
              إضافة مشروع جديد
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <BarChart3 className="w-8 h-8 text-blue-600 ml-4" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{projects.length}</p>
                <p className="text-muted-foreground">إجمالي المشاريع</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center ml-4">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{completedProjects.length}</p>
                <p className="text-muted-foreground">مشاريع مكتملة</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center ml-4">
                <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{inProgressProjects.length}</p>
                <p className="text-muted-foreground">قيد التطوير</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Calendar className="w-8 h-8 text-purple-600 ml-4" />
              <div>
                <p className="text-2xl font-bold text-purple-600">{new Date().getFullYear()}</p>
                <p className="text-muted-foreground">العام الحالي</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="البحث في المشاريع..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                  size="sm"
                >
                  الكل ({projects.length})
                </Button>
                <Button
                  variant={statusFilter === 'مكتمل' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('مكتمل')}
                  size="sm"
                >
                  مكتمل ({completedProjects.length})
                </Button>
                <Button
                  variant={statusFilter === 'قيد التطوير' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('قيد التطوير')}
                  size="sm"
                >
                  قيد التطوير ({inProgressProjects.length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Project Image */}
                  <div className="lg:w-1/3">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 lg:h-full object-cover"
                    />
                  </div>
                  
                  {/* Project Info */}
                  <div className="lg:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{project.year}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{project.team}</span>
                      </div>
                      <div className="text-muted-foreground">
                        <span className="font-medium">العميل:</span> {project.client}
                      </div>
                      <div className="text-muted-foreground">
                        <span className="font-medium">المدة:</span> {project.duration}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 mb-4">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          عرض توضيحي
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleViewProject(project)}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 ml-1" />
                        عرض
                      </Button>
                      <Button
                        onClick={() => handleEditProject(project)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="w-4 h-4 ml-1" />
                        تعديل
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4 ml-1" />
                            حذف
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                            <AlertDialogDescription>
                              هل أنت متأكد من حذف مشروع "{project.title}"؟ هذا الإجراء لا يمكن التراجع عنه.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteProject(project.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              حذف
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">لا توجد مشاريع تطابق البحث</p>
                <p className="text-sm">جرب تغيير معايير البحث أو إضافة مشروع جديد</p>
              </div>
              <Button onClick={handleAddProject} className="bg-accent hover:bg-accent/90">
                <Plus className="w-4 h-4 ml-2" />
                إضافة مشروع جديد
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialogs */}
      <ProjectFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
        onSubmit={handleFormSubmit}
        project={selectedProject}
        mode={formMode}
      />

      <ProjectDetailsDialog
        project={selectedProject}
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
      />
    </div>
  );
};

export default ProjectsAdmin;
