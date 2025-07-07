# معرض أعمال ARTOVER - Portfolio Showcase

## نظرة عامة
معرض أعمال تقني متقدم مع نظام إدارة مشاريع متكامل، يعرض خبراتي التقنية ومشاريعي المختلفة بطريقة احترافية وتفاعلية.

## المطور
**يونس سلام** - مطور برمجيات متخصص في التطبيقات الويب الحديثة

## المميزات الرئيسية

### 🎨 **واجهة مستخدم حديثة**
- تصميم متجاوب لجميع الأجهزة
- واجهة باللغة العربية مع دعم RTL
- تأثيرات بصرية سلسة وجذابة
- نظام ألوان احترافي

### 📱 **أقسام المعرض**
- **الصفحة الرئيسية**: نبذة شخصية ومهارات
- **نبذة عني**: تفاصيل الخبرة والمهارات التقنية
- **المشاريع**: عرض المشاريع مع تفاصيل كاملة
- **معرض الأعمال**: نماذج من الأعمال السابقة
- **تواصل معي**: معلومات التواصل

### 🛠️ **نظام إدارة المشاريع**
- **لوحة تحكم شاملة**: إدارة كاملة للمشاريع
- **عمليات CRUD**: إضافة، تعديل، حذف، عرض
- **بحث وتصفية متقدمة**: للعثور على المشاريع بسهولة
- **نماذج تفاعلية**: لإدخال بيانات المشاريع
- **إحصائيات مفصلة**: نظرة عامة على حالة المشاريع

### 💾 **قاعدة البيانات**
- **Supabase PostgreSQL**: قاعدة بيانات سحابية آمنة
- **حفظ دائم**: جميع التغييرات محفوظة تلقائياً
- **أمان عالي**: حماية البيانات بأحدث المعايير

## التقنيات المستخدمة

### Frontend
- **React 18** - مكتبة واجهة المستخدم
- **TypeScript** - للأمان والوضوح في الكود
- **Vite** - أداة البناء السريعة
- **Tailwind CSS** - إطار عمل CSS المساعد
- **shadcn/ui** - مكونات واجهة مستخدم جاهزة

### Backend & Database
- **Supabase** - قاعدة بيانات PostgreSQL سحابية
- **REST API** - واجهة برمجة التطبيقات
- **Real-time subscriptions** - التحديثات الفورية

### Form Management
- **React Hook Form** - إدارة النماذج والتحقق
- **Zod Validation** - التحقق من صحة البيانات

### State Management
- **React Context API** - إدارة حالة التطبيق
- **Custom Hooks** - خطافات مخصصة للوظائف

## هيكل المشروع

```
src/
├── components/          # المكونات القابلة لإعادة الاستخدام
│   ├── ui/             # مكونات shadcn/ui
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   ├── ProjectsSection.tsx
│   ├── ProjectDetailsDialog.tsx
│   └── ProjectFormDialog.tsx
├── contexts/           # Context API للحالة العامة
│   └── ProjectContext.tsx
├── pages/              # صفحات التطبيق
│   ├── Index.tsx
│   ├── Projects.tsx
│   ├── ProjectsAdmin.tsx
│   └── NotFound.tsx
├── lib/                # الدوال المساعدة والإعدادات
│   ├── supabase.ts
│   └── utils.ts
└── hooks/              # الخطافات المخصصة
    └── use-toast.ts
```

## طريقة التشغيل

### المتطلبات
- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn

### خطوات التشغيل

```bash
# استنساخ المشروع
git clone <repository-url>

# الانتقال إلى مجلد المشروع
cd artover-portfolio-showcase

# تثبيت التبعيات
npm install

# إنشاء ملف البيئة
cp .env.example .env.local

# تحديث متغيرات البيئة
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# تشغيل التطبيق
npm run dev
```

### تشغيل لوحة الإدارة
بعد تشغيل التطبيق، يمكن الوصول للوحة إدارة المشاريع عبر:
- **من الـ Navbar**: اضغط على "إدارة المشاريع"
- **مباشرة**: `http://localhost:3000/admin/projects`

## إعداد قاعدة البيانات

### إنشاء مشروع Supabase
1. قم بزيارة [Supabase](https://supabase.com)
2. أنشئ مشروعاً جديداً
3. انسخ URL ومفتاح API
4. ضعهما في ملف `.env.local`

### إنشاء جدول المشاريع
```sql
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'قيد التطوير',
  image TEXT NOT NULL,
  duration TEXT NOT NULL,
  team TEXT NOT NULL,
  client TEXT NOT NULL,
  year TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  challenges TEXT NOT NULL,
  solution TEXT NOT NULL,
  demo_url TEXT,
  github_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## الميزات المتقدمة

### نظام البحث والتصفية
- بحث نصي في العناوين والعملاء والتقنيات
- تصفية حسب حالة المشروع (مكتمل/قيد التطوير)
- ترتيب حسب تاريخ الإنشاء

### إدارة النماذج
- تحقق من صحة البيانات
- رسائل خطأ وتأكيد واضحة
- إدارة ديناميكية للقوائم (التقنيات، المميزات)

### تجربة المستخدم
- Loading states للعمليات
- Toast notifications للنجاح والأخطاء
- تأكيد قبل الحذف
- واجهة متجاوبة بالكامل

## الأمان والأداء

### الأمان
- استخدام Environment Variables للمفاتيح الحساسة
- Row Level Security في Supabase
- تشفير البيانات الحساسة

### الأداء
- Code splitting تلقائي مع Vite
- Lazy loading للمكونات
- تحسين الصور والأصول

## النشر والتوزيع

### خيارات النشر
- **Vercel** (موصى به)
- **Netlify**
- **GitHub Pages**
- **Supabase Hosting**

### متغيرات البيئة للإنتاج
```env
VITE_SUPABASE_URL=your_production_url
VITE_SUPABASE_ANON_KEY=your_production_key
```

## المساهمة والتطوير

### إضافة ميزات جديدة
1. قم بإنشاء branch جديد
2. اكتب الكود مع التعليقات
3. اختبر الميزة بدقة
4. قم بعمل Pull Request

### معايير الكود
- استخدام TypeScript بشكل صارم
- تسمية واضحة للمتغيرات والدوال
- تعليقات باللغة العربية للوضوح
- اتباع معايير React best practices

## التواصل

للاستفسارات التقنية أو المساعدة:
- **الاسم**: يونس سلام
- **العلامة التجارية**: ARTOVER
- **التخصص**: تطوير تطبيقات الويب الحديثة

---

تم تطوير هذا المشروع بـ ❤️ بواسطة **ARTOVER**
