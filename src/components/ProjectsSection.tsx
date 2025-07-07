
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProjectsSection = () => {
  const projects = [
    {
      title: "نظام إدارة الموارد المؤسسية (ERP)",
      description: "نظام شامل لإدارة جميع عمليات الشركة من المحاسبة والمخزون إلى إدارة الموارد البشرية والمبيعات.",
      technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
      status: "مكتمل",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop"
    },
    {
      title: "تطبيق إدارة المشاريع",
      description: "منصة متكاملة لإدارة المشاريع وتتبع المهام مع لوحة تحكم تفاعلية وتقارير مفصلة.",
      technologies: ["Vue.js", "Laravel", "MySQL", "Redis"],
      status: "قيد التطوير",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=300&fit=crop"
    },
    {
      title: "نظام نقاط البيع الذكي",
      description: "حل متطور لنقاط البيع يدعم المدفوعات الرقمية وإدارة المخزون والتقارير الفورية.",
      technologies: ["Angular", "Spring Boot", "MongoDB", "Microservices"],
      status: "مكتمل",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop"
    },
    {
      title: "منصة التجارة الإلكترونية",
      description: "متجر إلكتروني متكامل مع نظام إدارة المحتوى ولوحة تحكم للبائعين وتكامل مع بوابات الدفع.",
      technologies: ["Next.js", "Strapi", "Stripe", "AWS"],
      status: "مكتمل",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop"
    }
  ];

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

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="card-hover border-border overflow-hidden">
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'مكتمل' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
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
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Button 
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
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            عرض جميع المشاريع
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
