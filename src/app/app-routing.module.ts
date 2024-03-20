import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenidoComponent } from './public/layout/components/contenido/contenido.component';
import { ValidarTokenGuard } from './core/guard/validar-token.guard';


const routes: Routes = [

  {
    path:'',
    component: ContenidoComponent,
    children: [
      {
        path:'',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      // {
      //   path: 'blog',
      //   loadChildren: () => import('./public/views/blog/blog.module').then(m => m.BlogModule)
      // },


      {
        path: 'migra',
        loadChildren: () => import('./public/views/migra/migra.module').then(m => m.MigraModule)
      },

      {
        path: 'historias',
        loadChildren: () => import('./public/views/historias/historias.module').then(m => m.HistoriasModule)
      },


      {
        path: 'home',
        loadChildren: () => import('./public/views/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'unete',
        loadChildren: () => import('./public/views/unete/unete.module').then(m => m.UneteModule)
      },
      {
        path: 'temas',
        loadChildren: () => import('./public/views/temas/temas.module').then(m => m.TemasModule)
      },
      // {
      //   path: 'blog',
      //   loadChildren: () => import('./public/views/blog/blog.module').then(m => m.BlogModule)
      // },
      {
        path: 'auth',
        loadChildren: () => import('./public/views/auth/auth.module').then(m => m.AuthModule),

      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),

      },


      {
          path: '**',
          redirectTo: 'home',
          pathMatch: 'full',
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
