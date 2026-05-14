import { es, type OptionalTranslations } from './es.ts';

export const ru: OptionalTranslations = {
  'author.name': 'Себастьян Барренечеа',

  'nav.fork': 'Fork на GitHub',
  'nav.sr.open': 'Открыть навигационное меню',
  'nav.home': 'Главная',
  'nav.projects': 'Проекты',
  'nav.posts': 'Посты',
  'nav.page': 'Страница',
  'nav.language.select': 'Выбрать язык',

  'hero.greeting': 'Привет! Я',
  'hero.description':
    'Программист и участник разработки открытого программного обеспечения из Чили 🇨🇱',
  'hero.doing':
    'Вы можете найти меня, играющим с концепциями, новейшими технологиями и изучением увлекательного мира моделей машинного обучения.',
  'hero.currentEmployment': 'В настоящее время я работаю в компании',
  'hero.currentTeam': 'в роли {role}',
  'hero.lookingFor': 'В настоящее время я ищу новые рабочие возможности',
  'hero.noEmployment': 'В настоящее время я не трудоустроен',
  'hero.avatar.alt': 'Аватар, сгенерированный ИИ с помощью',
  'hero.avatar.with': 'с',

  'home.recentProjects': 'Недавние',
  'home.recentProjects.viewAll': 'Смотреть все проекты',
  'home.recentPosts': 'Недавние',
  'home.recentPosts.viewAll': 'Смотреть все посты',

  'blog.translatedBy': 'Перевод выполнен',

  'posts.paginationDescription':
    'Результаты моих мыслительных процессов, которые у меня случаются время от времени',
  'posts.by': 'Автор',
  'posts.on': 'на',
  'posts.pagination.older': 'Старые посты',
  'posts.pagination.newer': 'Новые посты',

  'projects.paginationDescription':
    'Не обязательно всё, что я сделал, но то, что мне законно разрешено поделиться 😄',
  'projects.releasedOn': 'Выпущено',
  'projects.go': 'Перейти',
  'projects.pagination.older': 'Старые проекты',
  'projects.pagination.newer': 'Новые проекты',

  'tags.Containers': 'Контейнеры',
  'tags.Architecture': 'Архитектура',
  'tags.Pipelines': 'Пайплайны',
  'tags.WebScraping': 'Веб-скрапинг',
  'tags.Blog': 'Блог',
  'tags.ReverseEngineering': 'Реверс-инжиниринг',
  'tags.Hardware': 'Аппаратное обеспечение',
  'tags.Embedded': 'Встроенные системы',
  'tags.undefined': 'неопределённый TAG',

  '404.title': 'Страница не найдена',
  '404.description': 'Страница, которую вы ищете, не существует.',
  '404.heading': 'Чего-то не хватает',
  '404.body':
    'Страница, которую вы ищете, не существует. Возможно, вы неправильно ввели адрес или страница была перемещена.',
  '404.back': 'Вернуться на главную страницу',

  'footer.rights': 'Все права защищены',
  'footer.built': 'Создано с использованием',
};

// Default to Spanish translations if a key is missing
export const ruWithFallback: { [Key in keyof typeof es]: string } = new Proxy(ru, {
  get: (target, name: keyof typeof es) => target[name] ?? es[name],
}) as { [Key in keyof typeof es]: string };
