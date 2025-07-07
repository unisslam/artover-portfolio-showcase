import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Profile Image */}
          <div className="w-40 h-40 mx-auto mb-8 relative">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-accent to-primary p-1">
              <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">ي</span>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-ping"></div>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4">
              المهندس <span className="gradient-text">يونس سلام</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">مهندس نظم ومطور برمجيات | مونتير | مستشار تقني | صاحب شركة Artover</p>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">أقوم بتحويل الأفكار إلى حلول تقنية وبصرية مبتكرة وفعالة، مع التركيز على تطوير الأنظمة والتطبيقات التي تلبي احتياجات العملاء وتحقق أهدافهم التجارية، وكذلك التصاميم التسويقية الهادفة وذات الافكار الغير نمطية.</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button onClick={() => scrollToSection('portfolio')} size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              استعرض أعمالي
            </Button>
            <Button onClick={() => scrollToSection('contact')} variant="outline" size="lg" className="text-lg px-8 py-3 rounded-full border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300">
              تواصل معي
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6 text-accent" />
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;