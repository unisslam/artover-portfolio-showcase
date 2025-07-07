import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Project {
  id: number;
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
  demoUrl?: string;
  githubUrl?: string;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: number, project: Omit<Project, 'id'>) => void;
  deleteProject: (id: number) => void;
  getProject: (id: number) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const initialProjects: Project[] = [
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

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const addProject = (newProject: Omit<Project, 'id'>) => {
    const id = Math.max(...projects.map(p => p.id), 0) + 1;
    setProjects(prev => [...prev, { ...newProject, id }]);
  };

  const updateProject = (id: number, updatedProject: Omit<Project, 'id'>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...updatedProject, id } : project
    ));
  };

  const deleteProject = (id: number) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const getProject = (id: number) => {
    return projects.find(project => project.id === id);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      addProject,
      updateProject,
      deleteProject,
      getProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
