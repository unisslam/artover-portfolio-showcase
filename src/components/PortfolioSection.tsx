
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('الكل');

  const categories = ['الكل', 'واجهات المستخدم', 'تصميم المواقع', 'تصميمات AI', 'الشعارات'];

  const portfolioItems = [
    {
      id: 1,
      title: "واجهة نظام إدارة المشاريع",
      category: "واجهات المستخدم",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=400&fit=crop",
      description: "تصميم واجهة حديثة وسهلة الاستخدام لنظام إدارة المشاريع"
    },
    {
      id: 2,
      title: "موقع شركة تقنية",
      category: "تصميم المواقع",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop",
      description: "موقع احترافي لشركة تقنية ناشئة مع تصميم متجاوب"
    },
    {
      id: 3,
      title: "تصميم بالذكاء الاصطناعي",
      category: "تصميمات AI",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=400&fit=crop",
      description: "مجموعة من التصميمات المبتكرة باستخدام أدوات الذكاء الاصطناعي"
    },
    {
      id: 4,
      title: "تطبيق موبايل للتجارة",
      category: "واجهات المستخدم",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=400&fit=crop",
      description: "تصميم واجهة تطبيق جوال للتجارة الإلكترونية"
    },
    {
      id: 5,
      title: "هوية بصرية متكاملة",
      category: "الشعارات",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=400&fit=crop",
      description: "تصميم هوية بصرية شاملة لعلامة تجارية جديدة"
    },
    {
      id: 6,
      title: "منصة تعليمية تفاعلية",
      category: "تصميم المواقع",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=400&fit=crop",
      description: "تصميم منصة تعليمية تفاعلية مع أدوات التعلم الحديثة"
    }
  ];

  const filteredItems = activeCategory === 'الكل' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 section-transition">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            معرض <span className="gradient-text">الأعمال</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            مجموعة مختارة من أفضل الأعمال والتصاميم التي قمت بإنجازها
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-secondary text-primary hover:bg-accent/10 hover:text-accent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="card-hover border-border overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 right-4 left-4">
                    <span className="text-white text-sm font-medium bg-accent/80 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              لا توجد أعمال في هذا التصنيف حالياً
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
