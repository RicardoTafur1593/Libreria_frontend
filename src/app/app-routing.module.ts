import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { ValidarTokenGuardAdmin } from './guards/validar-token-admin.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then (m => m.AuthModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./protected/user/user.module').then (m => m.UserModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./protected/admin/admin.module').then (m => m.AdminModule),
    canActivate: [ValidarTokenGuardAdmin],
    canLoad: [ValidarTokenGuardAdmin]
  }, 
  {
    path: '**',
    redirectTo: 'auth'
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
