
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const skills = [
    "تطوير أنظمة ERP",
    "هندسة النظم",
    "تطوير البرمجيات",
    "الاستشارات التقنية",
    "إدارة المشاريع",
    "تحليل البيانات"
  ];

  const achievements = [
    "خبرة +5 سنوات في تطوير البرمجيات",
    "تطوير أكثر من 20 مشروع ناجح",
    "شهادات معتمدة في هندسة النظم",
    "خبرة في إدارة فرق التطوير"
  ];

  return (
    <section id="about" className="py-20 section-transition">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            نبذة <span className="gradient-text">عني</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            مهندس متخصص في تطوير الحلول التقنية المبتكرة والأنظمة المؤسسية الشاملة
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="prose prose-lg text-muted-foreground">
              <p className="text-lg leading-relaxed">
                أعمل كمهندس نظم ومطور برمجيات متخصص في بناء الحلول التقنية المتقدمة. 
                خبرتي تمتد لتشمل تطوير أنظمة ERP المتكاملة والتطبيقات المؤسسية التي تساعد 
                الشركات على تحسين عملياتها وزيادة كفاءتها.
              </p>
              <p className="text-lg leading-relaxed">
                أؤمن بقوة التكنولوجيا في تحويل الأعمال وتطويرها، وأسعى دائماً لتقديم 
                حلول مبتكرة تلبي احتياجات العملاء وتتجاوز توقعاتهم. أركز على الجودة 
                والأداء والأمان في جميع المشاريع التي أعمل عليها.
              </p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-4">مجالات التخصص</h3>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="bg-secondary/50 rounded-lg p-3 text-center text-sm font-medium text-primary border border-border hover:border-accent transition-colors duration-200"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements Card */}
          <div className="space-y-6">
            <Card className="card-hover border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-primary mb-6">الإنجازات المهنية</h3>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3 space-x-reverse">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">{achievement}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="card-hover border-border">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">20+</div>
                  <div className="text-sm text-muted-foreground">مشروع منجز</div>
                </CardContent>
              </Card>
              <Card className="card-hover border-border">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">سنوات خبرة</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
