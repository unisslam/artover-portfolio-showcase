
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="text-accent">ART</span>OVER | <span className="text-accent">UNISSLAM</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              أقوم بتحويل الأفكار إلى حلول تقنية وبصرية مبتكرة وفعالة، مع التركيز على تطوير الأنظمة والتطبيقات التي تلبي احتياجات العملاء وتحقق أهدافهم التجارية، وكذلك التصاميم التسويقية الهادفة وذات الافكار الغير نمطية.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-accent transition-colors duration-200">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-accent transition-colors duration-200">
                  نبذة عني
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-accent transition-colors duration-200">
                  المشاريع
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-300 hover:text-accent transition-colors duration-200">
                  معرض الأعمال
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-accent transition-colors duration-200">
                  تواصل معي
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">معلومات التواصل</h3>
            <div className="space-y-2 text-gray-300">
              <p>📧 unisslam@gmail.com</p>
              <p>📱 +964 7730300804</p>
              <p>📍 العراق العظيم، محافظة ديالى</p>
            </div>
            <div className="flex space-x-4 space-x-reverse pt-4">
              <a 
                href="https://github.com/unisslam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-200"
              >
                💻
              </a>
              <a 
                      href="https://linkedin.com/in/unisslam" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-200"
                      >
                      in
                      </a>
              <a 
                href="https://behance.net/unisslam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-200"
              >
                🎨
              </a>
              <a 
                      href="https://x.com/unisslam" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-200"
                      >
                      𝕏
                      </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {currentYear} ARTOVER. جميع الحقوق محفوظة | صُمم وطُور بواسطة المهندس يونس
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
