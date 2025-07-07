# تعليمات نشر GitHub Pages

## خطوات النشر

### 1. إعداد GitHub Repository
1. اذهب إلى GitHub repository
2. Settings → Pages
3. اختر "GitHub Actions" كمصدر النشر

### 2. إضافة متغيرات البيئة
1. اذهب إلى Settings → Secrets and variables → Actions
2. أضف هذه المتغيرات:
   - `VITE_SUPABASE_URL`: https://nryevntaonwzlyhimnee.supabase.co
   - `VITE_SUPABASE_ANON_KEY`: [المفتاح من Supabase]

### 3. تحديث اسم Repository
في ملف `vite.config.ts` تأكد من أن `base` يطابق اسم repository:
```typescript
base: "/اسم-repository-هنا/"
```

### 4. Push التغييرات
```bash
git add .
git commit -m "إعداد GitHub Pages"
git push origin main
```

### 5. انتظار النشر
- سيتم تشغيل GitHub Actions تلقائياً
- يمكن متابعة التقدم في تبويب "Actions"
- بعد انتهاء النشر، سيكون الموقع متاحاً على:
  `https://unisslam.github.io/اسم-repository/`

## إصلاح المشاكل الشائعة

### مشكلة 404 للملفات
- تأكد من إعداد `base` في `vite.config.ts`
- تأكد من وجود ملف `.nojekyll` في مجلد `public`

### مشكلة routing في SPA
- تم إضافة `404.html` و script في `index.html` لحل هذه المشكلة

### مشكلة متغيرات البيئة
- تأكد من إضافة جميع المتغيرات في GitHub Secrets
- تحقق من أن الأسماء مطابقة تماماً

## الرابط النهائي
بعد النشر، سيكون الموقع متاحاً على:
`https://unisslam.github.io/artover-portfolio-showcase/`
