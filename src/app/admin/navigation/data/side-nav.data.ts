import { SideNavItems, SideNavSection } from "../models/navigation.model";

export const sideNavSections: SideNavSection[] = [
  {
    text: 'CORE',
    items: ['dashboard'],
  },

  {
    text: 'TABLES',
    items: ['Paises', 'Guias','Historias'],
  },
  // {
  //     text: 'INTERFACE',
  //     items: ['layouts', 'pages'],
  // },
  // {
  //     text: 'ADDONS',
  //     items: ['charts', 'tables'],
  // },
];

export const sideNavItems: SideNavItems = {
  dashboard: {
    icon: 'fas fa-user-circle',
    text: 'Dashboard',
    link: '/admin/dashboard',
  },
  Paises: {
    icon: 'fas fa-user-circle',
    text: 'Paises',
    link: '/admin/dashboard/pais',
  },
  Guias: {
    icon: 'fas fa-user-circle',
    text: 'Guias',
    link: '/admin/dashboard/guias',
  },
  Historias: {
    icon: 'fas fa-user-circle',
    text: 'Historias',
    link: '/admin/dashboard/historia',
  },
  // layouts: {
  //   icon: 'columns',
  //   text: 'Layouts',
  //   submenu: [
  //     {
  //       text: 'Static Navigation',
  //       link: '/dashboard/static',
  //     },
  //     {
  //       text: 'Light Sidenav',
  //       link: '/dashboard/light',
  //     },
  //   ],
  // },
  // pages: {
  //   icon: 'book-open',
  //   text: 'Pages',
  //   submenu: [
  //     {
  //       text: 'Authentication',
  //       submenu: [

  //         {
  //           text: 'Tabla de Guia',
  //           link: '/dashboard/Guia',
  //           icon: 'fas fa-user-circle',
  //         },
  //         {
  //           text: 'Register',
  //           link: '/auth/register',
  //         },
  //         {
  //           text: 'Forgot Password',
  //           link: '/auth/forgot-password',
  //         },
  //       ],
  //     },
  //     {
  //       text: 'Error',
  //       submenu: [
  //         {
  //           text: '401 Page',
  //           link: '/error/401',
  //         },
  //         {
  //           text: '404 Page',
  //           link: '/error/404',
  //         },
  //         {
  //           text: '500 Page',
  //           link: '/error/500',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // charts: {
  //   icon: 'fas fa-user-circle',
  //   text: 'Charts',
  //   link: '/charts',
  // },
  // tables: {
  //   icon: 'fas fa-bars',
  //   text: 'Tables',
  //   link: '/tables',
  // },
};
