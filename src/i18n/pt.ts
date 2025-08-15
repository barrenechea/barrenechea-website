import { es, type OptionalTranslations } from './es.ts';

export const pt: OptionalTranslations = {
  'nav.fork': 'Faça fork no GitHub',
  'nav.sr.open': 'Abrir menu de navegação',
  'nav.home': 'Início',
  'nav.projects': 'Projetos',
  'nav.posts': 'Postagens',
  'nav.page': 'Página',
  'nav.language.select': 'Selecionar idioma',

  'hero.greeting': 'Olá! Eu sou',
  'hero.description':
    'Um Engenheiro de Software e contribuidor de software de código aberto localizado no Chile 🇨🇱',
  'hero.doing':
    'Você pode me encontrar brincando com provas de conceito, novas tecnologias e explorando o fascinante mundo dos modelos de Machine Learning.',
  'hero.currentEmployment': 'Atualmente trabalho na',
  'hero.currentTeam': 'com a equipe de DevOps',
  'hero.lookingFor': 'Atualmente estou procurando por novas oportunidades de trabalho',
  'hero.noEmployment': 'Atualmente não estou empregado',
  'hero.avatar.alt': 'Avatar gerado por IA usando',
  'hero.avatar.with': 'com',

  'home.recentProjects': 'Últimos',
  'home.recentProjects.viewAll': 'Ver todos os projetos',
  'home.recentPosts': 'Últimas',
  'home.recentPosts.viewAll': 'Ver todas as postagens',

  'blog.translatedBy': 'Conteúdo traduzido por',

  'posts.paginationDescription':
    'Resultado de alguns processos de brain-dumping que passo de vez em quando',
  'posts.by': 'Por',
  'posts.on': 'em',
  'posts.pagination.older': 'Postagens anteriores',
  'posts.pagination.newer': 'Postagens mais recentes',

  'projects.paginationDescription':
    'Não necessariamente tudo o que fiz, mas o que posso compartilhar legalmente 😄',
  'projects.releasedOn': 'Lançado em',
  'projects.go': 'Ir',
  'projects.pagination.older': 'Projetos anteriores',
  'projects.pagination.newer': 'Projetos mais recentes',

  'tags.Containers': 'Contêineres',
  'tags.Architecture': 'Arquitetura',
  'tags.ReverseEngineering': 'Engenharia Reversa',
  'tags.Embedded': 'Embarcado',
  'tags.undefined': 'TAG INDEFINIDA',

  '404.title': 'Página não encontrada',
  '404.description': 'A página que você está procurando não existe.',
  '404.heading': 'Algo está faltando',
  '404.body':
    'A página que você está procurando não existe. Pode ser que você tenha digitado o endereço errado ou que a página tenha sido movida.',
  '404.back': 'Voltar para a página inicial',

  'footer.rights': 'Todos os direitos reservados',
  'footer.built': 'Construído com',
};

// Default to Spanish translations if a key is missing
export const ptWithFallback: { [Key in keyof typeof es]: string } = new Proxy(pt, {
  get: (target, name: keyof typeof es) => target[name] ?? es[name],
}) as { [Key in keyof typeof es]: string };
