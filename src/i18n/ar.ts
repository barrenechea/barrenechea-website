import { es, type OptionalTranslations } from './es.ts';

export const ar: OptionalTranslations = {
  'author.name': 'سيباستيان بارينيشيا',
  'language.direction': 'rtl',

  'nav.fork': 'اصنع فورك على GitHub',
  'nav.sr.open': 'افتح قائمة التنقل',
  'nav.home': 'الرئيسية',
  'nav.projects': 'المشاريع',
  'nav.posts': 'المنشورات',
  'nav.page': 'الصفحة',
  'nav.language.select': 'اختر اللغة',

  'hero.greeting': 'مرحبا! أنا',
  'hero.description': 'مهندس برمجيات ومساهم في البرمجيات مفتوحة المصدر يقع في تشيلي 🇨🇱',
  'hero.doing':
    'يمكنك أن تجدني ألعب مع الاختبارات التجريبية، التقنيات الجديدة واستكشاف العالم المثير لنماذج التعلم الآلي.',
  'hero.currentEmployment': 'أعمل حاليا في',
  'hero.currentTeam': 'مع فريق DevOps',
  'hero.lookingFor': 'أبحث حاليا عن فرص عمل جديدة',
  'hero.noEmployment': 'أنا حاليا غير موظف',
  'hero.avatar.alt': 'صورة رمزية مولدة بواسطة',
  'hero.avatar.with': 'باستخدام',

  'home.recentProjects': 'أحدث',
  'home.recentProjects.viewAll': 'عرض جميع المشاريع',
  'home.recentPosts': 'أحدث',
  'home.recentPosts.viewAll': 'عرض جميع المنشورات',

  'blog.translatedBy': 'المحتوى مترجم بواسطة',

  'posts.paginationDescription': 'نتيجة لبعض عمليات التفريغ الذهني التي أمر بها من حين لآخر',
  'posts.by': 'بواسطة',
  'posts.on': 'في',
  'posts.pagination.older': 'المنشورات الأقدم',
  'posts.pagination.newer': 'المنشورات الأحدث',

  'projects.paginationDescription': 'ليس بالضرورة كل ما قمت به، ولكن ما يمكنني مشاركته قانونياً 😄',
  'projects.releasedOn': 'تم الإطلاق في',
  'projects.go': 'اذهب',
  'projects.pagination.older': 'المشاريع السابقة',
  'projects.pagination.newer': 'المشاريع الأحدث',

  'tags.CSharp': 'سي شارب',
  'tags.DotNet6': '.NET 6.0',
  'tags.Xcode': 'إكس كود',
  'tags.Containers': 'حاويات',
  'tags.Architecture': 'الهندسة المعمارية',
  'tags.Pipelines': 'الأنابيب',
  'tags.TailwindCSS': 'تيلويند سي إس إس',
  'tags.TypeScript': 'تايب سكريبت',
  'tags.WebScraping': 'جمع البيانات من الويب',
  'tags.Blog': 'مدونة',
  'tags.JavaScript': 'جافا سكريبت',
  'tags.AstroJS': 'أسترو.جي إس',
  'tags.ReverseEngineering': 'الهندسة العكسية',
  'tags.Hardware': 'العتاد',
  'tags.Android': 'أندرويد',
  'tags.Embedded': 'مدمج',
  'tags.undefined': 'وسم غير محدد',

  '404.title': 'الصفحة غير موجودة',
  '404.description': 'الصفحة التي تبحث عنها غير موجودة.',
  '404.heading': 'شيء مفقود',
  '404.body': 'الصفحة التي تبحث عنها غير موجودة. ربما كتبت العنوان بشكل خاطئ أو تم نقل الصفحة.',
  '404.back': 'العودة إلى الصفحة الرئيسية',

  'footer.rights': 'جميع الحقوق محفوظة',
  'footer.built': 'مبني بواسطة',
};

// Default to Spanish translations if a key is missing
export const arWithFallback: { [Key in keyof typeof es]: string } = new Proxy(ar, {
  get: (target, name: keyof typeof es) => target[name] ?? es[name],
}) as { [Key in keyof typeof es]: string };
