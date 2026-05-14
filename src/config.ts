type EmploymentStatus = 'employed' | 'unemployed' | 'looking';

interface Employment {
  hidden: boolean;
  status: EmploymentStatus;
  companyName: string;
  companyUrl: string;
  role: string;
}

export const AppConfig = {
  siteName: 'Barrenechea',
  since: 2016,
  description:
    'Bienvenidos al sitio web oficial de Sebastián Barrenechea. Descubran mi variada gama de proyectos personales y sumérjanse en posteos que invitan a la reflexión.',
  repo: 'https://github.com/barrenechea/barrenechea-website',
  defaultLang: 'es',
  employment: {
    hidden: false as boolean,
    status: 'employed' as EmploymentStatus,
    companyName: 'Karedo',
    companyUrl: 'https://www.karedo.io',
    role: 'Senior Software Engineer',
  } satisfies Employment,
} as const;
