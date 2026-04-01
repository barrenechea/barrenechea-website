import { es, type OptionalTranslations } from './es.ts';

export const zh: OptionalTranslations = {
  'author.name': 'Sebastian Barrenechea',

  'nav.fork': '在 GitHub 上复刻',
  'nav.sr.open': '打开导航菜单',
  'nav.home': '首页',
  'nav.projects': '项目',
  'nav.posts': '帖子',
  'nav.page': '页面',
  'nav.language.select': '选择语言',

  'hero.greeting': '嘿！我是',
  'hero.description': '一位位于智利的软件工程师和开源软件贡献者 🇨🇱',
  'hero.doing': '你可以找到我在玩概念验证，快速的新技术，以及探索机器学习模型的迷人领域。',
  'hero.currentEmployment': '我目前在',
  'hero.currentTeam': '担任 Technical Manager ',
  'hero.lookingFor': '我目前正在寻找新的工作机会',
  'hero.noEmployment': '我目前没有工作',
  'hero.avatar.alt': '使用 AI 生成的头像',
  'hero.avatar.with': '与',

  'home.recentProjects': '最新',
  'home.recentProjects.viewAll': '查看所有项目',
  'home.recentPosts': '最新',
  'home.recentPosts.viewAll': '查看所有帖子',

  'blog.translatedBy': '内容翻译者',

  'posts.paginationDescription': '我不时进行的一些头脑倾倒过程的结果',
  'posts.by': '由',
  'posts.on': '在',
  'posts.pagination.older': '较旧的帖子',
  'posts.pagination.newer': '较新的帖子',

  'projects.paginationDescription': '不一定是我所做的一切，但是我可以合法分享的 😄',
  'projects.releasedOn': '发布于',
  'projects.go': '前往',
  'projects.pagination.older': '较旧的项目',
  'projects.pagination.newer': '较新的项目',

  'tags.Containers': '容器',
  'tags.Architecture': '架构',
  'tags.Pipelines': '管道',
  'tags.WebScraping': '网络爬虫',
  'tags.Blog': '博客',
  'tags.ReverseEngineering': '逆向工程',
  'tags.Hardware': '硬件',
  'tags.Android': '安卓',
  'tags.Embedded': '嵌入式',
  'tags.undefined': '未定义标签',

  '404.title': '页面未找到',
  '404.description': '您要找的页面不存在。',
  '404.heading': '有些东西不见了',
  '404.body': '您要找的页面不存在。您可能输入了错误的地址，或者页面可能已经移动。',
  '404.back': '返回首页',

  'footer.rights': '保留所有权利',
  'footer.built': '构建于',
};

// Default to Spanish translations if a key is missing
export const zhWithFallback: { [Key in keyof typeof es]: string } = new Proxy(zh, {
  get: (target, name: keyof typeof es) => target[name] ?? es[name],
}) as { [Key in keyof typeof es]: string };
