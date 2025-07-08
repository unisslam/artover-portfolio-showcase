# إعداد EmailJS لنموذج التواصل

## الخطوات المطلوبة:

### 1. إنشاء حساب EmailJS
1. اذهب إلى [EmailJS.com](https://www.emailjs.com/)
2. أنشئ حساب جديد أو سجل دخول

### 2. إعداد Email Service
1. في لوحة التحكم، اذهب إلى **Email Services**
2. انقر **Add New Service**
3. اختر **Gmail** أو **Outlook** أو أي خدمة تفضلها
4. أدخل بيانات حسابك (unisslam@gmail.com)
5. احفظ **Service ID**

### 3. إنشاء Email Template
1. اذهب إلى **Email Templates**
2. انقر **Create New Template**
3. استخدم هذا المحتوى:

```
Subject: رسالة جديدة من معرض الأعمال - {{from_name}}

مرحباً!

وصلتك رسالة جديدة من معرض الأعمال:

الاسم: {{from_name}}
البريد الإلكتروني: {{from_email}}

الرسالة:
{{message}}

---
تم الإرسال من معرض أعمال ARTOVER
```

4. احفظ **Template ID**

### 4. الحصول على Public Key
1. اذهب إلى **Account** → **General**
2. انسخ **Public Key**

### 5. تحديث الكود
افتح `src/components/ContactSection.tsx` وحديث المتغيرات:

```typescript
const EMAILJS_SERVICE_ID = 'service_xxxxxx'; // من الخطوة 2
const EMAILJS_TEMPLATE_ID = 'template_xxxxxx'; // من الخطوة 3  
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxx'; // من الخطوة 4
```

ثم قم بإلغاء التعليق عن هذا السطر:
```typescript
const result = await emailjs.send(
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  templateParams,
  EMAILJS_PUBLIC_KEY
);
```

وحذف هذا السطر:
```typescript
await new Promise(resolve => setTimeout(resolve, 2000));
```

### 6. اختبار النموذج
1. شغل المشروع: `npm run dev`
2. املأ نموذج التواصل واضغط إرسال
3. تحقق من بريدك الإلكتروني (unisslam@gmail.com)

## ملاحظات مهمة:
- **مجاني**: EmailJS مجاني لـ 200 إيميل شهرياً
- **آمن**: تتم العملية من المتصفح مباشرة
- **بسيط**: لا يحتاج backend أو server
- **موثوق**: يدعم جميع مقدمي خدمات الإيميل

## الحالة الحالية:
- ✅ تم تثبيت المكتبة
- ✅ تم إعداد الكود
- ⏳ يحتاج إعداد حساب EmailJS (الخطوات أعلاه)
- ⏳ تحديث المعرفات في الكود

بعد إتمام هذه الخطوات، ستعمل فورمة التواصل وترسل الرسائل مباشرة إلى unisslam@gmail.com
