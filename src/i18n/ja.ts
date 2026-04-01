import { en } from './en.ts';
import { type OptionalTranslations } from './es.ts';

export const ja: OptionalTranslations = {
  'author.name': 'セバスティアン・バレネチェア',

  'nav.fork': 'GitHubでフォーク',
  'nav.sr.open': 'ナビゲーションメニューを開く',
  'nav.home': 'ホーム',
  'nav.projects': 'プロジェクト',
  'nav.posts': '投稿',
  'nav.page': 'ページ',
  'nav.language.select': '言語を選択',

  'hero.greeting': 'こんにちは！私は',
  'hero.description': 'チリ 🇨🇱 在住のソフトウェアエンジニアであり、OSSコントリビューターです',
  'hero.doing':
    '私は概念実証、驚くほど高速な新技術、そして機械学習モデルの魅力的な領域を探索しています。',
  'hero.currentEmployment': '現在、私は',
  'hero.currentTeam': 'でTechnical Manager を務めています',
  'hero.lookingFor': '現在、新しい仕事の機会を探しています',
  'hero.noEmployment': '現在、私は就職していません',
  'hero.avatar.alt': 'AIによって生成されたアバター（使用：',
  'hero.avatar.with': 'と',

  'home.recentProjects': '最近の',
  'home.recentProjects.viewAll': 'すべてのプロジェクトを見る',
  'home.recentPosts': '最近の',
  'home.recentPosts.viewAll': 'すべての投稿を見る',

  'blog.translatedBy': 'コンテンツの翻訳者：',

  'posts.paginationDescription': '時々行う頭の中のダンピングプロセスの結果',
  'posts.by': '投稿者：',
  'posts.on': '日付：',
  'posts.pagination.older': '古い投稿',
  'posts.pagination.newer': '新しい投稿',

  'projects.paginationDescription':
    '必ずしも私がやったすべてではありませんが、合法的に共有できるものです 😄',
  'projects.releasedOn': 'リリース日：',
  'projects.go': '見る',
  'projects.pagination.older': '古いプロジェクト',
  'projects.pagination.newer': '新しいプロジェクト',

  'tags.Containers': 'コンテナ',
  'tags.Architecture': 'アーキテクチャ',
  'tags.ReverseEngineering': 'リバースエンジニアリング',
  'tags.Embedded': '組み込み',
  'tags.undefined': '未定義のタグ',

  '404.title': 'ページが見つかりません',
  '404.description': 'お探しのページは存在しません。',
  '404.heading': '何かがありません',
  '404.body':
    'お探しのページは存在しません。アドレスを間違って入力したか、ページが移動した可能性があります。',
  '404.back': 'ホームページに戻る',

  'footer.rights': 'すべての権利を保有',
  'footer.built': '構築：',
};

// Default to English translations if a key is missing
export const jaWithFallback: { [Key in keyof typeof en]: string } = new Proxy(ja, {
  get: (target, name: keyof typeof en) => target[name] ?? en[name],
}) as { [Key in keyof typeof en]: string };
