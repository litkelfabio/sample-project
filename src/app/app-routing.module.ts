import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'idealist',
    loadChildren: () => import('./pages/idealist/idealist.module').then( m => m.IdealistPageModule)
  },
  {
    path: 'idea-details',
    loadChildren: () => import('./pages/idea-details/idea-details.module').then( m => m.IdeaDetailsPageModule)
  },
  {
    path: 'idea-details/:id',
    loadChildren: () => import('./pages/idea-details/idea-details.module').then( m => m.IdeaDetailsPageModule)
  },
  {
    path: 'member/:qr',
    loadChildren: () => import('./pages/member/member.module').then( m => m.MemberPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./admin/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'list/:id',
    loadChildren: () => import('./admin/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./admin/user-list/user-list.module').then( m => m.UserListPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./admin/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./admin/create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./admin/landing/landing.module').then( m => m.LandingPageModule)
  },

  {
    path: 'create-account/:id',
    loadChildren: () => import('./admin/create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'logs',
    loadChildren: () => import('./logs/logs.module').then( m => m.LogsPageModule)
  },
  {
    path: 'recovery',
    loadChildren: () => import('./recovery/recovery.module').then( m => m.RecoveryPageModule)
  },
  {
    path: 'personnelanding',
    loadChildren: () => import('./personnel/personnelanding/personnelanding.module').then( m => m.PersonnelandingPageModule)
  },
  {
    path: 'personeel-details',
    loadChildren: () => import('./personeel-details/personeel-details.module').then( m => m.PersoneelDetailsPageModule)
  },
  {
    path: 'personeel-details/:id',
    loadChildren: () => import('./personeel-details/personeel-details.module').then( m => m.PersoneelDetailsPageModule)
  },
  {
    path: 'personnel-list',
    loadChildren: () => import('./personnel-list/personnel-list.module').then( m => m.PersonnelListPageModule)
  },
  {
    path: 'duty',
    loadChildren: () => import('./duty/duty.module').then( m => m.DutyPageModule)
  },
  {
    path: 'duty-member/:qr',
    loadChildren: () => import('./duty-member/duty-member.module').then( m => m.DutyMemberPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
