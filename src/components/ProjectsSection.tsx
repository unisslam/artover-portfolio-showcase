
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectDetailsDialog from './ProjectDetailsDialog';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: "نظام إدارة الموارد المؤسسية (ERP)",
      description: "نظام شامل لإدارة جميع عمليات الشركة من المحاسبة والمخزون إلى إدارة الموارد البشرية والمبيعات.",
      technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
      status: "مكتمل",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      duration: "8 أشهر",
      team: "5 مطورين",
      client: "شركة التقنيات المتقدمة",
      year: "2023",
      features: [
        "إدارة المخزون والمبيعات",
        "نظام المحاسبة المتكامل",
        "إدارة الموارد البشرية",
        "تقارير تحليلية متقدمة",
        "واجهة مستخدم متجاوبة",
        "نظام صلاحيات متدرج"
      ],
      challenges: "التحدي الأكبر كان تكامل جميع الأنظمة الفرعية وضمان سرعة الأداء مع كمية البيانات الكبيرة.",
      solution: "استخدمنا تقنية Microservices وقواعد بيانات محسّنة مع Redis للتخزين المؤقت.",
      demoUrl: "https://demo.example.com",
      githubUrl: "https://github.com/example/erp-system"
    },
    {
      id: 2,
      title: "تطبيق إدارة المشاريع",
      description: "منصة متكاملة لإدارة المشاريع وتتبع المهام مع لوحة تحكم تفاعلية وتقارير مفصلة.",
      technologies: ["Vue.js", "Laravel", "MySQL", "Redis"],
      status: "قيد التطوير",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=300&fit=crop",
      duration: "6 أشهر",
      team: "3 مطورين",
      client: "شركة الإدارة الذكية",
      year: "2024",
      features: [
        "إدارة المشاريع والمهام",
        "تتبع الوقت والإنتاجية",
        "التعاون الجماعي",
        "تقارير مرئية تفاعلية",
        "إشعارات فورية",
        "تكامل مع أدوات خارجية"
      ],
      challenges: "تحدي إدارة التعاون بين عدة فرق عمل وضمان التزامن في البيانات.",
      solution: "تم تطوير نظام إشعارات متقدم مع WebSocket للتحديثات الفورية.",
      demoUrl: "https://demo2.example.com",
      githubUrl: null
    },
    {
      id: 3,
      title: "نظام نقاط البيع الذكي",
      description: "حل متطور لنقاط البيع يدعم المدفوعات الرقمية وإدارة المخزون والتقارير الفورية.",
      technologies: ["Angular", "Spring Boot", "MongoDB", "Microservices"],
      status: "مكتمل",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
      duration: "4 أشهر",
      team: "4 مطورين",
      client: "سلسلة متاجر النور",
      year: "2023",
      features: [
        "واجهة بيع سريعة ومبسطة",
        "إدارة المخزون التلقائي",
        "تكامل بوابات الدفع",
        "تقارير مبيعات فورية",
        "نظام العملاء والولاء",
        "دعم عدة فروع"
      ],
      challenges: "ضرورة العمل في بيئة سريعة مع معاملات مالية حساسة.",
      solution: "تم تطبيق أمان متعدد الطبقات وآلية backup تلقائية.",
      demoUrl: "https://pos-demo.example.com",
      githubUrl: "https://github.com/example/pos-system"
    },
    {
      id: 4,
      title: "منصة التجارة الإلكترونية",
      description: "متجر إلكتروني متكامل مع نظام إدارة المحتوى ولوحة تحكم للبائعين وتكامل مع بوابات الدفع.",
      technologies: ["Next.js", "Strapi", "Stripe", "AWS"],
      status: "مكتمل",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
      duration: "10 أشهر",
      team: "6 مطورين",
      client: "مجموعة التجارة الرقمية",
      year: "2022",
      features: [
        "واجهة متجر متجاوبة",
        "نظام إدارة المنتجات",
        "عربة تسوق متقدمة",
        "تكامل مع بوابات الدفع",
        "نظام المراجعات والتقييمات",
        "لوحة تحكم البائعين"
      ],
      challenges: "التعامل مع حجم معاملات كبير وضمان أمان المدفوعات.",
      solution: "استخدام خدمات AWS السحابية مع تطبيق معايير PCI DSS للأمان.",
      demoUrl: "https://ecommerce-demo.example.com",
      githubUrl: "https://github.com/example/ecommerce-platform"
    }
  ];

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
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
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
