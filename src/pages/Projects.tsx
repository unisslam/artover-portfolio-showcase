
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Users, Code, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects } from '@/contexts/ProjectContext';
import ProjectDetailsDialog from '../components/ProjectDetailsDialog';

const Projects = () => {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const completedProjects = projects.filter(p => p.status === 'مكتمل');
  const inProgressProjects = projects.filter(p => p.status === 'قيد التطوير');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
              <ArrowRight className="w-5 h-5 rotate-180" />
              <span>العودة للرئيسية</span>
            </Link>
            <h1 className="text-2xl font-bold gradient-text">جميع المشاريع</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-accent mb-2">{projects.length}</div>
            <div className="text-muted-foreground">إجمالي المشاريع</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">{completedProjects.length}</div>
            <div className="text-muted-foreground">مشاريع مكتملة</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{inProgressProjects.length}</div>
            <div className="text-muted-foreground">قيد التطوير</div>
          </Card>
        </div>

        {/* Completed Projects */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            المشاريع <span className="gradient-text">المكتملة</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedProjects.map((project) => (
              <Card key={project.id} className="card-hover border-border overflow-hidden">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
                    <Calendar className="w-4 h-4 inline ml-1" />
                    {project.year}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {project.team}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.duration}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => handleViewDetails(project)}
                    className="w-full bg-accent hover:bg-accent/90"
                  >
                    عرض التفاصيل
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* In Progress Projects */}
        {inProgressProjects.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              المشاريع <span className="gradient-text">قيد التطوير</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {inProgressProjects.map((project) => (
                <Card key={project.id} className="card-hover border-border overflow-hidden">
                  <div className="relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
                      <Calendar className="w-4 h-4 inline ml-1" />
                      {project.year}
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {project.team}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.duration}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <Button 
                      onClick={() => handleViewDetails(project)}
                      className="w-full bg-accent hover:bg-accent/90"
                    >
                      عرض التفاصيل
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Project Details Dialog */}
      <ProjectDetailsDialog 
        project={selectedProject}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default Projects;
