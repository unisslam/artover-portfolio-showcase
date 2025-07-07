
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "خطأ في الإرسال",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "تم الإرسال بنجاح",
      description: "شكراً لك! سأتواصل معك في أقرب وقت ممكن.",
    });

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/younes",
      icon: "💻"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/younes",
      icon: "💼"
    },
    {
      name: "Behance",
      url: "https://behance.net/younes",
      icon: "🎨"
    },
    {
      name: "Telegram",
      url: "https://t.me/younes",
      icon: "📱"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/30 section-transition">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            <span className="gradient-text">تواصل</span> معي
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            لديك مشروع أو فكرة؟ لا تتردد في التواصل معي لمناقشة كيف يمكنني مساعدتك
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-border">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-primary mb-6">إرسال رسالة</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                    الاسم الكامل *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="أدخل اسمك الكامل"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    البريد الإلكتروني *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    الرسالة *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="اكتب رسالتك هنا..."
                    rows={5}
                    className="w-full resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-lg py-3"
                >
                  إرسال الرسالة
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-primary mb-6">معلومات التواصل</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <span className="text-accent text-xl">📧</span>
                    </div>
                    <div>
                      <p className="font-medium text-primary">البريد الإلكتروني</p>
                      <p className="text-muted-foreground">younes@artover.dev</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <span className="text-accent text-xl">📱</span>
                    </div>
                    <div>
                      <p className="font-medium text-primary">الهاتف</p>
                      <p className="text-muted-foreground">+966 xx xxx xxxx</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <span className="text-accent text-xl">📍</span>
                    </div>
                    <div>
                      <p className="font-medium text-primary">الموقع</p>
                      <p className="text-muted-foreground">المملكة العربية السعودية</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-primary mb-6">تابعني على</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 space-x-reverse p-3 bg-secondary/50 rounded-lg hover:bg-accent/10 hover:border-accent transition-all duration-200 border border-transparent"
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span className="font-medium text-primary">{link.name}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
