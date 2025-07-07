
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '@/contexts/ProjectContext';
import ProjectDetailsDialog from './ProjectDetailsDialog';

const ProjectsSection = () => {
  const { projects, loading } = useProjects();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Show only the first 3 projects in the main page
  const featuredProjects = projects.slice(0, 3);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-secondary/30 section-transition">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">جاري تحميل المشاريع...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  return (
    <section id="projects" className="py-20 bg-secondary/30 section-transition">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            <span className="gradient-text">المشاريع</span> المنجزة
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            مجموعة من المشاريع التقنية المتنوعة التي قمت بتطويرها وتنفيذها بنجاح
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <Card key={project.id} className="card-hover border-border overflow-hidden">
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={
                    project.status === 'مكتمل' 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  }>
                    {project.status}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="text-xs"
                    >
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
                  variant="outline" 
                  className="w-full border-accent text-accent hover:bg-accent hover:text-white"
                >
                  عرض التفاصيل
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            asChild
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link to="/projects">
              عرض جميع المشاريع
            </Link>
          </Button>
        </div>
      </div>

      {/* Project Details Dialog */}
      <ProjectDetailsDialog 
        project={selectedProject}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </section>
  );
};

export default ProjectsSection;
