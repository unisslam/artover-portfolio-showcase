
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Users, Code, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectDetailsDialog from '../components/ProjectDetailsDialog';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: "نظام إدارة الموارد المؤسسية (ERP)",
      description: "نظام شامل لإدارة جميع عمليات الشركة من المحاسبة والمخزون إلى إدارة الموارد البشرية والمبيعات.",
      technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
      status: "مكتمل",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
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
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=500&fit=crop",
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
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop",
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
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop",
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
    },
    {
      id: 5,
      title: "تطبيق إدارة المستشفيات",
      description: "نظام شامل لإدارة المستشفيات يشمل حجز المواعيد وإدارة المرضى والسجلات الطبية.",
      technologies: ["React Native", "Express.js", "PostgreSQL", "Socket.io"],
      status: "مكتمل",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=500&fit=crop",
      duration: "12 شهر",
      team: "8 مطورين",
      client: "مستشفى الشفاء العام",
      year: "2023",
      features: [
        "نظام حجز المواعيد",
        "إدارة السجلات الطبية",
        "متابعة المرضى",
        "إدارة الأطباء والممرضين",
        "نظام الفواتير الطبية",
        "تقارير إحصائية"
      ],
      challenges: "حساسية البيانات الطبية وضرورة الامتثال للمعايير الطبية.",
      solution: "تطبيق معايير HIPAA وتشفير متقدم للبيانات الحساسة.",
      demoUrl: null,
      githubUrl: null
    },
    {
      id: 6,
      title: "منصة التعلم الإلكتروني",
      description: "منصة تعليمية تفاعلية تدعم الفيديوهات والاختبارات وتتبع تقدم الطلاب.",
      technologies: ["Vue.js", "Django", "PostgreSQL", "Redis"],
      status: "قيد التطوير",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop",
      duration: "9 أشهر",
      team: "5 مطورين",
      client: "أكاديمية المستقبل",
      year: "2024",
      features: [
        "مشغل فيديو متقدم",
        "نظام الاختبارات التفاعلية",
        "تتبع تقدم الطلاب",
        "منتدى النقاش",
        "شهادات إنجاز",
        "لوحة تحكم المدرسين"
      ],
      challenges: "ضمان تجربة تعلم سلسة مع محتوى فيديو عالي الجودة.",
      solution: "استخدام CDN للمحتوى وتحسين خوارزميات التحميل التدريجي.",
      demoUrl: "https://learning-demo.example.com",
      githubUrl: null
    }
  ];

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
